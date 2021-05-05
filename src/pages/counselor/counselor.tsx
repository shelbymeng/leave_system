import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Row, Col, Select, message } from 'antd';
import { getStudentLeaveInfo, approveStudent } from '../../service/index';
import IStudnetLeaveInfo from '../../ts/interface/IStudnetLeaveInfo';
import NewInput from '../../component/newInput/NewInput';
import styles from './counselor.css';
import IState from '../../ts/interface/IState';
import sessionStorageService from '@/service/sessionStorageService';
const { Option } = Select;
export default () => {
  const columns = [
    {
      title: '学生id',
      key: 'stuId',
      dataIndex: 'stuId',
    },
    {
      title: '学生姓名',
      key: 'stuName',
      dataIndex: 'stuName',
      render: (text: string, record: IStudnetLeaveInfo) => (
        <Button type="link" onClick={() => getDetailInfo(record.orderId)}>
          {text}
        </Button>
      ),
    },
    {
      title: '学生专业',
      key: 'major',
      dataIndex: 'major',
    },
    {
      title: '学生学院',
      key: 'college',
      dataIndex: 'college',
    },
    {
      title: '离校理由',
      key: 'reason',
      dataIndex: 'reason',
    },
    {
      title: '离校时间',
      key: 'startTime',
      dataIndex: 'startTime',
    },
    {
      title: '返校时间',
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

  const [studentInfos, setStudentInfos] = useState<Array<IStudnetLeaveInfo>>(); //全部学生信息
  const [studentInfo, setStudentInfo] = useState<IStudnetLeaveInfo>(); //单人信息
  const [approveType, setApproveType] = useState('');
  const [modalState, setModalState] = useState(false);
  const user = sessionStorageService.getUser();
  //  获取所有请假记录
  async function getStudentData() {
    const res = await getStudentLeaveInfo();
    console.log(`ML ~ file: teacher.tsx ~ line 73 ~ getStudentData ~ res`, res);
    setStudentInfos(res.data);
  }
  //  获取单条请假记录
  const getDetailInfo = (orderId: string) => {
    setModalState(true);
    if (studentInfos?.length !== 0) {
      let it = studentInfos?.find((item) => item.orderId === orderId);
      setStudentInfo(it);
      console.log(`ML ~ file: page2.tsx ~ line 71 ~ getDetailInfo ~ it`, it);
    }
  };
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
    const approveRes = await approveStudent(params);
    if (approveRes.error !== 0) {
      message.error(approveRes.msg);
    }
    if (approveRes.error === 0) {
      message.success('批准成功');
      getStudentData();
    }
    setModalState(false);
  }
  function changeInfoState(value: string) {
    setApproveType(value);
  }
  const onCancel = () => {
    setModalState(false);
  };

  useEffect(() => {
    getStudentData();
  }, []);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={studentInfos}
        pagination={{ pageSize: 5 }}
      ></Table>
      <Modal
        visible={modalState}
        footer={null}
        onCancel={onCancel}
        width={1000}
        title="详情"
        centered
        destroyOnClose
      >
        <div>
          <Row className={styles.rowConfig}>
            <Col span={8}>
              <NewInput label="学生id" text={studentInfo?.stuId}></NewInput>
            </Col>
            <Col span={8}>
              <NewInput label="学生姓名" text={studentInfo?.stuName}></NewInput>
            </Col>
            <Col span={8}>
              <NewInput label="学院信息" text={studentInfo?.major}></NewInput>
            </Col>
          </Row>
          <Row className={styles.rowConfig}>
            <Col span={8}>
              <NewInput label="学院信息" text={studentInfo?.college}></NewInput>
            </Col>
            <Col span={8}>
              <NewInput label="离校理由" text={studentInfo?.reason}></NewInput>
            </Col>
            <Col span={8}>
              <NewInput
                label="离校事件"
                text={studentInfo?.startTime}
              ></NewInput>
            </Col>
          </Row>
          <Row className={styles.rowConfig}>
            <Col span={8}>
              <NewInput label="返校时间" text={studentInfo?.endTime}></NewInput>
            </Col>
            <Col span={8}>
              <NewInput label="请假状态" text={studentInfo?.state}></NewInput>
            </Col>
            <Col span={8}>
              <NewInput
                label="批准教师"
                text={studentInfo?.approver}
              ></NewInput>
            </Col>
          </Row>
        </div>
        <Select style={{ width: 100 }} onChange={changeInfoState}>
          <Option value="同意">同意</Option>
          <Option value="拒绝">拒绝</Option>
        </Select>
        <Button
          type="primary"
          onClick={() =>
            approve({
              orderId: studentInfo?.orderId!,
              state: studentInfo?.state!,
              approveState: approveType,
              approver: user.username,
            })
          }
        >
          提交
        </Button>
      </Modal>
    </div>
  );
};
