import { bootstrap,mount, unmount, update } from './util'


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
}

export default baseEntry