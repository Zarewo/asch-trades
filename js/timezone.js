const timezones = [];
for (let i = -12; i <= 14; i++) {
  const sign = i >= 0 ? "+" : "";
  timezones.push({
    label: `UTC${sign}${i}`,
    offset: i
  });
}

const tzA = document.getElementById("tzA");
const tzB = document.getElementById("tzB");

timezones.forEach(tz => {
  tzA.add(new Option(tz.label, tz.offset));
  tzB.add(new Option(tz.label, tz.offset));
});

// значения по умолчанию
tzA.value = -5;
tzB.value = -3;

function updateTime() {
  const now = new Date();

  const utc =
    now.getTime() + now.getTimezoneOffset() * 60000;

  const timeA = new Date(
    utc + tzA.value * 3600000
  );
  const timeB = new Date(
    utc + tzB.value * 3600000
  );

  document.getElementById("timeA").textContent =
    timeA.toLocaleTimeString();

  document.getElementById("timeB").textContent =
    timeB.toLocaleTimeString();
}

updateTime();
setInterval(updateTime, 1000);
