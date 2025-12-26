const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 50;
}
resize();
window.addEventListener("resize", resize);

function drawChart(data) {
  if (!data || data.length === 0) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 🔥 Автоскейл
  const prices = data.flatMap(c => [c.high, c.low]);
  const max = Math.max(...prices);
  const min = Math.min(...prices);

  const padding = 40;
  const chartHeight = canvas.height - padding * 2;
  const candleWidth = 6;

  const scaleY = chartHeight / (max - min);

  let x = padding;

  data.forEach(c => {
    const openY  = canvas.height - padding - (c.open - min) * scaleY;
    const closeY = canvas.height - padding - (c.close - min) * scaleY;
    const highY  = canvas.height - padding - (c.high - min) * scaleY;
    const lowY   = canvas.height - padding - (c.low - min) * scaleY;

    // тень
    ctx.strokeStyle = "#aaa";
    ctx.beginPath();
    ctx.moveTo(x + candleWidth / 2, highY);
    ctx.lineTo(x + candleWidth / 2, lowY);
    ctx.stroke();

    // тело
    ctx.fillStyle = c.close >= c.open ? "#26a69a" : "#ef5350";
    ctx.fillRect(
      x,
      Math.min(openY, closeY),
      candleWidth,
      Math.max(1, Math.abs(openY - closeY))
    );

    x += candleWidth + 2;
  });
}
