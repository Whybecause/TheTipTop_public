// Import Third-party Dependencies
import React, { useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import { ErrorContext } from '../../context/ErrorContext';

const ErrorToast = () => {
  /* eslint-disable-next-line no-unused-vars */
  const [state, dispatch] = useContext(ErrorContext);

  const toast = useToast();
  const toastStatus = state.success ? 'success' : 'error';

  React.useEffect(() => {
    if (state.showContent === true) {
      toast({
        position: state.position,
        status: toastStatus,
        title: state.content,
        isClosable: true,
      });
      dispatch({ type: 'RESET' });
    }
  }, [state]);

  return (null);
};


export default ErrorToast;
