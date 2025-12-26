async function loadData() {
  const res = await fetch('/data/XAUUSD_5m.json');
  if (!res.ok) throw new Error('DATA LOAD ERROR');
  return await res.json();
}
