import { app, BrowserWindow, shell, Menu, ipcMain, IpcMainEvent } from "electron";
import { release } from "node:os";
import { join } from "node:path";
import fs from "fs";
import path from "path";

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, "../");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? join(process.env.DIST_ELECTRON, "../public") : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
	app.quit();
	process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;
// Here, you can also use other preload, preload loads when the app opens
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

async function createWindow() {
	win = new BrowserWindow({
		title: "Main window",
		icon: join(process.env.PUBLIC, "favicon.ico"),
		webPreferences: {
			preload,
			// Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
			// Consider using contextBridge.exposeInMainWorld
			// Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	if (process.env.VITE_DEV_SERVER_URL) {
		// electron-vite-vue#298
		win.loadURL(url);
	} else {
		win.loadFile(indexHtml);
	}

	// Test actively push message to the Electron-Renderer
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", new Date().toLocaleString());
	});

	// Make all links open with the browser, not with the application
	win.webContents.setWindowOpenHandler(({ url }) => {
		if (url.startsWith("https:")) shell.openExternal(url);
		return { action: "deny" };
	});

	// Build menu from template
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	// Insert menu
	Menu.setApplicationMenu(mainMenu);
}

// Custom Menu Bar top of the app
// label: "Hello"                           -   name
// submenu: {}                              -   Create a submenu as an object
// click(){ console.log("Hello World!") }   -   actions to do on a click
// accelerator: "Ctrl+Q"                    -   string to indicate a shortcut
// role: "reload"                           -   role is basically pre-made buttons that have standard behaviour
const mainMenuTemplate = [];

if (process.env.VITE_DEV_SERVER_URL) {
	mainMenuTemplate.push({
		label: "Developer Tools",
		submenu: [
			{
				role: "toggleDevTools",
			},
			{
				role: "reload",
			},
		],
	});
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	win = null;
	if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
	if (win) {
		// Focus on the main window if the user tried to open another
		if (win.isMinimized()) win.restore();
		win.focus();
	}
});

app.on("activate", () => {
	const allWindows = BrowserWindow.getAllWindows();
	if (allWindows.length) {
		allWindows[0].focus();
	} else {
		createWindow();
	}
});

// To use ipc, you have to import ipcMain from ipc for the main processes (electron/backend/node)
// Then you'll need ipcRendere in the rendering processes (react/frontend/browser)
// They work a bit like Socket.IO events where both sides can send events and react to those events.
// ipcMain.on("event", () => {}) or ipcRenderer.on("event", () => {}) to listen to events
// ipcMain.send("event", data) or ipcRenderer.send("event", data) to send an event and data

interface File {
	name: string;
	path: string;
	isDirectory: boolean;
	children?: File[];
}

ipcMain.handle("get-file-tree", async (event: IpcMainEvent) => {
	const basePath = path.join(__dirname, "../computerContent");
	const tree: File[] = [];

	const scanDirectory = (dir: string, parent: File) => {
		const files = fs.readdirSync(dir, { withFileTypes: true });

		files.forEach((file) => {
			const filePath = path.join(dir, file.name);
			const fileTree: File = {
				name: file.name,
				path: filePath,
				isDirectory: file.isDirectory(),
			};

			if (file.isDirectory()) {
				fileTree.children = [];
				scanDirectory(filePath, fileTree);
			}

			parent.children?.push(fileTree);
		});
	};

	scanDirectory(basePath, { name: "", path: basePath, isDirectory: true, children: tree });
	return tree;
});

ipcMain.on("open-file", (event: IpcMainEvent, filePath: string) => {
	fs.readFile(filePath, "utf-8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		event.sender.send("file-content", data);
	});
});
