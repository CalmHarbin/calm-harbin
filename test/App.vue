<template>
    <div id="app">
        <!-- <Order></Order> -->

        <!-- <BiuPageTest></BiuPageTest> -->

        <BiuTableTest></BiuTableTest>

        <!-- <BiuTableSelectTest
            multiple
            v-model="biuTableSelectTestValue"
        ></BiuTableSelectTest> -->

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
import BiuTableTest from './components/BiuTableTest.vue'
import calmHarbin from '@src/index'

@Component({
    components: {
        HelloWorld,
        Order,
        BiuPageTest,
        BiuTableSelectTest,
        BiuTableTest
    }
})
export default class App extends Vue {
    // biuTableSelectTestValue = []

    biuTableSelectTestValue = [
        '561cd82623e54e9882470b69bb74ce73',
        'd92f6a3c49664b31beb30bec257f6ee2'
    ]

    created(): void {
        // this.$hello()
        const res = [
            { a: 2 },
            { a: 162 },
            { a: 2 },
            { a: 2 },
            { a: 2 },
            { a: 2 },
            { a: 2 },
            { a: 2 },
            { a: 10 },
            { a: 2 },
            { a: 2 },
            { a: 2 },
            { a: 5 },
            { a: 2 },
            { a: 2 },
            { a: 2 },
            { a: 2 },
            { a: 4 },
            { a: 2 },
            { a: 2 }
        ]
        console.log(calmHarbin.summary(res, { a: 0 }))
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
