import axios from 'axios';
import { IOtherEnter, IOtherInfo } from '../ts/interface/Other';
import moment from 'moment';
import IState from '../ts/interface/IState';
const url = 'http://127.0.0.1:3001';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';
async function getOtherInfoService() {
  const res = await axios.get(`${url}/getOtherInfo`);
  console.log(
    `ML ~ file: otherService.ts ~ line 9 ~ getOtherInfoService ~ res`,
    res,
  );
  const otherInfo: IOtherInfo[] = [];
  for (let info of res.data.data) {
    const { startTime, endTime, ...item } = info;
    otherInfo.push({
      ...item,
      startTime: moment(startTime).format(dateFormat),
      endTime: moment(endTime).format(dateFormat),
    });
  }
  if (res.data.error === 0) {
    return {
      error: 0,
      msg: 'success',
      data: otherInfo,
    };
  } else {
    return {
      error: 4001,
      msg: '暂无信息',
    };
  }
}
async function orderEnterSchool(params: IOtherEnter) {
  const res = await axios.post(`${url}/otherEnter`, params);
  if (res.data.error === 0) {
    return {
      error: 0,
      msg: 'success',
    };
  }
}
async function approveOtherService(params: IState) {
  const res = await axios.post(`${url}/approveOther`, params);
  if (res.data.error === 0) {
    return {
      error: 0,
    };
  } else {
    return {
      error: res.data.error,
    };
  }
}
export { getOtherInfoService, orderEnterSchool, approveOtherService };
