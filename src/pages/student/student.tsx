import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Button,
  Input,
  Select,
  Checkbox,
  Modal,
  Table,
  Form,
  DatePicker,
  Cascader,
  message,
  List,
} from 'antd';
import styles from './index.css';
import sessionStorageService from '@/service/sessionStorageService';
import {
  getStudentInfos,
  getStudentLeaveInfoById,
  handleStudentLeaveInfo,
  getTeacherName,
} from '../../service/index';
import IStudnetLeaveInfo from '../../ts/interface/IStudnetLeaveInfo';
import IStudnetInfos from '../../ts/interface/IStudentInfos';
const { Option } = Select;

const dateFormat = 'YYYY/MM/DD- hh:mm:ss';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
interface ITeacher {
  account: number;
  username: string;
}
export default () => {
  const [visible, setVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [studentInfos, setStudentInfos] = useState<IStudnetInfos>(Object); //学生信息
  const [studentLeaveInfo, setStudentLeaveInfo] = useState<IStudnetLeaveInfo>(); //单条学生请假信息
  const [studentLeaveInfos, setStudentLeaveInfos] = useState<
    Array<IStudnetLeaveInfo>
  >(); //学生全部请假信息
  const [teacherName, setTeacherName] = useState<Array<ITeacher>>();
  const [form] = Form.useForm();
  const columns = [
    // {
    //   title: '学生id',
    //   key: 'stuId',
    //   dataIndex: 'stuId',
    // },
    {
      title: '学生姓名',
      key: 'stuName',
      dataIndex: 'stuName',
      render: (text: string, record: IStudnetLeaveInfo) => (
        <Button type="link" onClick={() => showStudentLeaveInfo(record)}>
          {text}
        </Button>
      ),
    },
    // {
    //   title: '学生学院专业信息',
    //   key: 'collegeInfo',
    //   dataIndex: 'collegeInfo',
    // },
    // {
    //   title: '离校理由',
    //   key: 'reason',
    //   dataIndex: 'reason',
    //   width: '15%',
    // },
    {
      title: '请假类型',
      key: 'leaveType',
      dataIndex: 'leaveType',
    },
    {
      title: '请假时间',
      key: 'startTime',
      dataIndex: 'startTime',
    },
    {
      title: '结束时间',
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
      title: '批准教师',
      key: 'approver',
      dataIndex: 'approver',
    },
  ];
  function onCancel() {
    setVisible(false);
  }
  function onCancelStudent() {
    setInfoVisible(false);
  }
  async function onSubmit() {
    const { reason, leaveType, pickTeacher, time } = form.getFieldsValue();
    console.log(
      `ML ~ file: page3.tsx ~ line 27 ~ onSubmit ~ form.getFieldsValue()`,
      form.getFieldsValue(),
    );
    const startTime = time[0];
    const endTime = time[1];
    const params = {
      orderId: `ORDER${new Date().getTime()}`,
      ...studentInfos,
      reason: reason,
      pickTeacher: pickTeacher,
      leaveType: leaveType,
      startTime: moment(startTime).format('x'),
      endTime: moment(endTime).format('x'),
    };
    console.log(
      `ML ~ file: page3.tsx ~ line 37 ~ onSubmit ~ params`,
      JSON.stringify(params, null, 2),
    );
    const handleResult = await handleStudentLeaveInfo(params);
    if (handleResult && handleResult.error !== 0) {
      message.error('申请错误');
      setVisible(false);
      return;
    }
    const stuId = sessionStorageService.getUser().account;
    const leaveInfoRes = await getStudentLeaveInfoById(stuId);
    setStudentLeaveInfos(leaveInfoRes.data);
    message.success('申请成功');
    setVisible(false);
  }
  async function getStudentData() {
    const stuId = sessionStorageService.getUser().account;
    const leaveInfoRes = await getStudentLeaveInfoById(stuId);
    const studentInfos = await getStudentInfos(stuId);
    setStudentInfos(studentInfos);
    setStudentLeaveInfos(leaveInfoRes.data);
  }
  function showStudentLeaveInfo(record: IStudnetLeaveInfo) {
    console.log(
      `ML ~ file: student.tsx ~ line 140 ~ showStudentLeaveInfo ~ record`,
      record,
    );
    setInfoVisible(true);
    setStudentLeaveInfo(record);
  }
  function dateLog() {
    console.log('date----------');
  }
  //  获取教师信息
  async function getTeacher() {
    const res = await getTeacherName();
    if (res.error === 0) {
      setTeacherName(res.data);
    }
  }
  useEffect(() => {
    getStudentData();
    getTeacher();
  }, []);
  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        提交请假申请
      </Button>
      <Table columns={columns} dataSource={studentLeaveInfos}></Table>
      <Modal
        visible={infoVisible}
        title="请假信息详情"
        onCancel={onCancelStudent}
        footer={null}
      >
        <List>
          <List.Item>学号：{studentLeaveInfo?.stuId}</List.Item>
          <List.Item>专业：{studentLeaveInfo?.major}</List.Item>
          <List.Item>学院：{studentLeaveInfo?.college}</List.Item>
          <List.Item>离校理由：{studentLeaveInfo?.reason}</List.Item>
          <List.Item>请假类型：{studentLeaveInfo?.leaveType}</List.Item>
          <List.Item>请假时间：{studentLeaveInfo?.startTime}</List.Item>
          <List.Item>结束时间：{studentLeaveInfo?.endTime}</List.Item>
          <List.Item>请假状态：{studentLeaveInfo?.state}</List.Item>
          <List.Item>批准状态：{studentLeaveInfo?.approveState}</List.Item>
          <List.Item>批准教师：{studentLeaveInfo?.approver}</List.Item>
        </List>
      </Modal>
      <Modal
        visible={visible}
        destroyOnClose={true}
        onCancel={onCancel}
        footer={null}
        title="申请"
        width={'80vw'}
      >
        <Form
          form={form}
          layout="inline"
          {...layout}
          preserve={false}
          onFinish={onSubmit}
        >
          <Form.Item
            name="id"
            label="学生id"
            initialValue={studentInfos?.stuId}
          >
            <Input disabled={true}></Input>
          </Form.Item>
          <Form.Item
            name="name"
            label="学生姓名"
            initialValue={studentInfos?.stuName}
          >
            <Input disabled={true}></Input>
          </Form.Item>
          <Form.Item
            name="major"
            label="专业信息"
            initialValue={studentInfos?.major}
          >
            <Input disabled={true}></Input>
          </Form.Item>
          <Form.Item
            name="college"
            label="学院信息"
            initialValue={studentInfos?.college}
          >
            <Input disabled={true}></Input>
          </Form.Item>
          <Form.Item
            name="reason"
            label="请假理由"
            style={{ marginTop: 20 }}
            rules={[
              {
                required: true,
                message: '请正确填写字段',
                pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="leaveType"
            label="请假类型"
            style={{ marginTop: 20 }}
            rules={[
              {
                required: true,
                message: '请选择请假类型',
              },
            ]}
          >
            <Select style={{ width: 200 }}>
              <Option value="离校">离校</Option>
              <Option value="课程请假">课程请假</Option>
            </Select>
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
              onChange={dateLog}
              style={{ width: 400 }}
            ></DatePicker.RangePicker>
          </Form.Item>
          <Form.Item
            label="选择提醒的老师"
            name="pickTeacher"
            style={{ marginTop: 20 }}
          >
            <Select style={{ width: 200 }}>
              {teacherName &&
                teacherName.map((teacher) => (
                  <Option value={teacher.account}>{teacher.username}</Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item style={{ marginTop: 20 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
