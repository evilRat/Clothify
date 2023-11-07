// pages/closet/newClothes/index.js

import { uploadFile, getTempUrl } from '../../../service/file-util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    nameErrMsg: null,
    rateValue: 0,
    fileList: [],
    fileIDList: []
  },

  checkName(event) {
    if (!event.detail.value) {
      this.setData({
        nameErrMsg: "请输入名称"
      })
    } else {
      this.setData({
        nameErrMsg: ""
      })
    }
  },

  onSeasonChange(event) {
    this.setData({
      seasonList: event.detail,
    });
  },

  onRateChange(event) {
    this.setData({
      rateValue: event.detail,
    });
  },

  afterRead(event) {
    const { file } = event.detail
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    uploadFile("cloudPath", file.url).then(res => {
      debugger
      this.data.fileIDList.push(res.fileID)
      // 获取临时url
      let tmpUrl = getTempUrl(res.fileID)
      this.data.fileList.push({
        ...file,
        url: tmpUrl,
        type: 'image'
      })
      this.setData({ fileList })
      debugger
      console.log("文件上传成功，res:" + JSON.stringify(res))
    }).catch(err => {
      debugger
      console.log("文件上传失败，err:" + JSON.stringify(err))
    })
  },

  submit(event) {
      // 保存clothes
      let db = wx.cloud.database()
      db.collection("clothes").add({
        data: {
          openid: app.globalData.userInfo.openid,
          fileID: fileId,
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})