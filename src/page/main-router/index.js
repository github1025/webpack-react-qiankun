import React, {createContext, useEffect, useReducer, useState, useContext} from 'react';
import { registerMicroApps, start, setDefaultMountApp, addGlobalUncaughtErrorHandler } from 'qiankun';
import 'antd/dist/antd.css';
import './index.scss'
import Nav from './nav'
import { SyncOutlined } from '@ant-design/icons';
import ReactDOM from "react-dom";
const MainRouter =(props)=> {

    let { location } = props

    const { pathname='', hash } = location || {}
    useEffect(()=>{
        console.log("process.env.staticPath", process.env.staticPath)
        console.log("process.env.menus", process.env.menus)
        console.log("process.env.dirname", process.env.dirname)


        let menuList = []
        window.MENU_LIST.forEach(menu=>{
            menuList.push(getMenuItem(menu))
        })
        console.log("乾坤的路由", menuList)
        registerMicroApps(menuList);
        if( menuList?.length ){
            const { pathname } = window.location
            if( ( pathname == '' || pathname == '/' ) && pathname != `${menuList[0]?.url}`){
                setDefaultMountApp(`${menuList[0]?.url}`);
            }
        }
        start({
            prefetch:false
        });
    },[])
    // useEffect(()=>{
    //     addGlobalUncaughtErrorHandler((event) => {
    //         const { type, message = '', lineno, colno, filename } = event
    //         if( type === 'error' || type === 'unhandledrejection' ){
    //             if(
    //                 message?.indexOf("export lifecycle functions in app-") == -1 &&
    //                 type === 'unhandledrejection'
    //             ){
    //                 document.getElementById('main-loading')?.remove()
    //             }
    //             if (
    //                 message !== 'ResizeObserver loop limit exceeded' &&
    //                 message?.indexOf('You need to export lifecycle functions in') == -1 &&
    //                 message?.indexOf('styled-components') == -1
    //             ) {
    //             }
    //         }
    //     });
    // },[])


    const getMenuItem = (menu)=>{
        let activeRuleUrl = `${menu}`
        console.log("activeRuleUrl", activeRuleUrl)
        return {
            name: `${menu}`, // app name registered
            url: activeRuleUrl,
            keyValue: `${menu.toUpperCase()}`,
            entry: `http://localhost:3000/static/qk-container-index.html?v=${window.VERSION}`,
            container: '#qiankun_frame_container',
            activeRule: activeRuleUrl,
            loader:(loading)=>{
                if( loading ){
                    const mainContainer = document.getElementById('qk-container')
                    if( mainContainer ){
                        ReactDOM.render(
                            <div
                                id={'main-loading'}
                                className={'w-100 h-100 d-flex align-items-center justify-content-center'}
                            >
                                <SyncOutlined/>
                            </div>
                            ,
                            mainContainer
                        )
                    }
                }
            }
        }
    }

    useEffect(()=>{
        console.log("页面路由更换了", pathname)
    },[pathname])


    return <div className="main-container">
        <Nav {...props}/>
        <div id={"qiankun_frame_container"}>默认显示内容</div>
    </div>
}


export default MainRouter;