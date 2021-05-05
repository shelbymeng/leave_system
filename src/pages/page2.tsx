import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Row, Col, Select } from 'antd';
import { Link } from 'umi';
import { getStudentInfo, approveStudent } from '../service/index';
import IStudentInfo from '../ts/interface/IStudentInfo';
import NewInput from '../component/newInput/NewInput';
import styles from './index.css';
import IState from '../ts/interface/IState';
import EApproveState from '../ts/enum/EApproveState';
import { handleInfoState } from '../tools/handleParams';

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
      render: (text: string, record: IStudentInfo) => (
        <Button type="link" onClick={() => getDetailInfo(record.stuId)}>
          {text}
        </Button>
      ),
    },
    {
      title: '学生年龄',
      key: 'stuAge',
      dataIndex: 'stuAge',
    },
    {
      title: '学生学院专业信息',
      key: 'stuCollege',
      dataIndex: 'stuCollege',
    },
    {
      title: '离校理由',
      key: 'leaveReason',
      dataIndex: 'leaveReason',
    },
    {
      title: '离校时间',
      key: 'startTime',
      dataIndex: 'startTime',
    },
    {
      title: '返校时间',
      key: 'returnTime',
      dataIndex: 'returnTime',
    },
    {
      title: '状态',
      key: 'studentState',
      dataIndex: 'studentState',
    },
    {
      title: '批准教师',
      key: 'approver',
      dataIndex: 'approver',
    },
  ];

  const [studentInfos, setStudentInfos] = useState<Array<IStudentInfo>>(); //全部学生信息
  const [studentInfo, setStudentInfo] = useState<IStudentInfo>(); //单人信息
  const [approveType, setApproveType] = useState<EApproveState>();
  const [modalState, setModalState] = useState(false);

  async function getStudentData() {
    const res = await getStudentInfo();
    setStudentInfos(res.data);
  }
  const getDetailInfo = (id: number) => {
    setModalState(true);
    if (studentInfos?.length !== 0) {
      let it = studentInfos?.find((item) => item.stuId === id);
      setStudentInfo(it);
      console.log(`ML ~ file: page2.tsx ~ line 71 ~ getDetailInfo ~ it`, it);
    }
  };
  async function approve(params: IState) {
    console.log(
      `ML ~ file: page2.tsx ~ line 85 ~ approve ~ params`,
      JSON.stringify(params),
    );
    const approveRes = await approveStudent(params);
    const studentInfoRes = await getStudentInfo();
    console.log(
      `ML ~ file: page2.tsx ~ line 91 ~ approve ~ studentInfoRes`,
      studentInfoRes,
    );
    setStudentInfos(studentInfoRes.data);
    setModalState(false);
  }
  function changeInfoState(value: EApproveState) {
    value === EApproveState.APPROVE
      ? setApproveType(EApproveState.APPROVE)
      : setApproveType(EApproveState.REJECT);
    console.log(
      `ML ~ file: page2.tsx ~ line 94 ~ changeInfoState ~ value`,
      value,
    );
  }
  const onCancel = () => {
    setModalState(false);
  };

  useEffect(() => {
    getStudentData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={studentInfos}></Table>
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
              <NewInput label="学生年龄" text={studentInfo?.stuAge}></NewInput>
            </Col>
          </Row>
          <Row className={styles.rowConfig}>
            <Col span={8}>
              <NewInput
                label="学院信息"
                text={studentInfo?.stuCollege}
              ></NewInput>
            </Col>
            <Col span={8}>
              <NewInput
                label="离校理由"
                text={studentInfo?.leaveReason}
              ></NewInput>
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
              <NewInput
                label="返校时间"
                text={studentInfo?.returnTime}
              ></NewInput>
            </Col>
            <Col span={8}>
              <NewInput
                label="请假状态"
                text={
                  studentInfo?.studentState &&
                  handleInfoState(studentInfo.studentState)
                }
              ></NewInput>
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
          <Option value="approve">同意</Option>
          <Option value="reject">拒绝</Option>
        </Select>
        <Button
          type="primary"
          onClick={() =>
            approve({
              id: studentInfo?.stuId!,
              studentState: studentInfo?.studentState!,
              approveState: approveType!,
            })
          }
        >
          按钮
        </Button>
      </Modal>
    </div>
  );
};
