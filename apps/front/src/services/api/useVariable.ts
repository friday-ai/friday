import { VariableAttributes, VariableCreationAttributes } from '@friday-ai/shared';
import { useMutation } from 'react-query';

import useApp from '../app/useApp';

const useVariable = () => {
  const { request } = useApp();
  const createVariable = useMutation((variable: VariableCreationAttributes) => request<VariableAttributes>('post', '/api/v1/variable', {}, variable));
  const deleteVariable = useMutation((id: string) => request<boolean>('delete', '/api/v1/variable/:id', { id }));

  return {
    createVariable,
    deleteVariable,
  };
};

export default useVariable;
