import axiosInstance from '../helpers/AxiosInterceptor';
const baseURL = '/user';

const getAll = async () => {
  return axiosInstance.get(`${baseURL}`);
};

const getById = async (id) => {
  return axiosInstance.get(`${baseURL}/${id}`);
};

const update = async (id, data) => {
  return axiosInstance.patch(`${baseURL}/${id}`, data);
};

const deleteUser = async (id) => {
  return axiosInstance.delete(`${baseURL}/${id}`);
};

export const userService = {
  getAll,
  getById,
  update,
  deleteUser,
};

// export const serviceUsers= {
//   getAll,
//   getById,
//   create,
//   update,
//   deleteUser,
// };

// const urlUsers = '';

// const headers = {
//   'Accept': 'application/json',
//   'Content-Type': 'application/json',
// };

// export const users = {
//   nickName: string(),
//   password: number()
//       .required('Vous n\'avez pas mis de mot de passe'),
//   email: email()
//       .required('Entrez votre email'),
//   firstName: string(),
//   lastName: string(),
// };

// function getAll() {
//   fetch(urlUsers, {
//     method: 'GET',
//     headers,
//   })
//       .then((res) => res.json())
//       .catch(console.log);
// }

// function getById(id) {
//   fetch( `${urlUsers}/${id}`, {
//     method: 'GET',
//     headers,
//   })
//       .then((res) => res.json())
//       .catch((err) => console.log(err));
// }
// function create(data) {
//   fetch(urlUsers, {
//     method: 'POST',
//     headers,
//     body: data,
//   })
//       .then((res) => res.json())
//       .catch((err) => console.log(err));
// }

// function update(id, data) {
//   fetch(`${urlUsers}/${id}`, {
//     method: 'PUT',
//     headers,
//     body: data,
//   })
//       .then((res) => res.json())
//       .catch((err) => console.log(err));
// }
// function deleteUser(id) {
//   fetch(`${urlUsers}/${id}`, {
//     method: 'DELETE',
//     headers,
//   })
//       .then((res) => res.json())
//       .catch((err) => console.log(err));
// }

