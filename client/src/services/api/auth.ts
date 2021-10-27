const hasRoles = (_roles: Array<string>): boolean => {
  return true;
};

const isAuth = (): boolean => {
  return true;
};

const getHeaders = () => {
  const headers = {
    authorization: '',
  };
  if (isAuth()) {
    headers.authorization = `Bearer {token}`;
  }
  return headers;
};

export { getHeaders, hasRoles, isAuth };
