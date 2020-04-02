import { DATA_USERS } from 'constants/users';
import initialState from 'initialStates/users';

const users = (state = initialState, action) => {
  switch (action.type) {
    case DATA_USERS:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export default users;
