export function formatTimestampToMD(timestamp: number) {
  // 将时间戳转换为 Date 对象
  const date = new Date(timestamp)

  // 获取月份和日期
  const month = date.getMonth() + 1 // getMonth() 返回的月份是从 0 开始的，所以需要 +1
  const day = date.getDate()
  // 返回格式化的字符串
  return `${month}月${day}日`
}
