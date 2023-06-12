import axiosInstance from '../helpers/AxiosInterceptor';

const sendMail = async (mailType, data) => {
  return axiosInstance.post('/mail', { mailType, data });
};

export const mailService = {
  sendMail,
};
