// pages/closet/newClothes/index.js
import {
  uploadFile,
} from '../../../service/file-util';
import {
  getCatagory
} from "../../../service/closet";

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    nameErrMsg: null,
    rateValue: 0,
    fileList: [],
    fileIDList: [],
    seasonList: [],
    catagoryOptions: [],
    catagory: {},
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
    const {
      file
    } = event.detail
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    uploadFile("cloudPath", file.url).then(res => {
      this.data.fileIDList.push(res.fileID)
      this.data.fileList.push({
        ...file,
      })
      this.setData({
        fileList: this.data.fileList
      })
      console.log("文件上传成功，res:" + JSON.stringify(res))
    }).catch(err => {
      console.log("文件上传失败，err:" + JSON.stringify(err))
    })
  },

  submit(event) {
    // 校验表单
    if (!this.data.name || !this.data.seasonList || !this.data.rateValue || !this.data.fileIDList) {
      wx.showToast({
        title: '请完善服装信息',
        icon: 'none'
      })
      return
    }
    // 保存clothes
    let db = wx.cloud.database()
    db.collection("clothes").add({
      data: {
        openid: app.globalData.userInfo.openid,
        name: this.data.name,
        rateValue: this.data.rateValue,
        fileIDList: this.data.fileIDList,
        seasonList: this.data.seasonList,
        catagory: this.data.catagory.code,
      }
    }).then(res => {
      wx.showToast({
        title: '成功'
      }).then(() => wx.navigateBack())
    }).catch(err => {
      wx.showToast({
        title: '失败',
        icon: "error"
      })
    })
  },

  catagoryChanged(event) {
    this.setData({
      catagory: this.data.catagoryOptions[event.detail.value]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取分类
    getCatagory().then(res => {
      this.setData({
        catagoryOptions: res.data[0].value
      })
    })
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