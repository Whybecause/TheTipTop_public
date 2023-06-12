import React, { useContext, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

import useApiError from '../hooks/useApiError';
import { SessionContext } from '../context/SessionContext';
import { authService } from '../services/authService';

// REACT_APP_API_URL is exposed by docker for dev env
// REACT_API_DEV_URL is loaded from .env
// when not running the local dev env with docker
// Overwise we use the prod url = api;
const apiUrl = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

const AxiosInterceptor = ({ children }) => {
  const [apiError, updateApiError] = useApiError();
  const toast = useToast();

  const apiErrorDisplay = (
    <div>
      <p>Status: {apiError.status} - {apiError.statusText}</p>
      <p>Content: {apiError.content} </p>
    </div>
  );

  useLayoutEffect(() => {
    if (apiError?.content?.length) {
      toast({
        position: 'top',
        status: 'error',
        title: apiErrorDisplay,
        isClosable: true,
      });
    }
  }, [apiError]);

  const session = useContext(SessionContext);

  useEffect(() => {
    axiosInstance.interceptors.request.use(
        async (config) => {
          if (session?.accessToken) {
            config.headers = {
              'Authorization': `Bearer ${session.accessToken}`,
            };
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        },
    );

    const resInterceptor = (response) => {
      return response;
    };

    const errInterceptor = async (error) => {
      if (error.response.status === 401) {
        await authService.refreshToken(session.refreshToken);
      }

      updateApiError(error);

      return Promise.reject(error);
    };


    const interceptor =
      axiosInstance.interceptors.response.use(resInterceptor, errInterceptor);

    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, []);

  return children;
};
export default axiosInstance;
export { AxiosInterceptor };
