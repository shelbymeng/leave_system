import React, { useEffect, useState } from 'react';
import { Button, Modal, Badge } from 'antd';
import styles from './index.css';
import { history } from 'umi';
import sessionStorageService from '@/service/sessionStorageService';
import EUserRole from '../ts/enum/EUserRole';
import { handleRoleName } from '@/tools/handleParams';
import { getPickInfoService } from '@/service';
import IStudnetLeaveInfo from '../ts/interface/IStudnetLeaveInfo';

const { confirm } = Modal;
function NHeader() {
  const [count, setCount] = useState(Number);
  const [orderId, setOrderId] = useState<Array<string>>();
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
  async function getPickInfo() {
    const res = await getPickInfoService(user.account);
    console.log(`ML ~ file: NHeader.tsx ~ line 29 ~ getPickInfo ~ res`, res);
    if (res && res.error === 0) {
      setCount(res.data.length);
      setOrderId(res.data.map((item: IStudnetLeaveInfo) => item.orderId));
    }
  }
  function search() {
    orderId &&
      history.push({
        pathname: `/${user.role}`,
        query: {
          orderId: orderId,
        },
      });
  }
  useEffect(() => {
    getPickInfo();
  }, []);
  return (
    <header className={styles.NHeader}>
      <span style={{ color: '#ffffff' }}>天津理工大学请假审批系统</span>
      <div>
        <span>{`${handleRoleName(user.role)}：${user.username}`}</span>
        {user.role === EUserRole.TEACHER ||
        user.role === EUserRole.COUNSELOR ? (
          <Button type="link" onClick={search}>
            <span>新消息</span>
            <Badge count={count}></Badge>
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
