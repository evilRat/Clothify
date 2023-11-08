// pages/closet/index.js
import {getClosetData, getCatagory, getClothes} from '../../service/closet'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainActiveIndex: 0,
    activeId: null,
    allClothes: [],
    clothes: [],
    category: []
  },


  onClickNav({ detail = {} }) {
    let index = detail.index || 0
    let clothes = this.data.allClothes.filter(e => e.catagory == this.data.category[index].code)
    this.setData({
      mainActiveIndex: index,
      clothes: clothes,
    });
  },


  async init() {
    try {
      const catagoryRes = await getCatagory();
      let catagoryData = catagoryRes.data[0].value
      catagoryData.forEach(e => e.text = e.name)
      console.log("catagory: " + JSON.stringify(catagoryData))
      // 获取服装
      let clothesRes = await getClothes()
      let allClothes = this.data.allClothes = clothesRes.data
      let clothes = allClothes.filter(e => e.catagory == catagoryData[0].code)
      this.setData({
        category: catagoryData,
        clothes: clothes
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