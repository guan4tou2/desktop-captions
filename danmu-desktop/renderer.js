/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
function showdanmu(string, range = 75, color = '#ffffff', size = 50) {
    var parentElement = document.getElementById("childdiv");
    while (parentElement.firstChild) {
  parentElement.removeChild(parentElement.firstChild);
}
    var imgs=/^https?:\/\/\S*.(gif|png|jpeg|jpg)$/;
    if(imgs.test(string)){
    var danmu = document.createElement("img");
    danmu.setAttribute("src", string)
    danmu.width=size*2;
    }else{
    var danmu = document.createElement("h1");
    danmu.className = "danmu";
    danmu.textContent = string;
    danmu.setAttribute("data-storke", string)
    danmu.style.fontSize = `${size}vw`;
    danmu.style.color=color
    }
    parentElement.appendChild(danmu);
    
    // const Height = parseFloat(getComputedStyle(danmu).height)
    // const Width = parseFloat(getComputedStyle(danmu).width)
    // const Padding = parseFloat(getComputedStyle(danmu).padding)
    // let top = Math.abs(Math.random() * document.documentElement.clientHeight - (Height + Padding));
    // danmu.style.top = `${top}px`;
    // danmu.style.top = `0px`;
    danmu.style.opacity = range * 0.01
    
    
}

const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const setButton = document.getElementById('set')
const captions = document.getElementById('captions')
const api=window.API
startButton.addEventListener('click', () => {
    api.create()
    api.change(captions.value)
    
    startButton.disabled=true
    stopButton.disabled = false
    setButton.disabled=false
});

stopButton.addEventListener('click', () => {
    startButton.disabled = false
    stopButton.disabled = true
    setButton.disabled=true
    api.delete()
});
setButton.addEventListener('click', () => {
    api.set()
});

captions.addEventListener('input',()=>{
    api.change(captions.value)
})