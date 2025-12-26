const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 40;
}
resize();
window.addEventListener('resize', resize);

let data = [];
let index = 50;          // текущая свеча
const windowSize = 60;   // сколько свечей видно

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!data.length) return;

  const visible = data.slice(index - windowSize, index);

  let min = Math.min(...visible.map(c => c.low));
  let max = Math.max(...visible.map(c => c.high));
  const pad = (max - min) * 0.1;
  min -= pad;
  max += pad;

  const candleWidth = canvas.width / windowSize;

  visible.forEach((c, i) => {
    const x = i * candleWidth;
    const yOpen  = map(c.open,  min, max);
    const yClose = map(c.close, min, max);
    const yHigh  = map(c.high,  min, max);
    const yLow   = map(c.low,   min, max);

    ctx.strokeStyle = c.close >= c.open ? '#00ff99' : '#ff4d4d';
    ctx.fillStyle   = ctx.strokeStyle;

    // тень
    ctx.beginPath();
    ctx.moveTo(x + candleWidth/2, yHigh);
    ctx.lineTo(x + candleWidth/2, yLow);
    ctx.stroke();

    // тело
    ctx.fillRect(
      x + candleWidth*0.2,
      Math.min(yOpen, yClose),
      candleWidth*0.6,
      Math.abs(yClose - yOpen) || 1
    );
  });
}

function map(price, min, max) {
  return canvas.height - (price - min) / (max - min) * canvas.height;
}

loadData().then(d => {
  data = d;
  draw();
});
