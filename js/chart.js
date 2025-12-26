const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 50;
}
window.addEventListener('resize', resize);
resize();

const VIEW_BARS = 80;
const PLAYHEAD = 0.65;

function drawChart(data, index) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const start = Math.max(0, index - Math.floor(VIEW_BARS * PLAYHEAD));
  const end = start + VIEW_BARS;
  const visible = data.slice(start, end);

  if (!visible.length) return;

  const prices = visible.flatMap(c => [c.high, c.low]);
  const max = Math.max(...prices);
  const min = Math.min(...prices);

  const scaleY = p =>
    canvas.height - ((p - min) / (max - min)) * canvas.height;

  const candleW = canvas.width / VIEW_BARS;

  visible.forEach((c, i) => {
    const x = i * candleW + candleW / 2;

    const openY = scaleY(c.open);
    const closeY = scaleY(c.close);
    const highY = scaleY(c.high);
    const lowY = scaleY(c.low);

    const up = c.close >= c.open;
    ctx.strokeStyle = up ? '#00ff99' : '#ff4d4d';
    ctx.fillStyle = ctx.strokeStyle;

    // wick
    ctx.beginPath();
    ctx.moveTo(x, highY);
    ctx.lineTo(x, lowY);
    ctx.stroke();

    // body
    ctx.fillRect(
      x - candleW * 0.3,
      Math.min(openY, closeY),
      candleW * 0.6,
      Math.abs(openY - closeY) || 1
    );
  });

  // 🔥 маска будущего
  const maskX = canvas.width * PLAYHEAD;
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(maskX, 0, canvas.width - maskX, canvas.height);

  // линия текущей свечи
  ctx.strokeStyle = '#888';
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(maskX, 0);
  ctx.lineTo(maskX, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);
}
