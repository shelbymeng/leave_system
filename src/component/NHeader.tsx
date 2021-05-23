import React from 'react';
import { Button, Modal, Badge } from 'antd';
import styles from './index.css';
import { history } from 'umi';
import sessionStorageService from '@/service/sessionStorageService';
import EUserRole from '../ts/enum/EUserRole';
import { handleRoleName } from '@/tools/handleParams';
const { confirm } = Modal;
function NHeader() {
  const user = sessionStorageService.getUser();
  const logout = () => {
    confirm({
      title: '退出登录',
      content: '您确定要退出吗？',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk() {
        sessionStorage.clear();
        history.replace('/login');
      },
      onCancel() {},
    });
  };
  return (
    <header className={styles.NHeader}>
      <span style={{ color: '#ffffff' }}>在线请假平台</span>
      <div>
        <span>{`${handleRoleName(user.role)}：${user.username}`}</span>
        {user.role === EUserRole.TEACHER ||
        user.role === EUserRole.COUNSELOR ? (
          <Button type="link">
            <span>新消息</span>
            <Badge count="1"></Badge>
          </Button>
        ) : null}

        <Button
          type="primary"
          onClick={() => logout()}
          style={{ marginLeft: 20 }}
        >
          退出
        </Button>
      </div>
    </header>
  );
}
export default NHeader;
