import { useCallback, useState } from "react";

const useMutation = (mutationFn: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const mutate = useCallback(
    async (variables: any) => {
      setIsLoading(true);
      setIsSuccess(false);
      setIsError(false);
      setError(null);

      try {
        const response = await mutationFn(variables);
        setData(response);
        setIsSuccess(true);
      } catch (err) {
        setIsError(true);
        setError(err as any);
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn],
  );
  return {
    isLoading,
    isSuccess,
    isError,
    data,
    error,
    mutate,
  };
};

export default useMutation;
