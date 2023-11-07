// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  wx.cloud.uploadFile({
    cloudPath: event.cloudPath, // 上传至云端的路径
    filePath: event.filePath, // 小程序临时文件路径
    success: res => {
      // 返回文件 ID
      console.log(JSON.stringify(res))
      return res.fileID
    },
    fail: console.error
  })
}