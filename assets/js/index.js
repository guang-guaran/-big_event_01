jQuery(function () {
  // let layer = layui.layer
  // 1. 渲染头像
  getUserInfo()

  // 2. 退出操作
  $('.logout').on('click', function () {
    layer.confirm('确认退出登录吗？', {
      icon: 3,
      title: '提示'
    }, function (index) {
      //do something
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index);
    });
  })

})

function getUserInfo() {
  axios({
    url: '/my/userinfo',
    // 此处有省略
  }).then(({
    data: res
  }) => {
    // console.log(res)
    if (res.status !== 0) {
      return layui.layer.msg(res.message)
    }
    renderAvater(res.data)
  });
}

function renderAvater(user) {
  let name = user.nickname || user.username
  // console.log(name[0].toUpperCase())
  $('.welcome').html('欢迎你！ ' + name)

  if (user.user_pic !== null) {
    $('.avatar-text').hide()
    $('.layui-nav-img').show().prop('src', user.user_pic)
  } else {
    $('.layui-nav-img').hide()
    $('.avatar-text').show().html(name[0].toUpperCase())
  }
}