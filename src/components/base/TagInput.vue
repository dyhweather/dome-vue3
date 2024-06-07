<template>
  <div class="tags-input">
    <div :id="name" class="tags-wrap">
      <a-tag
        v-for="tag in tags"
        :key="tag.id"
        :color="primaryColor"
        closable
        v-bind="tagProps"
        @close="handleCloseTag(tag)"
        >{{ tag.name }}</a-tag
      >
    </div>
    <a-input
      :style="{ height: computedHeight }"
      readonly
      v-bind="selfProps"
      :placeholder="tags.length > 0 ? '' : selfProps.placeholder"
      @click="handleAddTag"
    />
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import { primaryColor } from '@/common/primary'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  tags: {
    type: Array,
    default: () => []
  },
  tagProps: {
    type: Object,
    default: () => ({})
  },
  selfProps: {
    type: Object,
    default: () => ({})
  }
})

const computedHeight = ref('auto')

watch(
  () => props.tags.length,
  (v) => {
    if (v === 0) {
      computedHeight.value = 'auto'
      return
    }
    nextTick(() => {
      const dom = document.querySelector('.tags-wrap')
      if (dom) {
        computedHeight.value = `${dom?.clientHeight}px`
      }
    })
  }
)

const emit = defineEmits(['onAddTag', 'onCloseTag', 'update:tags'])
const handleAddTag = () => {
  emit('onAddTag')
}
const handleCloseTag = (tag) => {
  emit(
    'update:tags',
    props.tags.filter((itemTag) => itemTag.id !== tag.id)
  )
}
</script>

<style lang="less" scoped>
.tags-input {
  position: relative;
  .tags-wrap {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    padding: 4px 11px;
    .ant-tag {
      margin: 2px;
    }
  }
  textarea {
    resize: none;
  }
}
</style>
