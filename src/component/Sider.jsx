import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

export const SiderBar = () => {
  const [openKeys, setOpenKeys] = useState(['sub4']);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ width: 256 }} theme="dark">
      <SubMenu key="sub1" icon={<MailOutlined />} title="reactApi">
        <Menu.Item key="1">
          <Link to={'/study/main'}>ref2</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={'/study/useref'}>ref</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={'/study/use/useref2'}>use/useref2</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to={'/study/useref/useref2'}>useref/useref2</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="reactComponent">
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" icon={<SettingOutlined />} title="errorBoundary">
        <Menu.Item key="9">
          <Link to={'/study/errorbounary'}>用例1</Link>
        </Menu.Item>
        <Menu.Item key="10">
          <Link to={'/study/errorbounary2'}>用例2</Link>
        </Menu.Item>
        <Menu.Item key="11">
          <Link to={'/study/errorbounary3'}>用例3</Link>
        </Menu.Item>
        <Menu.Item key="12">
          <Link to={'/study/errorbounary4'}>用例4</Link>
        </Menu.Item>
        <Menu.Item key="13">
          <Link to={'/study/errorbounary5'}>用例5</Link>
        </Menu.Item>
        <Menu.Item key="14">
          <Link to={'/study/errorbounary6'}>用例6</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub3" icon={<AppstoreOutlined />} title="useErrorBoundary">
        <Menu.Item key="15">
          <Link to={'/study/useerrorbounary'}>useErrorBoundary用例</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
