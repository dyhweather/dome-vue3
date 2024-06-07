<template>
  <div class="base-padding base-box">
    <div v-if="header" class="hd">
      <div>
        <slot name="title">
          <span class="title-text">{{ title }}</span>
        </slot>
      </div>
      <div>
        <slot name="headerRight"></slot>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: [String, Boolean],
    default: '标题'
  },
  header: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="less" scoped>
.base-box {
  margin-top: 10px;
  background: var(--vt-white);
  &:nth-of-type(1) {
    margin-top: 0;
  }
  .hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .title-text {
      font-size: 21px;
      line-height: 1.5;
      font-weight: 600;
    }
  }
}
</style>
