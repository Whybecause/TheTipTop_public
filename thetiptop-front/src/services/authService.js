import axiosInstance from '../helpers/AxiosInterceptor';

import {
  getSessionCookie,
  removeSessionCookie,
  setSessionCookie,
} from '../context/SessionContext';
import { ROLES } from '../config/roles';

const login = async (data) => {
  try {
    const result = await axiosInstance.post('/login', data);
    const user = result.data.content;
    setSessionCookie(user);
    if (user?.role === ROLES.USER) {
      window.location.href = '/';
    } else {
      window.location.href = '/admin';
    }
  } catch (error) {
    return;
  }
};

const googleLogin = async (googleData) => {
  try {
    const { tokenId, googleId } = googleData;
    const result =
      await axiosInstance.post('/auth/google', { tokenId, googleId });
    const user = result.data.content;
    setSessionCookie(user);
    if (user?.role === ROLES.USER) {
      window.location.href = '/';
    } else {
      window.location.href = '/admin';
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  removeSessionCookie();
  window.location.reload();
};

const register = async (data) => {
  try {
    const result = await axiosInstance.post('/user', data);
    setSessionCookie(result.data.content);
    window.location.reload();
  } catch (error) {
    return;
  }
};

const requestResetPasswordLink = (data) => {
  return axiosInstance.post('/password/reset-link', data);
};

const submitNewPassword = (data) => {
  return axiosInstance.patch('/password/reset', data);
};

/**
 *
 * @param {string} refreshToken
 * @return {string} accessToken
 */
const refreshToken = async (refreshToken) => {
  const result = await axiosInstance.post('/refreshToken', { refreshToken });
  const accessToken = result.data.content;
  const session = getSessionCookie();
  setSessionCookie({ ...session, accessToken });
  return accessToken;
};

export const authService = {
  login,
  googleLogin,
  logout,
  register,
  refreshToken,
  requestResetPasswordLink,
  submitNewPassword,
};
