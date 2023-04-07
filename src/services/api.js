import axios from 'axios'

let apiClient = axios.create({
  baseURL: 'https://job-applications-tracker-api.onrender.com',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
})

function defaultErrorHandler(error) {
  console.log(error)
}

function handleUserData(data) {
  localStorage.setItem('access_token', data.access_token)
  localStorage.setItem('userid', data._id)
  localStorage.setItem('username', data.username)
  localStorage.setItem('display_name', data.display_name)

  apiClient = axios.create({
    baseURL: 'https://job-applications-tracker-api.onrender.com',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

const userApi = {
  login({ username, password }, callback, errorHandler = defaultErrorHandler) {
    apiClient
      .request({
        method: 'post',
        url: '/users/login',
        data: {
          username,
          password,
        },
      })
      .then((response) => {
        handleUserData(response.data)
        callback(response)
      })
      .catch((error) => errorHandler(error))
  },
  register(
    { username, password, display_name, email, profile_picture },
    callback,
    errorHandler = defaultErrorHandler,
  ) {
    apiClient
      .request({
        method: 'post',
        url: '/users',
        data: {
          username,
          password,
          display_name,
          email,
          profile_picture,
        },
      })
      .then((response) => {
        handleUserData(response.data)
        callback(response)
      })
      .catch((error) => errorHandler(error))
  },
  update(user, callback, errorHandler = defaultErrorHandler) {
    apiClient
      .request({
        method: 'patch',
        url: '/users',
        data: user,
      })
      .then((response) => callback(response))
      .catch((error) => errorHandler(error))
  },
  delete(userid, callback, errorHandler = defaultErrorHandler) {
    apiClient
      .request({
        method: 'delete',
        url: `/users/${userid}`,
      })
      .then((response) => callback(response))
      .catch((error) => errorHandler(error))
  },
}

const applicationApi = {
  get(userid, callback, errorHandler = defaultErrorHandler) {
    apiClient
      .request({
        method: 'get',
        url: `/applications/user/${userid}`,
      })
      .then((response) => callback(response))
      .catch((error) => errorHandler(error))
  },
  create(application, callback, errorHandler = defaultErrorHandler) {
    apiClient
      .request({
        method: 'post',
        url: '/applications',
        data: application,
      })
      .then((response) => callback(response))
      .catch((error) => errorHandler(error))
  },
  getByID(applicationID, callback, errorHandler = defaultErrorHandler) {
    apiClient
      .request({
        method: 'get',
        url: `/applications/${applicationID}`,
      })
      .then((response) => callback(response))
      .catch((error) => errorHandler(error))
  },
  update(application, callback, errorHandler = defaultErrorHandler) {
    apiClient
      .request({
        method: 'patch',
        url: '/applications',
        data: application,
      })
      .then((response) => callback(response))
      .catch((error) => errorHandler(error))
  },
  delete(applicationID, callback, errorHandler = defaultErrorHandler) {
    apiClient
      .request({
        method: 'delete',
        url: `/applications/user/${applicationID}`,
      })
      .then((response) => callback(response))
      .catch((error) => errorHandler(error))
  },
}

export { userApi, applicationApi }
