import axios from 'axios';
import IState from '../ts/interface/IState';
import IUser from '../ts/interface/IUser';
import IStudnetLeaveInfo from '../ts/interface/IStudnetLeaveInfo';
import IStudnetInfos from '@/ts/interface/IStudentInfos';
import IComments from '../ts/interface/IComments';
import moment from 'moment';
import sessionStorageService from '@/service/sessionStorageService';
import INews from '../ts/interface/INews';
const url = 'http://127.0.0.1:3001';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';
/**
 * 登录
 */
async function userLogin(params: IUser) {
  const { account, psw } = params;
  const loginParam = {
    account: account,
    psw: psw,
  };
  const loginResult = await axios.post(`${url}/login`, loginParam);
  if (loginResult.data.error !== 0) {
    return {
      error: 1001,
      msg: '登陆失败',
    };
  }
  //  设置session
  sessionStorageService.setUser({
    account: loginResult.data.data[0].account,
    username: loginResult.data.data[0].username,
    role: loginResult.data.data[0].role,
  });
  return loginResult.data;
}
/**
 * 获取学生信息
 */
async function getStudentInfos(id: number): Promise<IStudnetInfos> {
  const param = {
    stuId: id,
  };
  const studentInfoResult = await axios.post(`${url}/getStudentInfos`, param);
  console.log(
    `ML ~ file: index.ts ~ line 20 ~ getStudentInfos ~ studentInfoResult`,
    studentInfoResult,
  );
  // const { stuId, stuName, major, college } = studentInfoResult.data.data[0];
  // const studentInfo = {
  //   stuId: stuId,
  //   stuName: stuName,
  //   major: major,
  //   college: college,
  // };
  // return studentInfo;
  return studentInfoResult.data.data[0];
}
/**
 * 获取学生请假信息表(学生)
 * @param stuId number
 * @returns IStudentInfo
 */
async function getStudentLeaveInfoById(stuId: number) {
  const param = {
    stuId: stuId,
  };
  const studentInfoResult = await axios.post(
    `${url}/getStudentLeaveInfoById`,
    param,
  );
  console.log(
    `ML ~ file: index.ts ~ line 55 ~ getStudentLeaveInfoById ~ studentInfoResult`,
    studentInfoResult,
  );
  if (studentInfoResult.data.error !== 0) {
    return {
      error: studentInfoResult.data.error,
      msg: studentInfoResult.data.msg,
    };
  }
  const studentsInfo: IStudnetLeaveInfo[] = [];
  for (let info of studentInfoResult.data.data) {
    const { startTime, endTime, ...item } = info;
    studentsInfo.push({
      ...item,
      startTime: moment(startTime).format(dateFormat),
      endTime: moment(endTime).format(dateFormat),
    });
  }
  return {
    error: 0,
    data: studentsInfo,
  };
}
/**
 * 获取学生请假信息表(教师)
 * @param stuId number
 * @returns IStudentInfo
 */
async function getStudentLeaveInfo() {
  const res = await axios.get(`${url}/getStudentLeaveInfo`);
  if (res.data.error !== 0) {
    return {
      error: res.data.error,
      msg: res.data.msg,
    };
  }
  const studentsInfo: IStudnetLeaveInfo[] = [];
  for (let info of res.data.data) {
    const { startTime, endTime, ...item } = info;
    studentsInfo.push({
      ...item,
      startTime: moment(startTime).format(dateFormat),
      endTime: moment(endTime).format(dateFormat),
    });
  }
  return {
    error: 0,
    data: studentsInfo,
  };
}
/**
 * 提交学生请假信息
 */
async function handleStudentLeaveInfo(params: IStudnetLeaveInfo) {
  console.log(
    `ML ~ file: index.ts ~ line 67 ~ handleStudentLeaveInfo ~ params`,
    params,
  );
  const handleResult = await axios.post(
    `${url}/handleStudentLeaveInfo`,
    params,
  );
  console.log(
    `ML ~ file: index.ts ~ line 72 ~ handleStudentLeaveInfo ~ handleResult`,
    handleResult,
  );
  if (handleResult.data.error === 0) {
    return {
      error: 0,
      msg: 'success',
    };
  }
}
/**
 * 教师批准学生请假信息
 */
