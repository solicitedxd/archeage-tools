import history from '../history';

export const push = (to) => {
  history.push(to);
};

export const goForward = () => {
  history.goForward();
};

export const goBack = () => {
  history.goBack();
};

export const replace = (path) => {
  history.replace(path);
};
