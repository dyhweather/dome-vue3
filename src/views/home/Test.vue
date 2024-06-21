<template>
  <div>
    <a-input v-model:value="model"></a-input>
    <Teleport to="body" :disabled="disabled">
      <div style="background-color: blueviolet; height: 30px">teleport test</div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const model = defineModel()
const disabled = ref(true)

onMounted(() => {
  setTimeout(() => {
    disabled.value = false
  }, 5000)
})
</script>

<style lang="less" scoped></style>
