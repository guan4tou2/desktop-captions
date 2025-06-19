/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 * 
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

const { contextBridge, ipcRenderer } = require("electron");


window.addEventListener('DOMContentLoaded', () => {
  console.log('[Preload] DOMContentLoaded event fired V2');
  // Original DOMContentLoaded content (replaceText calls) can remain if they were there
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
});

try {
  console.log('[Preload] Attempting to expose API via contextBridge V2...');
  contextBridge.exposeInMainWorld("API", {
    create: () => ipcRenderer.send("createChild"),
    set: () => ipcRenderer.send("setChild"),
    change: (mytext, colorInput, opacityInput, sizeInput) =>
      ipcRenderer.send("change", mytext, colorInput, opacityInput, sizeInput),
    delete: () => ipcRenderer.send("deleteChild"),
  });
  // Note: Logging window.API here is from preload's context, not renderer's.
  // The important check is logging window.API in the renderer.
  console.log('[Preload] API exposure call completed V2.');
} catch (error) {
  console.error('[Preload] ERROR during contextBridge.exposeInMainWorld:', error);
}

console.log('[Preload] Script finished V2');