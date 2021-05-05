import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Layout, Menu } from 'antd';
import { handleRole } from '@/tools/handleParams';
import sessionStorageService from '@/service/sessionStorageService';

const { Sider } = Layout;

function NSider() {
  const userInfo = sessionStorageService.getUser();
  if (!userInfo) {
    history.push('/login');
  }
  const pathname = userInfo.role;
  const roleName = handleRole(userInfo.role);

  return (
    <div>
      <Sider className="site-layout-background" width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['2']}
          style={{ height: '100%' }}
        >
          <Menu.Item key="1" onClick={() => history.push('/adminService')}>
            广场
          </Menu.Item>
          <Menu.Item key="2" onClick={() => history.push(`/${pathname}`)}>
            {roleName}
          </Menu.Item>
          <Menu.Item key="3" onClick={() => history.push('./news')}>
            校园新闻
          </Menu.Item>
          <Menu.Item key="4">option4</Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
export default NSider;
