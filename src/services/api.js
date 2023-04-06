import axios from 'axios'

let apiClient = axios.create({
  baseURL: 'https://job-applications-tracker-api.onrender.com',
  headers: {
    // Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJkNTQyMDAwNjQ1ZDg5NTU0OTMyY2UiLCJ1c2VybmFtZSI6InJ1Ynlyb3NlIiwiZGlzcGxheV9uYW1lIjoiUnVieSBSb3NlIiwiYWRtaW4iOmZhbHNlLCJkaXNhYmxlZCI6ZmFsc2UsIl9fdiI6MCwiaWF0IjoxNjgwNzg3MzE1LCJleHAiOjE2ODA4NzM3MTV9.Uoo8ugQGRJ0PI0QZpYLVDTxaVA_m1ypzyWFBqEnn2Nk',
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
        url: `/users/${userid}`
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
        url: `/applications/user/${userid}`
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
        url: `/applications/${applicationID}`
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
        url: `/applications/user/${applicationID}`
      })
      .then((response) => callback(response))
      .catch((error) => errorHandler(error))
  },
}

export { userApi, applicationApi }
