// pages/closet/index.js
import {getClosetData, getCatagory} from '../../service/closet'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    mainActiveIndex: 0,
    activeId: null,
    clothes: {},
    category: []
  },


  onClickNav({ detail = {} }) {
    let index = detail.index || 0
    this.setData({
      mainActiveIndex: index,
      clothes: this.data.list[index].clothes,
    });
  },


  async init() {
    try {
      const result = await getClosetData();
      const catagoryRes = await getCatagory();
      let catagory = catagoryRes.data[0].value
      catagory.forEach(e => e.text = e.name)
      console.log("catagory: " + catagory)
      this.setData({
        category: catagory,
        // list: result,
        // clothes: result[this.data.mainActiveIndex].clothes
      })
    } catch (error) {
      console.error("err:", error)
    }
  },

  toNewClothes() {
    wx.navigateTo({
      url: './newClothes/index',
    })
  },

  beforeRead() {

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