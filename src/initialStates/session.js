import Cookies from 'js-cookie';

export default {
  access_token: '',
  refresh_token: '',
  username: '',
  email: '',
};

export const override = ({
  access_token: Cookies.get('access_token'),
  refresh_token: Cookies.get('refresh_token'),
});
