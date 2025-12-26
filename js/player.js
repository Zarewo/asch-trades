let timer = null;

document.getElementById('play').onclick = () => {
  if (timer) return;
  timer = setInterval(() => {
    index++;
    draw();
    if (index >= data.length) stop();
  }, 400);
};

document.getElementById('step').onclick = () => {
  index++;
  draw();
};

function stop() {
  clearInterval(timer);
  timer = null;
}
