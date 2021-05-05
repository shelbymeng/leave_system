import EStudentState from '../ts/enum/EStudentState';
import EApproveState from '../ts/enum/EApproveState';
import EUserRole from '@/ts/enum/EUserRole';

function handleInfoState(status: EStudentState) {
  switch (status) {
    case EStudentState.FINISHED:
      return '已批准';
    case EStudentState.PENDING:
      return '正在审批';
    case EStudentState.REJECTED:
      return '已拒绝';
  }
}
function handleApproveState(status: EApproveState) {
  switch (status) {
    case EApproveState.APPROVE:
      return '已同意';
    case EApproveState.REJECT:
      return '已拒绝';
  }
}
function handleRole(role: EUserRole) {
  switch (role) {
    case EUserRole.STUDENT:
      return '离校申请';
    case EUserRole.TEACHER:
      return '离校审批';
    case EUserRole.COUNSELOR:
      return '离校审批';
    case EUserRole.ADMIN:
      return '审批列表';
  }
}
export { handleInfoState, handleApproveState, handleRole };
