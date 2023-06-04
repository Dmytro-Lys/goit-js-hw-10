const refs = {
  body: document.querySelector("body"),
  btnStart: document.querySelector("[data-start]"),
  btnStop: document.querySelector("[data-stop]")
}

let timerId = null;

refs.btnStop.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

refs.btnStart.addEventListener("click", () => {
    timerId = setInterval(() => refs.body.style.backgroundColor = getRandomHexColor(), 1000);
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
});

refs.btnStop.addEventListener("click", () => {
    clearInterval(timerId);
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
});