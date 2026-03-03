'use strict';

// ── Constants ────────────────────────────────────────────────────
const ACTIVITY_BASE = 1.2;
const KCAL_PER_KG = 7700;
const MAX_DAYS = 365 * 5; // 5-year forecast limit to prevent infinite loops
const PLATEAU_WINDOW = 30;
const PLATEAU_DELTA = 0.001; // kg/day change threshold for plateau detection

// ── BMR / TDEE (Mifflin-St Jeor) ────────────────────────────────
function calcBMR(weight, height, age, isMale) {
    const base = (10 * weight) + (6.25 * height) - (5 * age);
    return isMale ? base + 5 : base - 161;
}

function calcTDEE(weight, height, age, isMale, activityFactor) {
    return calcBMR(weight, height, age, isMale) * activityFactor;
}

// ── BMI (Trefethen 2013) ─────────────────────────────────────────
function calcBMI(weight, height) {
    const heightM = height / 100;
    return 1.3 * weight / Math.pow(heightM, 2.5);
}

function classifyBMI(bmi) {
    if (bmi < 18.5) return { label: 'Underweight', warning: true };
    if (bmi < 25) return { label: 'Normal weight', warning: false };
    if (bmi < 30) return { label: 'Overweight', warning: false };
    return { label: 'Obese', warning: false };
}

// ── Live BMI ──────────────────────────────────────────────────────
function updateBMIPreview() {
    const weight = parseFloat(document.getElementById('currentWeight').value);
    const target = parseFloat(document.getElementById('desiredWeight').value);
    const height = parseFloat(document.getElementById('height').value);

    const bmiSection = document.getElementById('bmiPreview');

    if (!weight || !height) {
        bmiSection.hidden = true;
        return;
    }

    const bmiStart = calcBMI(weight, height);
    const classStart = classifyBMI(bmiStart);

    document.getElementById('bmiStartVal').textContent = bmiStart.toFixed(1);
    document.getElementById('bmiStartClass').textContent = classStart.label;

    if (target && target !== weight) {
        const bmiTarget = calcBMI(target, height);
        const classTarget = classifyBMI(bmiTarget);

        document.getElementById('bmiTargetVal').textContent = bmiTarget.toFixed(1);
        document.getElementById('bmiTargetClass').textContent = classTarget.label;

        const bmiWarning = document.getElementById('bmiWarning');
        bmiWarning.hidden = !classTarget.warning;

        document.getElementById('bmiTargetGroup').hidden = false;
    } else {
        document.getElementById('bmiTargetGroup').hidden = true;
        document.getElementById('bmiWarning').hidden = true;
    }

    bmiSection.hidden = false;
}

['currentWeight', 'desiredWeight', 'height'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateBMIPreview);
});

// ── Activity factor ──────────────────────────────────────────────
function getActivityFactor() {
    const neat = parseFloat(document.getElementById('neat').value);
    const eat = parseFloat(document.getElementById('eat').value);
    return ACTIVITY_BASE + neat + eat;
}

function getActivityLabel(factor) {
    if (factor < 1.25) return 'Minimal activity';
    if (factor < 1.40) return 'Lightly active';
    if (factor < 1.60) return 'Moderately active';
    if (factor < 1.80) return 'Active';
    return 'Very active';
}

function updateFactorDisplay() {
    const f = getActivityFactor();
    const pct = Math.min(Math.round(((f - 1.1) / 0.85) * 100), 100);

    document.getElementById('factorVal').textContent = 'x ' + f.toFixed(2);
    document.getElementById('factorBar').style.width = pct + '%';
    document.getElementById('factorLabel').textContent = getActivityLabel(f);
}

// ── Date helper ──────────────────────────────────────────────────
function addDays(base, n) {
    const d = new Date(base);
    d.setDate(d.getDate() + n);
    return d.toISOString().split('T')[0];
}

function round2(v) {
    return Math.round(v * 100) / 100;
}

