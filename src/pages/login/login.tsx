import React, { useState } from 'react';
import { Button, Card, Input } from 'antd';
import { history } from 'umi';
import { UserOutlined, LockOutlined, CloseOutlined } from '@ant-design/icons';
import { userLogin } from '../../service/index';
import styles from './login.css';

export default () => {
  const [account, setAccount] = useState(Number);
  const [psw, setPsw] = useState('');
  async function login() {
    const param = {
      account: account,
      psw: psw,
    };
    const res = await userLogin(param);
    if (res.error === 0) {
      history.push({
        pathname: `/${res.data[0].role}`,
        query: {
          account: `${res.data[0].account}`,
          role: `${res.data[0].role}`,
        },
      });
    }
  }
  async function otherLogin() {
    history.push('/other');
  }
  return (
    <div className={styles.config}>
      <Card title="用户登录" style={{ width: 300 }}>
        <Input
          prefix={
            <UserOutlined style={{ color: '#d9d9d9', paddingRight: 2 }} />
          }
          allowClear
          onChange={(e) => setAccount(+e.target.value.trim())}
        ></Input>
        <Input.Password
          className={styles.mgt20}
          prefix={
            <LockOutlined style={{ color: '#d9d9d9', paddingRight: 2 }} />
          }
          allowClear
          onChange={(e) => setPsw(e.target.value.trim())}
        ></Input.Password>
        <div className={`${styles.mgt20} ${styles.flexRowBetween}`}>
          <Button type="primary" onClick={login}>
            登录
          </Button>
          <Button className={styles.mgl20} type="primary" onClick={otherLogin}>
            校外人员登录
          </Button>
        </div>
      </Card>
    </div>
  );
};
