import eq from 'lodash/isEqualWith'

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
        if (item.length > 2) {
            // 去掉on
            const key = item.substr(2)
            // 首字母转小写
            otherEvent[key.replace(key[0], key[0].toLowerCase())] =
                otherAttr[item]
        }
    })
    return otherEvent
}
