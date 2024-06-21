<template>
  <h2>
    <span>aaa</span>
  </h2>
  <div>
    首页
    <div>
      <a-input v-focus="test" v-model:value="value" placeholder="请输入" />

      <a-button @click="handleTest" v-throttle="30000">点击测试</a-button>
      <test v-model="testValue" />
      <div v-for="item in items">
        <p>{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Test from './Test.vue'

const value = ref('')
const test = 'test value'
const testValue = ref('hello')
const items = ref([1, 2, 3, 4])

// 自定义指令
const vFocus = {
  // 获取焦点
  mounted: (el, binding) => {
    el.focus()
    value.value = binding.value
  }
}

const vThrottle = {
  // 防止点击事件重复执行
  mounted: (el, binding) => {
    let throttleTime = binding.vlaue || 5000
    let cbFun
    el.addEventListener(
      'click',
      (event) => {
        if (!cbFun) {
          cbFun = setTimeout(() => {
            cbFun = null
          }, throttleTime)
        } else {
          event.stopImmediatePropagation()
          // stopImmediatePropagation 作用在当前节点以及事件链上的所有后续节点上，目的是在执行完当前事件处理程序之后，停止当前节点以及所有后续节点的事件处理程序的运行
          // stopPropagation 作用在后续节点上，目的在执行完绑定到当前元素上的所有事件处理程序之后，停止执行所有后续节点的事件处理程序
        }
      },
      true
    )
  }
}

const handleTest = () => {
  console.log(4444)
  testValue.value = 'world'
  items.value.reverse()
}
</script>

<style lang="less" scoped>
#teleport {
  height: 60px;
  background: lightpink;
}
</style>
