let data = [];
let index = 50;
let playing = false;
let timer = null;

loadData().then(d => {
  data = d;
  drawChart(data, index);
});

document.getElementById('step').onclick = () => {
  if (index < data.length - 1) {
    index++;
    drawChart(data, index);
  }
};

document.getElementById('play').onclick = () => {
  playing = !playing;

  if (playing) {
    timer = setInterval(() => {
      if (index < data.length - 1) {
        index++;
        drawChart(data, index);
      } else {
        clearInterval(timer);
      }
    }, 300);
  } else {
    clearInterval(timer);
  }
};
