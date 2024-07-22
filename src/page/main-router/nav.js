import React, {createContext, useEffect, useReducer, useState, useContext} from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const Nav = (props) => {

    const items = [
        getItem('首页', 'index', <MailOutlined />),
        getItem('登录', 'login', <AppstoreOutlined />)
    ];
    const onClick = (e) => {
        console.log('click ', e);
        let { key } = e
        // window.location.href = `${key}`
        props.history.push(key);
    };
    return <Menu
        onClick={onClick}
        style={{
            width: 256,
        }}
        defaultSelectedKeys={['index']}
        // defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
    />
}


export default Nav;