const app = getApp()
export function getClosetData() {
  const {
    closetData
  } = require('../model/closet')
  return closetData();
}

export async function getCatagory() {
  let db = wx.cloud.database()
  return new Promise((resolve, reject) => db.collection("metadata").where({
    "code": "catagory",
  }).get({
    success: function (res) {
      console.log(res)
      resolve(res)
    }
  }))
}


export async function getClothes() {
  let db = wx.cloud.database()
  return new Promise((resolve, reject) => db.collection("clothes").where({
  }).get({
    success: res => {
      resolve(res)
    }
  }))
}