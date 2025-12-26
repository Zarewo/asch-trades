async function loadData() {
  const res = await fetch('/data/XAUUSD_5m.json');
  return await res.json();
}
