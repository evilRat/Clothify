App({
  globalData: {

  },
  async onLaunch() {
    await this.initcloud()
    this.createUser()
  },

  flag: false,
  createUser() {
    wx.cloud.callFunction({
      name: 'getUserInfo',
      success: res => {
        let result = res.result
        this.globalData.userInfo = {
          openid: result.openid,
          unionid: result.unionid,
          appid: result.appid
        }
        wx.setStorageSync('userInfo', this.globalData.userInfo)
        this.saveOrUpdateUser(result)
      }
    })
  },
  /**
   * 保存或更新用户信息
   */
  saveOrUpdateUser(userInfo) {
    let db = wx.cloud.database()
    db.collection("user").where({
      _openid: userInfo.openid
    }).get({
      success: function(res) {
        if(!res.data) {
          console.log("用户不存在，新增用户，openid: " + userInfo.openid)
          db.collection("user").add({
            data: {
              openid: userInfo.openid,
              unionid: userInfo.unionid,
              appid: userInfo.appid
            }
          })
        } else {
          console.log("用户存在，略过，openid: " + userInfo.openid)
        }
      }
    })
  },
  /**
   * 初始化云开发环境（支持环境共享和正常两种模式）
   */
  async initcloud() {
    const shareinfo = wx.getExtConfigSync() // 检查 ext 配置文件
    const normalinfo = require('./envList.js').envList || [] // 读取 envlist 文件
    if (shareinfo.envid != null) { // 如果 ext 配置文件存在，环境共享模式
      this.c1 = new wx.cloud.Cloud({ // 声明 cloud 实例
        resourceAppid: shareinfo.appid,
        resourceEnv: shareinfo.envid,
      })
      // 装载云函数操作对象返回方法
      this.cloud = async function () {
        if (this.flag != true) { // 如果第一次使用返回方法，还没初始化
          await this.c1.init() // 初始化一下
          this.flag = true // 设置为已经初始化
        }
        return this.c1 // 返回 cloud 对象
      }
    } else { // 如果 ext 配置文件存在，正常云开发模式
      if (normalinfo.length != 0 && normalinfo[0].envId != null) { // 如果文件中 envlist 存在
        wx.cloud.init({ // 初始化云开发环境
          traceUser: true,
          env: normalinfo[0].envId
        })
        // 装载云函数操作对象返回方法
        this.cloud = () => {
          return wx.cloud // 直接返回 wx.cloud
        }
      } else { // 如果文件中 envlist 不存在，提示要配置环境
        this.cloud = () => {
          wx.showModal({
            content: '当前小程序没有配置云开发环境，请在 envList.js 中配置你的云开发环境',
            showCancel: false
          })
          throw new Error('当前小程序没有配置云开发环境，请在 envList.js 中配置你的云开发环境')
        }
      }
    }
  },

  // 获取云数据库实例
  async database() {
    return (await this.cloud()).database()
  },

  // 上传文件操作封装
  async uploadFile(cloudPath, filePath) {
    return (await this.cloud()).uploadFile({
      cloudPath,
      filePath
    })
  },

  // 下载文件操作封装
  async downloadFile(fileID) {
    return (await this.cloud()).downloadFile({
      fileID
    })
  },

  // 获取用户唯一标识，兼容不同环境模式
  async getOpenId() {
    const {
      result: {
        openid,
        fromopenid
      }
    } = await (await this.cloud()).callFunction({
      name: 'getOpenId'
    }).catch(e => {
      let flag = e.toString()
      flag = flag.indexOf('FunctionName') == -1 ? flag : '请在cloudfunctions文件夹中getOpenId上右键，创建部署云端安装依赖，然后再次体验'
      wx.hideLoading()
      wx.showModal({
        content: flag, // 此提示可以在正式时改为 "网络服务异常，请确认网络重新尝试！"
        showCancel: false
      })
      throw new Error(flag)
    })
    if (openid !== "") return openid
    return fromopenid
  }
})