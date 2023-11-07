export function uploadFile(cloudPath, filePath, needTmpUrl) {
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      cloudPath: cloudPath, // 上传至云端的路径
      filePath: filePath, // 小程序临时文件路径
      success: res => {
        resolve(res)
      },
      fail: err => reject(err)
    })
  })
}

export function downloadFile(fileId) {
  wx.cloud.downloadFile({
    fileID: fileId, // 文件 ID
    success: res => {
      // 返回临时文件路径
      console.log(res.tempFilePath)
    },
    fail: console.error
  })  
}

export function deleteFile(fileIdList) {
  wx.cloud.deleteFile({
    fileList: fileIdList,
    success: res => {
      // handle success
      console.log(res.fileList)
    },
    fail: console.error
  })
}

export function getTempUrl(fileId) {
    const result = wx.cloud.getTempFileURL({
      fileList: [fileId]
    }) 
    debugger
    return result.fileList[0].tempFileURL
}