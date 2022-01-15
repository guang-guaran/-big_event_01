jQuery(function () {
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
})