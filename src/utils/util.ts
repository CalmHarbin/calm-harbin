import eq from 'lodash/isEqualWith'
import { decimals } from './index'

type objType = {
    [x: string]: any
}

export const isEqualWith = (object: any, other: any) =>
    eq(object, other, (objValue: any, othValue: any) => {
        // 如果是函数默认相等
        if (
            typeof objValue === 'function' &&
            typeof othValue === 'function' &&
            objValue.name === othValue.name
        )
            return true
    })

/**
 * 返回剔除指定属性后的对象
 */
export function otherAttr(data: objType) {
    // eslint-disable-next-line no-shadow
    const otherAttr: objType = { ...data }
    if (otherAttr.formType === 'area' && otherAttr.placeholder === undefined) {
        otherAttr.placeholder = `请选择${otherAttr.label}`
    } else if (otherAttr.placeholder === undefined) {
        otherAttr.placeholder = otherAttr.label
    }
    delete otherAttr.id
    delete otherAttr.label
    delete otherAttr.formType
    delete otherAttr.render

    // 去除掉所有事件, 已on开头的均为事件
    const attr = Object.keys(otherAttr).filter(
        (item) => item.substr(0, 2) === 'on'
    )
    attr.forEach((item) => {
        delete otherAttr[item]
    })
    return otherAttr
}
/**
 * 返回所有事件
 */
export function otherEvent(data: objType) {
    // eslint-disable-next-line no-shadow
    const otherAttr: objType = { ...data }
    // eslint-disable-next-line no-shadow
    const otherEvent: objType = {}
    // 选择所有事件, 已on开头的均为事件, 例如onchange
    const attr = Object.keys(otherAttr).filter(
        (item) => item.substr(0, 2) === 'on'
    )
    attr.forEach((item) => {
        // 去掉on
        otherEvent[item.substr(2)] = otherAttr[item]
    })
    return otherEvent
}

/**
 * 两数字相加
 */
export function decimalAdd(val1: number, val2: number) {
    const len = Math.max(decimals(val1), decimals(val2))
    const multiple = Math.pow(10, len)

    return (val1 * multiple + val2 * multiple) / multiple
}
