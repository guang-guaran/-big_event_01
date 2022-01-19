jQuery(function () {
  // 1. 判断昵称
  let form = layui.form
  form.verify({
    // 属性是规则名称，值是具体规则;
    nickname: [
      /^[\S]{1,10}$/,
      '昵称的长度为1-10的非空字符串'
    ]
  });

  // 2. 获取用户信息 渲染到页面
  let layer = layui.layer
  initUserInfo()

  function initUserInfo() {
    axios({
      url: '/my/userinfo',
      method: 'GET',
    }).then(({
      data: res
    }) => {
      console.log(res)
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      form.val('user-form', res.data)
    });
  }

  // 需求3. 重置功能
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })


  // 4. 需求4： 提交修改
  $('form').on('submit', function (e) {
    e.preventDefault()
    axios({
      url: '/my/userinfo',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {
      console.log(res)
      if (res.status != 0) {
        return layer.msg(res.message)
      }
      // 成功提示
      layer.msg('恭喜您！ 用户修改成功')
      window.parent.getUserInfo()
    });
  })

})
/* 

$(function () {

  // 退出登录
  $('.logout').on('click', function () {
    console.log('ok')
    // 提示用户是否确认退出登录
    // 清空 localStorage 中的 token
    // 跳转到登录页面
    layer.confirm('确认退出登录吗？', {
      icon: 3,
      title: '提示'
    }, function (index) {
      //do something
      localStorage.removeItem('token')
      location.href = '/login.html'

      layer.close(index)
    })
  })

  initUserInfo()
})

// 获取用户的基本信息
function initUserInfo() {
  axios.get('/my/userinfo').then(({
    data: res
  }) => {
    if (res.code === 0) {
      renderUserInfo(res.data)
    }
  }, (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      location.href = '/login.html'
    }
  })
}

// 渲染用户的基本信息
function renderUserInfo(data) {
  if (data.user_pic) {
    // 有头像
    // 头部区域
    $('#header-avatar').html(`<img src="${data.user_pic}" class="layui-nav-img">个人中心`)
    // 侧边栏区域
    $('.user-info-box').html(`<img src="${data.user_pic}" class="layui-nav-img">
    <span class="welcome">&nbsp;欢迎&nbsp; ${data.nickname || data.username}</span>`)
  } else {
    // 没有头像，需要渲染文字头像
    const uname = data.nickname || data.username
    const firstChar = uname.charAt(0).toUpperCase()
    // 头部区域
    $('#header-avatar').html(`
      <div class="text-avatar">${firstChar}</div>
      个人中心`)
    // 侧边栏区域
    $('.user-info-box').html(`
      <div class="text-avatar">${firstChar}</div>
      <span class="welcome">&nbsp;欢迎&nbsp; ${data.nickname || data.username}</span>`)
  }
  layui.element.render('nav')
}

function highlight(kw) {
  $('dd').removeClass('layui-this')
  $(`dd:contains('${kw}')`).addClass('layui-this')
} */