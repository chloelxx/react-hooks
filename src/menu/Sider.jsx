import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { menu } from './config';
const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

export const SiderBar = () => {
  // 这个的作用是保留刷新的时候对应的路由所展开选中的菜单
  let key = window.location.href.split('/study/')[1];
  console.log('SiderBar重新执行', key);
  const map = {
    main: 'main',
    useref: 'useref',
    useref2: 'useref2',
    errorbounary: 'errorbounary',
    useerrorbounary: 'useerrorbounary',
  };
  const [openKeys, setOpenKeys] = useState(['sub0']);
  const [selectKey, setSelectKey] = useState([map[key]]);
  return (
    <Menu mode="inline" defaultSelectedKeys={selectKey} defaultOpenKeys={openKeys} style={{ width: 256 }} theme="dark">
      {menu.map((item, index) => (
        <SubMenu key={`sub${index}`} icon={<MailOutlined />} title={item.title}>
          {item.children &&
            item.children.map((subItem) => (
              <Menu.Item key={subItem.id}>
                <Link to={subItem.path}>{subItem.title}</Link>
              </Menu.Item>
            ))}
        </SubMenu>
      ))}
    </Menu>
  );
};
