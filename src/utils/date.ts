import { startandendsType } from 'calm-harbin/types/utils'
/**
 * 生成距离当前时间指定天的时间范围
 * @param dayNum 指定要减去的天数，传负数可变成增加
 *
 * ```
 * 计算方式是 当前时间 - 指定天数
 * 例如: startandends(30) => [new Date('2021/6/24 00:00:00'), new Date('2021/7/24 23:59:59')]
 * ```
 */
export const startandends: startandendsType = (dayNum) => {
    const date = new Date()

    const end = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59
    )
    const start = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0
    )
    start.setTime(start.getTime() - 3600 * 1000 * 24 * dayNum)
    return [start, end]
}
