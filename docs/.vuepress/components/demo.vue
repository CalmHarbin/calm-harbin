<!--
<template>
    <div>
        <h1>{{ message }}</h1>
        {{ html }}
    </div>
</template>

<!--
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Test extends Vue {
    message: string = 'Test Component'
}
</script>
-->

<script lang="tsx">
// export default {
//     data() {
//         return {
//             message: 'Test Component'
//         }
//     },
//     computed: {
//         html() {
//             return <div>哈哈哈哈</div>
//             // return '哈哈哈哈'
//         }
//     }
// }
export default {
    name: 'my-component',
    data() {
        return {
            message: 'Test Component',
            html: <h1>123123</h1>
        }
    },
    render(h) {
        // return h('div', {}, '哈哈哈啦啦啦')
        return (
            <div>
                <h1>{this.message}</h1>
                {this.html}
            </div>
        )
    }
}
</script>
