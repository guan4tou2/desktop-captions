# Desktop Captions

Desktop Captions is an Electron application that allows you to display customizable text or image overlays on your desktop. It's perfect for keeping important notes, displaying branding, or simply adding a personal touch to your workspace.

## Features

*   **Customizable Overlays:** Display any text or image (from a URL) as an overlay.
*   **Appearance Control:** Adjust the text color, font size, and opacity of the overlay to your liking.
*   **Always on Top:** The overlay window stays on top of all other applications.
*   **Click-Through Mode:** Set the overlay to be click-through, so it doesn't interfere with your work.
*   **Draggable Window:** Easily move the overlay window to any position on your screen.
*   **Tray Icon Access:** Quickly access the application's control panel or quit via the system tray icon.
*   **Modern Control Panel:** A sleek control panel with a dynamic animated background (using Vanta.js).

## Screenshots

*(Add screenshots of the application here. For example, the control panel and an overlay in action.)*

**Control Panel:**
![Control Panel Screenshot Placeholder](placeholder_control_panel.png)

**Example Overlay:**
![Overlay Screenshot Placeholder](placeholder_overlay.png)

## Getting Started

You can get Desktop Captions in the following ways:

*   **Pre-built Releases:** Look for pre-built versions for Windows (.exe portable or NSIS installer), Linux (.AppImage, .deb), and macOS (.dmg) on the [releases page](https://github.com/guan4tou2/desktop-captions/releases) (if available).
*   **Building from Source:** Follow the instructions in the "Building from Source" section below.

### Usage

1.  **Launch the application.**
2.  The **Control Panel** will appear:
    *   Enter the text you want to display in the "Text" area. You can also input a direct URL to an image (e.g., `https://path.to/your/image.png`).
    *   Adjust the **Color**, **Font Size**, and **Opacity** using the respective controls.
3.  Click **"Start Overlay"** to display the caption window.
    *   The overlay will appear on your screen. You can drag it to position it.
4.  Click **"Set Overlay"** to make the overlay click-through. This means clicks will pass through the overlay to the windows underneath. The red border will disappear.
5.  Click **"Stop Overlay"** to remove the caption window.
6.  You can find the application icon in the **system tray**.
    *   Click it to show the Control Panel if it's hidden.
    *   Right-click for options to open the Control Panel or quit the application.

## Building from Source

To build and run Desktop Captions from source, you'll need [Node.js](https://nodejs.org/) and npm (which comes with Node.js) installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/guan4tou2/desktop-captions.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd desktop-captions
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run the application in development mode:**
    *   This will also build the necessary JavaScript bundles using Webpack.
    ```bash
    npm start
    ```
5.  **Build distributables (optional):**
    *   To create packaged versions for your operating system (e.g., .exe, .AppImage):
        ```bash
        npm run pack-dist
        ```
    *   To build an unpacked version in a directory:
        ```bash
        npm run pack
        ```
    *   The built files will be located in the `pack` directory.

## Technologies Used

*   **[Electron](https://www.electronjs.org/):** For building the cross-platform desktop application.
*   **[Node.js](https://nodejs.org/):** As the runtime environment for Electron and build scripts.
*   **HTML, CSS, JavaScript:** The core web technologies for building the UI and application logic.
*   **[Webpack](https://webpack.js.org/):** For bundling JavaScript modules.
*   **[Tailwind CSS](https://tailwindcss.com/):** Used for styling the control panel UI.
*   **[Vanta.js](https://www.vantajs.com/):** For the animated background in the control panel.
*   **[electron-builder](https://www.electron.build/):** For packaging and building distributable versions of the application.

## License

This project is licensed under the [CC0-1.0 Universal](LICENSE) Creative Commons Zero v1.0 Universal License. You can find the full license text in the LICENSE file.

Essentially, this means the software is dedicated to the public domain, and you are free to use, modify, distribute, and sublicense the work without any restrictions.