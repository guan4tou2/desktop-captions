/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
function showdanmu(string, color = "#000000", range = 75, size = 10) {
  var parentElement = document.getElementById("childdiv");
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
  var imgs = /^https?:\/\/\S*.(gif|png|jpeg|jpg)$/;
  if (imgs.test(string)) {
    var danmu = document.createElement("img");
    danmu.setAttribute("src", string);
    danmu.style.width = `100%`;
  } else {
    var danmu = document.createElement("h1");
    danmu.className = "danmu";
    danmu.textContent = string;
    danmu.setAttribute("data-storke", string);
    danmu.style.fontSize = `${size}vw`;
    danmu.style.color = color;
  }
  danmu.style.opacity = range * 0.01;
  parentElement.appendChild(danmu);
}

// 將函式掛到 window 物件，讓 main process 注入的腳本可以呼叫
if (typeof window !== "undefined") {
  window.showdanmu = showdanmu;
}

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const setButton = document.getElementById("set-button");
  const stopButton = document.getElementById("stop-button");
  const colorInput = document.getElementById("ColorInput");
  const sizeInput = document.getElementById("SizeInput");
  const opacityInput = document.getElementById("OpacityRange");
  const captionsInput = document.getElementById("captions-input");
  const opacityValue = document.getElementById("opacityValue");
  const api = window.API;

  if (!api) {
    console.error("API not initialized");
    return;
  }

  function updateOverlay() {
    if (api && api.change) {
      api.change(
        captionsInput.value,
        colorInput.value,
        opacityInput.value,
        sizeInput.value
      );
    }
  }

  startButton.addEventListener("click", () => {
    api.create();

    startButton.disabled = true;
    stopButton.disabled = false;
    setButton.disabled = false;
  });

  stopButton.addEventListener("click", () => {
    startButton.disabled = false;
    stopButton.disabled = true;
    setButton.disabled = true;
    api.delete();
  });

  setButton.addEventListener("click", () => {
    api.set();
  });

  // Color input events
  colorInput.addEventListener("input", updateOverlay);
  colorInput.addEventListener("change", updateOverlay);

  // Opacity input events
  opacityInput.addEventListener("input", () => {
    opacityValue.textContent = `${opacityInput.value}%`;
    updateOverlay();
  });
  opacityInput.addEventListener("change", () => {
    opacityValue.textContent = `${opacityInput.value}%`;
    updateOverlay();
  });

  // Size input events
  sizeInput.addEventListener("input", updateOverlay);
  sizeInput.addEventListener("change", updateOverlay);

  // Captions input events
  captionsInput.addEventListener("input", updateOverlay);

  // Initialize opacity value display
  opacityValue.textContent = `${opacityInput.value}%`;
});
