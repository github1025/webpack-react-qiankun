import { bootstrap,mount, unmount, update } from './util'
import init from "../../webpack_plugins/DomToCodeWebpackPlugin/init";

const baseEntry = (App) => {
	const initWindow=()=>{
		window.STATIC_PATH = process.env.staticPath
		window.qiankunLifecycle = {
			bootstrap,
			mount:(props)=>mount({...props , GetApp: App, DomContainer: 'qk-container'}),
			unmount,
			update,
		};
		window.qiankunLifecycle.mount()
		console.log("window.qiankunLifecycle", window.qiankunLifecycle)
		console.log("window", window)
	}

	initWindow()
	init()
}

export default baseEntry
