jQuery(function () {
  // 1. 新旧密码校验
  let form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,15}$/,
      '密码长度必须是6-15位的非空字符串'
    ],
    newPwd: function (value) {
      let v1 = $('[name="oldPwd"]').val()
      if (value == v1) {
        return '新密码和旧密码不能相同！'
      }
    },
    rePwd: function (value) {
      let v2 = $('[name="newPwd"]').val()
      if (value !== v2) {
        return '两次密码输入不一致！'
      }
    }

  });

  $('#formPwd').on('submit', function (e) {
    e.preventDefault()
    axios({
      url: '/my/updatepwd',
      method: 'POST',
      data: $(this).serialize()
    }).then(({
      data: res
    }) => {
      console.log(res)
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      layui.layer.msg('恭喜您！密码修改完成')
      $(this)[0].reset()
      setTimeout(() => {
        window.parent.location.href = '/login.html'
      }, 1000);
    });
  })
})