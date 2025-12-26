let currentIndex = 100;
let playing = false;

function stepForward() {
  if (currentIndex < candles.length) {
    currentIndex++;
    drawChart(candles.slice(0, currentIndex));
  }
}

function play() {
  if (playing) return;
  playing = true;

  const loop = () => {
    if (!playing) return;
    stepForward();
    setTimeout(loop, 300);
  };
  loop();
}

function pause() {
  playing = false;
}
