import Cookies from 'js-cookie';

export default {
  access_token: '',
  refresh_token: '',
  username: '',
  email: '',
  windows: {},
};

export const override = ({
  access_token: Cookies.get('access_token'),
  refresh_token: Cookies.get('refresh_token'),
  windows: {},
});