// ── Forecast (iterative, weight-adaptive) ───────────────────────
function forecastWeightLoss(startWeight, targetWeight, height, age, isMale, activityFactor, dailyIntake) {
    const startDate = new Date();
    const isLoss = targetWeight < startWeight;

    let day = 0;
    let weight = startWeight;
    let plateau = { reached: false, day: null, weight: null };

    const series = {
        days: [0],
        weights: [weight],
        dates: [addDays(startDate, 0)],
    };

    while (day < MAX_DAYS) {
        const tdee = calcTDEE(weight, height, age, isMale, activityFactor);
        const dailyChange = (tdee - dailyIntake) / KCAL_PER_KG;

        // Plateau detection
        if (Math.abs(dailyChange) < PLATEAU_DELTA) {
            if (!plateau.reached) {
                plateau = { reached: true, day, weight };
            }
            if (day >= plateau.day + PLATEAU_WINDOW) {
                return {
                    days: day, date: addDays(startDate, day),
                    finalWeight: round2(weight),
                    reachedTarget: false,
                    plateau: { reached: true, weight: round2(plateau.weight), day: plateau.day },
                    series,
                };
            }
        }

        weight -= dailyChange;

        // Sample weekly for chart
        if (day % 7 === 0) {
            series.days.push(day);
            series.weights.push(round2(weight));
            series.dates.push(addDays(startDate, day));
        }

        // Target reached
        const hit = isLoss ? weight <= targetWeight : weight >= targetWeight;
        if (hit) {
            series.days.push(day + 1);
            series.weights.push(round2(weight));
            series.dates.push(addDays(startDate, day + 1));
            return {
                days: day + 1, date: addDays(startDate, day + 1),
                finalWeight: round2(weight),
                reachedTarget: true,
                plateau: { reached: false },
                series,
            };
        }

        day++;
    }

    // Max duration reached without hitting target
    return {
        days: day, date: addDays(startDate, day),
        finalWeight: round2(weight),
        reachedTarget: false,
        plateau: { reached: false },
        series,
    };
}

// ── Chart ────────────────────────────────────────────────────────
let chartInstance = null;

function renderChart(series, targetWeight) {
    const ctx = document.getElementById('weightChart').getContext('2d');
    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: series.dates,
            datasets: [
                {
                    label: 'Weight (kg)',
                    data: series.weights,
                    borderColor: '#8a6a4a',
                    backgroundColor: 'rgba(200,176,154,0.12)',
                    borderWidth: 2,
                    pointRadius: 2,
                    fill: true,
                    tension: 0.3,
                },
                {
                    label: 'Target',
                    data: series.dates.map(() => targetWeight),
                    borderColor: '#5a8a5a',
                    borderDash: [6, 4],
                    borderWidth: 1.5,
                    pointRadius: 0,
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { font: { family: 'sans-serif', size: 12 }, color: '#888' } },
                tooltip: {
                    callbacks: {
                        label: ctx => ctx.dataset.label + ': ' + ctx.parsed.y.toFixed(1) + ' kg',
                    },
                },
            },
            scales: {
                x: {
                    ticks: { font: { family: 'sans-serif', size: 11 }, color: '#aaa', maxTicksLimit: 8 },
                    grid: { color: '#f0ece6' },
                },
                y: {
                    ticks: { font: { family: 'sans-serif', size: 11 }, color: '#aaa', callback: v => v + ' kg' },
                    grid: { color: '#f0ece6' },
                },
            },
        },
    });
}

// ── Input validation ─────────────────────────────────────────────
function getInputs() {
    const fields = {
        weight: parseFloat(document.getElementById('currentWeight').value),
        target: parseFloat(document.getElementById('desiredWeight').value),
        height: parseFloat(document.getElementById('height').value),
        age: parseInt(document.getElementById('age').value, 10),
        intake: parseFloat(document.getElementById('dailyIntake').value),
        isMale: document.getElementById('sex').value === 'male',
    };

    const invalid = Object.entries(fields)
        .filter(([k, v]) => typeof v === 'number' && isNaN(v))
        .map(([k]) => k);

    return invalid.length ? null : fields;
}

// ── Render results ───────────────────────────────────────────────
function renderResults(result, targetWeight) {
    document.getElementById('resDays').textContent        = result.days;
    document.getElementById('resDate').textContent        = result.date;
    document.getElementById('resFinalWeight').textContent = result.finalWeight + ' kg';

    const note = document.getElementById('plateauNote');
    if (result.plateau.reached) {
        note.textContent = 'Weight plateau reached at ' + result.plateau.weight + ' kg on day '
            + result.plateau.day + '. At your current intake, further change is unlikely without adjustments.';
        note.hidden = false;
    } else {
        note.hidden = true;
    }

    document.getElementById('results').hidden = false;
    renderChart(result.series, targetWeight);
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

// ── Event listeners ──────────────────────────────────────────────
document.getElementById('neat').addEventListener('change', updateFactorDisplay);
document.getElementById('eat').addEventListener('change', updateFactorDisplay);

document.getElementById('calcBtn').addEventListener('click', () => {
    const inputs = getInputs();
    if (!inputs) {
        alert('Please fill in all fields.');
        return;
    }

    const result = forecastWeightLoss(
        inputs.weight, inputs.target, inputs.height,
        inputs.age, inputs.isMale, getActivityFactor(), inputs.intake
    );

    renderResults(result, inputs.target);
});

// Init
updateFactorDisplay();