import { useEffect, useState } from "react";

const useError = () => {
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const handleError = (err: unknown) => {
    setError(err);
  };

  return { handleError };
};

export default useError;
