import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Select, message, List } from 'antd';
import IState from '../../ts/interface/IState';
import sessionStorageService from '@/service/sessionStorageService';
import { IOtherInfo } from '../../ts/interface/Other';
import {
  getOtherInfoService,
  approveOtherService,
} from '../../service/otherService';
const { Option } = Select;
export default () => {
  const [otherInfo, setOtherInfo] = useState<Array<IOtherInfo>>();
  const [singleInfo, setSingleInfo] = useState<IOtherInfo>();
  const [visible, setVisible] = useState(false);
  const [approveType, setApproveType] = useState('');

  const columns = [
    {
      title: '姓名',
      key: 'name',
      dataIndex: 'name',
      render: (text: string, record: IOtherInfo) => (
        <Button type="link" onClick={() => getDetailInfo(record.orderId)}>
          {text}
        </Button>
      ),
    },
    {
      title: '入校理由',
      key: 'reason',
      dataIndex: 'reason',
      width: '15%',
    },
    {
      title: '入校时间',
      key: 'startTime',
      dataIndex: 'startTime',
    },
    {
      title: '离校时间',
      key: 'endTime',
      dataIndex: 'endTime',
    },
    {
      title: '请假状态',
      key: 'state',
      dataIndex: 'state',
    },
    {
      title: '批准状态',
      key: 'approveState',
      dataIndex: 'approveState',
    },
    {
      title: '批准人',
      key: 'approver',
      dataIndex: 'approver',
    },
  ];

  const user = sessionStorageService.getUser();
  //    获取校外人员信息
  async function getOtherInfo() {
    const otherRes = await getOtherInfoService();
    if (otherRes.error !== 0) {
      message.warn('暂无信息');
      return;
    }
    if (otherRes.error === 0) {
      setOtherInfo(otherRes.data);
    }
  }
  //    获取单条校外人员信息
  function getDetailInfo(orderId: string) {
    setVisible(true);
    if (otherInfo?.length !== 0) {
      let it = otherInfo?.find((item) => item.orderId === orderId);
      setSingleInfo(it);
    }
  }
  //    设置批准状态
  function changeInfoState(value: string) {
    setApproveType(value);
  }
  //  批准
  async function approve(params: IState) {
    console.log(
      `ML ~ file: page2.tsx ~ line 85 ~ approve ~ params`,
      JSON.stringify(params),
    );
    if (params.state === '已审批') {
      message.warn('该申请已审批');
      return;
    }
    const approveRes = await approveOtherService(params);
    if (approveRes.error !== 0) {
      message.error('批准失败');
    }
    if (approveRes.error === 0) {
      message.success('批准成功');
      getOtherInfo();
    }
    setVisible(false);
  }
  function onCancel() {
    setVisible(false);
  }
  useEffect(() => {
    getOtherInfo();
  }, []);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={otherInfo}
        pagination={{ pageSize: 5 }}
      ></Table>
      <Modal
        visible={visible}
        title="请假信息详情"
        onCancel={onCancel}
        footer={null}
      >
        <List>
          <List.Item>姓名：{singleInfo?.name}</List.Item>
          <List.Item>入校原因：{singleInfo?.reason}</List.Item>
          <List.Item>请假时间：{singleInfo?.startTime}</List.Item>
          <List.Item>结束时间：{singleInfo?.endTime}</List.Item>
          <List.Item>请假状态：{singleInfo?.state}</List.Item>
          <List.Item>批准状态：{singleInfo?.approveState}</List.Item>
          <List.Item>批准教师：{singleInfo?.approver}</List.Item>
          <List.Item>
            <div>
              <Select style={{ width: 100 }} onChange={changeInfoState}>
                <Option value="同意">同意</Option>
                <Option value="拒绝">拒绝</Option>
              </Select>
              <Button
                type="primary"
                onClick={() =>
                  approve({
                    orderId: singleInfo?.orderId!,
                    state: singleInfo?.state!,
                    approveState: approveType,
                    approver: user.username,
                  })
                }
              >
                提交
              </Button>
            </div>
          </List.Item>
        </List>
      </Modal>
    </div>
  );
};
