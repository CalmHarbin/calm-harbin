type objType = {
    [x: string]: any
}
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
