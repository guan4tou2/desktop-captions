/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
function showdanmu(string, color = '#ffffff', range = 75, size = 10) {
    var parentElement = document.getElementById("childdiv");
    while (parentElement.firstChild) {
  parentElement.removeChild(parentElement.firstChild);
}
    var imgs=/^https?:\/\/\S*.(gif|png|jpeg|jpg)$/;
    if(imgs.test(string)){
    var danmu = document.createElement("img");
    danmu.setAttribute("src", string)
    danmu.style.width=`100%`;
    }else{
    var danmu = document.createElement("h1");
    danmu.className = "danmu";
    danmu.textContent = string;
    danmu.setAttribute("data-storke", string)
    danmu.style.fontSize = `${size}vw`;
    // danmu.style.fontStretch='expanded';
    danmu.style.color=color
    danmu.style.opacity = range * 0.01
    }
    parentElement.appendChild(danmu);
}

const opacityInput = document.getElementById("customRange")
            const value = document.getElementById('rangevalue');
            const colorInput = document.getElementById('ColorInput');
            const sizeInput = document.getElementById('SizeInput');

const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const setButton = document.getElementById('set')
const captions = document.getElementById('captions')
const clearbutton = document.getElementById('clearbutton')
const api=window.API
startButton.addEventListener('click', () => {
    api.create()
    api.change(captions.value,colorInput.value,opacityInput.value,sizeInput.value)
    
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
colorInput.addEventListener('input', () => {
        console.log(captions.value,colorInput.value,opacityInput.value,sizeInput.value)
        api.change(captions.value,colorInput.value,opacityInput.value,sizeInput.value)
    });
    colorInput.addEventListener('change', () => {
    console.log(captions.value,colorInput.value,opacityInput.value,sizeInput.value)
        api.change(captions.value,colorInput.value,opacityInput.value,sizeInput.value)
});
opacityInput.addEventListener('input', () => {
    value.textContent = opacityInput.value + "%";
        api.change(captions.value,colorInput.value,opacityInput.value,sizeInput.value)
});
opacityInput.addEventListener('change', () => {
        api.change(captions.value,colorInput.value,opacityInput.value,sizeInput.value)
});
sizeInput.addEventListener('input', () => {
        api.change(captions.value,colorInput.value,opacityInput.value,sizeInput.value)
});
sizeInput.addEventListener('change', () => {
        api.change(captions.value,colorInput.value,opacityInput.value,sizeInput.value)
});
captions.addEventListener('input',()=>{
    api.change(captions.value,colorInput.value,opacityInput.value,sizeInput.value)
})
clearbutton.addEventListener('click',()=>{
    captions.value=""
})