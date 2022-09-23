<template>
    <div>
        <p>使页面可以显示小于12px的字体</p>
        <button style="font-size: 20px">20px</button>
        <button style="font-size: 15px">15px</button>
        <button style="font-size: 12px">12px</button>
        <button v-fontSize="10">10px</button>
        <button v-fontSize="8">8px</button>
        <button v-fontSize="5">5px</button>
    </div>
</template>

<script>
export default {
    name: 'FontSize'
}
</script>
