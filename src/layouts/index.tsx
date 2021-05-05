import React, { useEffect, useState } from 'react';
import { Button, Layout, Menu, Card, Select } from 'antd';
import { Link, history } from 'umi';
import NHeader from '../component/NHeader';
import NFooter from '../component/NFooter';
import NSider from '../component/NSider';
import sessionStorageService from '@/service/sessionStorageService';
import EUserRole from '../ts/enum/EUserRole';
import IUserRole from '../ts/interface/IUserRole';

const { Header, Content, Footer } = Layout;

export default (props: any) => {
  const getUser = sessionStorageService.getUser();
  if (!getUser) {
    history.push('/login');
    return null;
  }
  return (
    <div>
      <Layout>
        <Header style={{ color: '#ffffff' }}>
          <NHeader></NHeader>
        </Header>
        <Content>
          <Layout>
            <NSider></NSider>
            <Content style={{ padding: '24px', minHeight: 280 }}>
              <Card>{props.children}</Card>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <NFooter></NFooter>
        </Footer>
      </Layout>
    </div>
  );
};