async function approveStudent(params: IState) {
  const { orderId, approveState, approver } = params;
  const approveParams = {
    orderId: orderId,
    approveState: approveState,
    approver: approver,
  };
  const approveResult = await axios.post(
    `${url}/approveStudent`,
    approveParams,
  );
  console.log(
    `ML ~ file: index.ts ~ line 32 ~ approveStudent ~ approveResult`,
    approveResult,
  );
  if (approveResult.data.error !== 0) {
    return {
      error: approveResult.data.error,
    };
  }
  return {
    error: 0,
    msg: 'success',
  };
}
/**
 * 获取教师名字
 */
async function getTeacherName() {
  const res = await axios.get(`${url}/getTeacherName`);
  if (res.data.error !== 0) {
    return {
      error: res.data.error,
      msg: res.data.msg,
    };
  }
  return {
    error: 0,
    msg: 'success',
    data: res.data.data,
  };
}
/**
 * 获取全部留言
 */
async function getCommentService() {
  const res = await axios.get(`${url}/getComments`);
  if (res.data.error !== 0) {
    return {
      error: res.data.error,
      msg: res.data.msg,
    };
  }
  const comments: IComments[] = [];
  for (let comment of res.data.data) {
    const { datetime, ...item } = comment;
    comments.push({
      ...item,
      datetime: moment(datetime).format(dateFormat),
    });
  }
  return {
    error: 0,
    msg: 'success',
    data: comments,
  };
}
/**
 * 提交留言
 * @param params
 */
async function addCommentService(params: IComments) {
  const res = await axios.post(`${url}/addComments`, params);
  if (res.data.error !== 0) {
    return {
      error: res.data.error,
      msg: res.data.msg,
    };
  }
  return {
    error: 0,
    msg: 'success',
  };
}
/**
 * 获取留言回复
 */
async function getReplyService() {
  const res = await axios.get(`${url}/getReplys`);
  if (res.data.error !== 0) {
    return {
      error: res.data.error,
      msg: res.data.msg,
    };
  }
  const comments: IComments[] = [];
  for (let comment of res.data.data) {
    const { datetime, ...item } = comment;
    comments.push({
      ...item,
      datetime: moment(datetime).format(dateFormat),
    });
  }
  return {
    error: 0,
    data: comments,
  };
}
/**
 * 提交留言回复
 * @param params
 */
async function addReplyService(params: IComments) {
  const res = await axios.post(`${url}/addReplys`, params);
  if (res.data.error !== 0) {
    return {
      error: res.data.error,
      msg: res.data.msg,
    };
  }
  return {
    error: 0,
    msg: 'success',
  };
}
/**
 * 获取新闻
 */
async function getNewService() {
  const res = await axios.get(`${url}/getNews`);
  if (res.data.error !== 0) {
    return {
      error: res.data.error,
      msg: res.data.msg,
    };
  }
  const newArr: INews[] = [];
  for (let news of res.data.data) {
    const { time, ...item } = news;
    newArr.push({
      ...item,
      time: moment(time).format(dateFormat),
    });
  }
  return {
    error: 0,
    msg: 'success',
    data: newArr,
  };
}
/**
 * 获取指定教师离校信息
 */
async function getPickInfoService(account: number) {
  const res = await axios.post(`${url}/getPickInfo`, { account: account });
  if (res.data.error === 0) {
    return {
      error: 0,
      data: res.data.data,
    };
  } else {
    return {
      data: [],
    };
  }
}
export {
  userLogin,
  getStudentInfos,
  getStudentLeaveInfoById,
  getStudentLeaveInfo,
  handleStudentLeaveInfo,
  approveStudent,
  getTeacherName,
  getCommentService,
  addCommentService,
  getReplyService,
  addReplyService,
  getNewService,
  getPickInfoService,
};
