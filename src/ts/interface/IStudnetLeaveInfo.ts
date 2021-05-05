import EStudentState from '../enum/EStudentState';
import EApproveState from '../enum/EApproveState';

export default interface IStudnetLeaveInfo {
  orderId: string; // 请假单编号
  stuId: number; // 学生卡id
  stuName: string; //学生姓名
  majorNo?: number; //专业代码
  major: string; //专业名称
  collegeNo?: number; //学院代码
  college: string; //学院名称
  reason: string; //请假原因
  leaveType: string; //请假类型
  leaveCourse?: string; //请假课程
  startTime: string; //离校时间，13位时间戳
  endTime: string; //返校时间 13位时间戳
  pickTeacher?: string; //  选择提醒的教师
  state?: EStudentState; //学生请假状态
  approveState?: EApproveState; //教师批准状态
  approver?: string; //批准教师
}
