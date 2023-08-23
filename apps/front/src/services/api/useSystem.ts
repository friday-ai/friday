import { useMutation } from 'react-query';

import useApp from '../app/useApp';

const useSystem = () => {
  const { request } = useApp();
  const initSystem = useMutation(() => request<boolean>('post', '/api/v1/system/init'));

  return {
    initSystem,
  };
};

export default useSystem;
