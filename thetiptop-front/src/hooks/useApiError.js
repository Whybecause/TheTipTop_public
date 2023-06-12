import { useState } from 'react';

const useApiError = () => {
  const initialErrorState = {
    statusText: '',
    status: '',
    content: '',
  };

  const [apiError, setApiError] = useState(initialErrorState);

  const resetApiError = () => setApiError(initialErrorState);

  const updateApiError = (error) => {
    setApiError((prevState) => {
      console.log(error);
      if (!error) {
        return apiError;
      }
      const newError = Object.assign({}, prevState.error);

      newError.status = error.response.status;
      newError.statusText = error.response.statusText;

      const { data } = error.response;

      newError.content =
      typeof data?.content === 'string' ?
        data?.content :
          typeof data === 'string' ?
            data : 'error';

      return newError;
    });
  };
  return [apiError, updateApiError, resetApiError];
};

export default useApiError;
