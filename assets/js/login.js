jQuery(function () {
  // 需求1: 登录注册的切换
  $('.loginBox a').on('click', function () {
    // 点击登录页面的a标签
    // 显示注册页面的盒子 登录页面的隐藏
    $('.loginBox').hide()
    $('.regBox').show()
  })
  $('.regBox a').on('click', function () {
    // 点击注册页面的a标签
    // 显示登录页面的盒子 注册页面的隐藏
    $('.loginBox').show()
    $('.regBox').hide()
  })

  // 需求2: 表单验证
  const form = layui.form
  console.log(form)
  form.verify({
    uname: [
      /^[a-zA-Z0-9]{1,10}$/,
      '用户名必须是1-10位字母和数字'
    ],
    pwd: [
      /^\S{6,15}$/,
      '密码长度必须是6-15位的非空字符串'
    ],
    repwd: function (value) {
      let pwd = $('.regBox [name="password"]').val()
      if (value !== pwd) {
        return '两次密码不一致！'
      }
    }
  })


  // 需求3: ajax请求注册功能
  const layer = layui.layer
  $('#regForm').on('submit', function (e) {
    e.preventDefault()
    axios({
      url: '/api/reguser',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {
      console.log(res)
      if (res.status !== 0) {
        // return alert(res.message)
        return layer.msg(res.message)
      }
      // alert('恭喜你！注册成功')
      layer.msg('恭喜你！注册成功')
      $(this)[0].reset()
      $('.regBox a').click()
    });

  })

  // 需求4. ajax请求登录功能
  $('#loginForm').on('submit', function (e) {
    e.preventDefault()
    axios({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {
      console.log(res)
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      localStorage.setItem('token', res.token)
      location.href = 'index.html'
    });
  })
})