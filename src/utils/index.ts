export function formatTimestampToMD(timestamp: number) {
  // 将时间戳转换为 Date 对象
  const date = new Date(timestamp * 1000)

  // 获取月份和日期
  const month = date.getMonth() + 1 // getMonth() 返回的月份是从 0 开始的，所以需要 +1
  const day = date.getDate()

  // 返回格式化的字符串
  return `${month}月${day}日`
}

export function UUID() {
  let d = new Date().getTime()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export function randString(length: number) {
  const str = '0123456789abcdefghijklmnopqrstuvwxyz'
  const size = str.length
  const buf = []
  for (let i = 0; i < length; i++) {
    const rand = Math.random() * size
    buf.push(str.charAt(rand))
  }
  return buf.join('')
}
