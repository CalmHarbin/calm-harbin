<template>
    <div id="app">
        <Order></Order>

        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />

        <file-input
            :divStyle="{
                display: 'inline',
                marginRight: '10px'
            }"
            accept=".xls,.xlsx"
        >
            <button>选择文件</button>
        </file-input>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import Order from './components/order.vue'

@Component({
    components: {
        HelloWorld,
        Order
    }
})
export default class App extends Vue {
    $hello: any
    created(): void {
        // this.$hello()
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
