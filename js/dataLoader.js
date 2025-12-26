let candles = [];

async function loadData() {
  try {
    const res = await fetch("data/XAUUSD_5m.json");
    candles = await res.json();

    console.log("Loaded candles:", candles.length);

    drawChart(candles.slice(0, 100));
  } catch (e) {
    console.error("DATA LOAD ERROR", e);
  }
}

loadData();
