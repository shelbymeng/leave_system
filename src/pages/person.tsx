import React, { useState, useEffect } from 'react';
import { Card, Avatar } from 'antd';
import sessionStorageService from '@/service/sessionStorageService';
import { history } from 'umi';
import { handleRoleName } from '@/tools/handleParams';
const { Meta } = Card;
export default () => {
  const user = sessionStorageService.getUser();
  if (!user) {
    history.push('/login');
  }
  return (
    <div>
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={`${user.account}:${user.username}`}
          description={handleRoleName(user.role)}
        />
      </Card>
    </div>
  );
};
