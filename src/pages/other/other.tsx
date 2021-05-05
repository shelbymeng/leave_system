import React, { useState, useEffect } from 'react';
import {
  Layout,
  Table,
  Button,
  Input,
  Modal,
  Form,
  DatePicker,
  message,
} from 'antd';
import NFooter from '@/component/NFooter';
import moment from 'moment';
import { IOtherInfo } from '../../ts/interface/Other';
const { Footer } = Layout;
import {
  getOtherInfoService,
  orderEnterSchool,
} from '../../service/otherService';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const dateFormat = 'YYYY/MM/DD- hh:mm:ss';

export default () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [otherInfo, setOtherInfo] = useState<Array<IOtherInfo>>();

  const columns = [
    {
      title: '姓名',
      key: 'name',
      dataIndex: 'name',
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
  async function getOtherInfo() {
    const otherRes = await getOtherInfoService();
    console.log(
      `ML ~ file: other.tsx ~ line 71 ~ getOtherInfo ~ otherRes`,
      otherRes,
    );
    if (otherRes.error !== 0) {
      message.warn('暂无信息');
      return;
    }
    if (otherRes.error === 0) {
      setOtherInfo(otherRes.data);
      getOtherInfo();
    }
  }
  async function onSubmit() {
    const { name, reason, time } = form.getFieldsValue();
    console.log(
      `ML ~ file: page3.tsx ~ line 27 ~ onSubmit ~ form.getFieldsValue()`,
      form.getFieldsValue(),
    );
    const startTime = time[0];
    const endTime = time[1];
    const params = {
      orderId: `OTHER${new Date().getTime()}`,
      name: name,
      reason: reason,
      startTime: moment(startTime).format('x'),
      endTime: moment(endTime).format('x'),
    };
    console.log(
      `ML ~ file: page3.tsx ~ line 37 ~ onSubmit ~ params`,
      JSON.stringify(params, null, 2),
    );
    const res = await orderEnterSchool(params);
    if (res && res.error === 0) {
      message.success('提交成功');
    }
    if (res && res.error !== 0) {
      message.success('提交失败');
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
      <Button type="primary" onClick={() => setVisible(true)}>
        提交申请
      </Button>
      <Modal
        visible={visible}
        footer={null}
        destroyOnClose={true}
        onCancel={onCancel}
      >
        <Form
          form={form}
          layout="inline"
          {...layout}
          preserve={false}
          onFinish={onSubmit}
        >
          <Form.Item name="name" label="姓名" style={{ marginTop: 20 }}>
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="reason"
            label="入校理由"
            rules={[
              {
                required: true,
                message: '请正确填写字段',
                pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
              },
            ]}
            style={{ marginTop: 20 }}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="time"
            label="请假时间"
            style={{ marginTop: 20 }}
            rules={[
              {
                required: true,
                message: '请选择请假时间',
              },
            ]}
          >
            <DatePicker.RangePicker
              showTime
              format={dateFormat}
              style={{ width: 400 }}
            ></DatePicker.RangePicker>
          </Form.Item>
          <Form.Item style={{ marginTop: 20 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Layout>
        <Table columns={columns} dataSource={otherInfo}></Table>
        <Footer style={{ textAlign: 'center' }}>
          <NFooter></NFooter>
        </Footer>
      </Layout>
    </div>
  );
};
