function toggleRiskType() {
  const type = document.getElementById("riskType").value;
  document.getElementById("riskLabel").textContent =
    type === "percent" ? "Risk (%)" : "Risk ($)";
}

function updateSLLabel() {
  const key = document.getElementById("instrument").value;
  const instrument = instruments[key];

  document.getElementById("slLabel").textContent =
    `Stop Loss (${instrument.slLabel})`;
}

function calculate() {
  const key = document.getElementById("instrument").value;
  const instrument = instruments[key];

  const balance = parseFloat(document.getElementById("balance").value);
  const riskType = document.getElementById("riskType").value;
  const riskValue = parseFloat(document.getElementById("riskValue").value);
  const stopLoss = parseFloat(document.getElementById("stopLoss").value);

  if (!balance || !riskValue || !stopLoss) return;

  const moneyRisk =
    riskType === "percent"
      ? balance * (riskValue / 100)
      : riskValue;

  const lots = moneyRisk / (stopLoss * instrument.pipValue);
  const units = lots * instrument.contractSize;

  document.getElementById("moneyRisk").textContent =
    moneyRisk.toFixed(2);

  document.getElementById("lots").textContent =
    lots.toFixed(2);

  document.getElementById("units").textContent =
    units.toFixed(2);
}

// INIT
document
  .getElementById("instrument")
  .addEventListener("change", updateSLLabel);

toggleRiskType();
updateSLLabel();
