import axios from 'axios'

let apiClient = axios.create({
  baseURL: 'https://job-applications-tracker-api.onrender.com',
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
  },
})

function defaultErrorHandler(error) {
  console.log(error)
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
        apiClient = axios.create({
          baseURL: 'http://localhost:3003',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
          },
        })
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
      .then((response) => callback(response))
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
        params: {
          id: userid,
        },
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
        url: '/applications/user/',
        params: {
          userid,
        },
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
        url: '/applications/',
        params: {
          id: applicationID,
        },
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
        url: '/applications/user',
        params: {
          id: applicationID,
        },
      })
      .then((response) => callback(response))
      .catch((error) => errorHandler(error))
  },
}

export { userApi, applicationApi }
