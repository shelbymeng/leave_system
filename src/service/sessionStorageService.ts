import storageUtils from '../tools/storageUtils';
import IUserRole from '../ts/interface/IUserRole';

const USER_KEY = 'user';

function setUser(user: IUserRole) {
  storageUtils.set(USER_KEY, user);
}
function getUser() {
  return storageUtils.get(USER_KEY) as IUserRole;
}
export default {
  setUser,
  getUser,
};
