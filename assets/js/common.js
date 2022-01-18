axios.defaults.baseURL = 'http://www.liulongbin.top:3007'
axios.interceptors.request.use(function (config) {
  if (config.url.indexOf('/my') != -1) {
    config.headers['Authorization'] = localStorage.getItem('token')
  }
  // headers: {
  //   Authorization: localStorage.getItem('token')
  // }
  return config

}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {

  if (response.data.message === '身份认证失败！') {
    location.href = "/login.html"
    localStorage.removeItem('token')
  }

  return response
}, function (error) {
  return Promise.reject(error)
})