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

<script lang="jsx">
export default {
    data() {
        return {
            message: 'Test Component'
        }
    },
    computed: {
        html() {
            return <div>哈哈哈哈</div>
            // return '哈哈哈哈'
        }
    }
}
</script>
