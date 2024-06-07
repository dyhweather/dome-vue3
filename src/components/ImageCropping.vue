<template>
  <BaseModal
    v-model:open="visibleModal"
    modal-type="modal"
    :modal-props="{
      width: 800,
      title: '图片剪裁',
      getContainer: () => props.rootRef
    }"
    @on-ok="handleCropImage"
    @on-cancel="close"
  >
    <template #body>
      <vue-cropper
        ref="cropperRef"
        :img="props.img"
        auto-crop
        output-type="jpeg, png"
        fixed
        fixed-box
        :fixed-number="fixedNumber"
        original
        center-box
        class="cropper"
      >
      </vue-cropper>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseModal from '@/components/base/BaseModal.vue'
import { VueCropper } from 'vue-cropper'
import 'vue-cropper/dist/index.css'

const props = defineProps({
  rootRef: {
    type: Object,
    default: () => null
  },
  visible: {
    type: Boolean,
    default: false
  },
  img: {
    type: String,
    default: ''
  },
  fixedNumber: {
    type: Array,
    default: () => [1, 1]
  }
})

const cropperRef = ref(null)

const handleCropImage = () => {
  cropperRef.value.getCropBlob((blob) => {
    // 在这里可以上传blob数据到服务器
    const file = new File([blob], 'cropping.jpg', {
      type: blob.type,
      lastModified: Date.now()
    })
    emit('submit', file)
    close()
  })
}

const emit = defineEmits(['update:visible', 'submit'])

const visibleModal = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})

const close = () => {
  visibleModal.value = false
}
</script>

<style lang="less" scoped>
.cropper {
  height: 400px;
}
</style>
