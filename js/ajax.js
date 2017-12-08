// 封装请求
function sdkAjax(type, urlData, cb, errcb) {
    var params = {
        url: typeof urlData === 'object' ? urlData.url : urlData,
        type: type,
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Access-Token', window.localStorage.getItem('accessToken'))
        }, //这里设置header
        success: function(data) {
            cb(data)
        },
        error: function(err) {
            // token失效的处理
            if (err.responseText) {
                var errorObj = typeof err.responseText === 'string' ? JSON.parse(err.responseText) : err.responseText
                if (errorObj.error && errorObj.error.code === 4031021) {
                    window.location.href = 'login.html'
                }
            }
            if (errcb == undefined) return
            errcb(err)
        }
    }
    if (type === 'post' || type === 'POST') {
        params.data = urlData.data
    }

    $.ajax(params)
}

var platformUrl = 'https://api2.xlink.cn/v2/'

// 登录接口
function login (params, cb, errcb) {
    var urlData = {
        url: platformUrl + 'user_auth',
        data: params
    }
    sdkAjax('post', urlData, cb, errcb)
}

// 订阅信息接口
function qrcode_subscribe (urerId, params, cb, errcb) {
    var urlData = {
        url: platformUrl + 'user/'+ urerId+ '/qrcode_subscribe',
        data: params
    }
    sdkAjax('post', urlData, cb, errcb)
}

// 设备列表接口
function fetchDeviceList(urerId, cb, errcb){
    sdkAjax('get', platformUrl + 'user/'+ urerId+ '/subscribe/devices', cb, errcb)
}

// 获取虚拟设备的端口
function getVdevice (productId, deviceId, cb, errcb) {
    sdkAjax('get', platformUrl + 'product/' + productId + '/v_device/' + deviceId, cb,errcb)
}


// 邮箱注册
 function email_register (params, cb, errcb) {
  var urlData = {
        url: platformUrl + 'user_register',
        data: params
    }
    sdkAjax('post', urlData, cb, errcb)
  }
