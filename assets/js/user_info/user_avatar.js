jQuery(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 2. 上传图片 渲染到页面
  // 2.1 点击按钮  触发上传文件表单
  $('#fileBtn').on('click', function () {
    $('#fileIpt').click()
  })

  $('#fileIpt').on('change', function () {
    // 2.2 渲染图片
    // 获取事件对象
    let file = this.files[0]
    console.log(file)
    if (file == undefined) {
      console.log(111)
      return layui.layer.msg('上传头像不能为空！')
    }
    // 根据头像生成路径
    let url = URL.createObjectURL(file)
    console.log(url)
    //     销毁旧的裁剪区域   // 重新设置图片路径    // 重新初始化裁剪区域
    $image.cropper('destroy').attr('src', url).cropper(options)
  })

  $('#uploadBtn').on('click', function () {
    // 创建一个 Canvas 画布
    var dataURL = $image.cropper('getCroppedCanvas', {
      width: 100,
      height: 100
    }).toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    console.log(dataURL)

    // ajax请求
    axios({
      url: '/my/update/avatar',
      method: 'POST',
      data: 'avatar=' + encodeURIComponent(dataURL)
    }).then(({
      data: res
    }) => {
      console.log(res)
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }

      layui.layer.msg('恭喜您！头像上传成功')
      window.parent.getUserInfo()
    });
  })

})