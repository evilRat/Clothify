// pages/closet/index.js
import {getClosetData} from '../../service/closet'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    mainActiveIndex: 0,
    activeId: null,
    detail: {},
    detailChildren: []
  },


  onClickNav({ detail = {} }) {
    console.log("onClickNav:", JSON.stringify(detail))
    let index = detail.index || 0
    this.setData({
      detail: this.data.list[index],
      detailChildren: this.data.list[index].children
    });
    console.log("onClickNav end:", JSON.stringify(this.data.detail))
    console.log("onClickNav end1:", JSON.stringify(this.data.detailChildren))
  },

  onClickItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;

    this.setData({ activeId });
  },

  async init() {
    try {
      const result = await getClosetData();
      this.setData({
        list: result
      })
    } catch (error) {
      console.error("err:", error)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init(true)
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