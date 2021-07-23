<template>
    <div id="app">
        <!-- <Order></Order> -->

        <!-- <BiuPageTest></BiuPageTest> -->

        <BiuTableSelectTest
            v-model="biuTableSelectTestValue"
        ></BiuTableSelectTest>

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
import BiuPageTest from './components/BiuPageTest.vue'
import BiuTableSelectTest from './components/BiuTableSelectTest.vue'

@Component({
    components: {
        HelloWorld,
        Order,
        BiuPageTest,
        BiuTableSelectTest
    }
})
export default class App extends Vue {
    biuTableSelectTestValue = ''

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
