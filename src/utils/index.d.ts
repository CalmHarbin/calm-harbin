export function debounce(
    fn: (...params: any) => any | void,
    wait: number,
    throttle?: boolean
): (...params: any) => void
