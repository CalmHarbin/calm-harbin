export { BiuCard } from './biu-card'

import { PluginFunction } from 'vue'

type calmHarbin<T> = {
    install: PluginFunction<T>
}

export const calmHarbin: calmHarbin<any>

export default calmHarbin
