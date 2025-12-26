const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.9;

let data = [];
let visible = 1;

loadData().then(d => {
  data = d;
  draw();
});

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const candleWidth = 20;
  const max = Math.max(...data.slice(0,visible).map(c => c.high));
  const min = Math.min(...data.slice(0,visible).map(c => c.low));

  data.slice(0, visible).forEach((c, i) => {
    const x = i * (candleWidth + 5) + 50;
    const yHigh = scale(c.high, min, max);
    const yLow = scale(c.low, min, max);
    const yOpen = scale(c.open, min, max);
    const yClose = scale(c.close, min, max);

    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(x, yHigh);
    ctx.lineTo(x, yLow);
    ctx.stroke();

    ctx.fillStyle = c.close >= c.open ? '#2ecc71' : '#e74c3c';
    ctx.fillRect(x - 5, Math.min(yOpen, yClose), 10, Math.abs(yOpen - yClose));
  });
}

function scale(val, min, max) {
  return canvas.height - ((val - min) / (max - min)) * canvas.height;
}

document.getElementById('step').onclick = () => {
  if (visible < data.length) {
    visible++;
    draw();
  }
};
