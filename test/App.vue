<template>
    <div id="app">
        <!-- <Order></Order> -->

        <!-- <BiuPageTest></BiuPageTest> -->

        <BiuTableTest></BiuTableTest>

        <!-- <BiuTableSelectTest
            v-model="biuTableSelectTestValue"
            multiple
        ></BiuTableSelectTest> -->

        <!-- <BiuSelectTest></BiuSelectTest> -->
        <!-- <Sheet></Sheet> -->

        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />

        <!-- <file-upload
            :divStyle="{
                display: 'inline',
                marginRight: '10px'
            }"
            accept=".xls,.xlsx"
        >
            <button>选择文件</button>
        </file-upload> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
// import Order from './components/order.vue'
// import BiuPageTest from './components/BiuPageTest.vue'
// import BiuTableSelectTest from './components/BiuTableSelectTest.vue'
import BiuTableTest from './components/BiuTableTest.vue'
// import BiuSelectTest from './components/BiuSelectTest.vue'
// import Sheet from './components/Sheet.vue'
// import { summary } from '@src/index'

@Component({
    components: {
        HelloWorld,
        // Order,
        // BiuPageTest,
        // BiuTableSelectTest
        BiuTableTest
        // BiuSelectTest,
        // Sheet
    }
})
export default class App extends Vue {
    biuTableSelectTestValue = ''

    // biuTableSelectTestValue: any[] = []

    created(): void {
        // this.$hello()
        // const res = [{ a: 2589.34 }, { a: 1598.36 }, { a: 1569.36 }]
        // console.log(summary(res, { a: 0 }))
        // setTimeout(() => {
        //     this.biuTableSelectTestValue = [
        //         'b88a1cdd2c5a421dab1004d17898b97a',
        //         '3a3e3e24811042859667c6e387e46b47'
        //     ]
        // }, 1000)
    }
}
</script>

<style lang="scss">
#app {
    margin-top: 60px;
    color: #2c3e50;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
