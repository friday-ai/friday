import { useMutation } from '@tanstack/react-query';

import useApp from '../app/useApp';

const useSystem = () => {
  const { request } = useApp();
  const initSystem = useMutation({ mutationFn: () => request<boolean>('post', '/api/v1/system/init') });

  return {
    initSystem,
  };
};

export default useSystem;
