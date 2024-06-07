<!-- 该组件可以对模态框的样式统一修改，根据UI规范可自行修改 -->
<template>
  <a-modal
    v-if="modalType === 'modal'"
    v-model:open="modalOpen"
    v-bind="{ ...defaultProps, ...modalProps }"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <slot name="body" />
    <template v-if="customFooter" #footer>
      <slot name="footer" />
    </template>
  </a-modal>
  <a-drawer
    v-else
    :open="modalOpen"
    class="custom-class"
    placement="right"
    v-bind="{ ...defaultDrawerProps, ...modalProps }"
  >
    <template #footer>
      <template v-if="customFooter">
        <slot name="footer" />
      </template>
      <template v-else>
        <a-button
          :loading="modalProps?.confirmLoading"
          style="margin-right: 8px"
          type="primary"
          @click="handleOk"
          >确定</a-button
        >
        <a-button @click="handleCancelDrawer">取消</a-button>
      </template>
    </template>
    <slot name="body" />
  </a-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'

const defaultProps = {
  centered: true,
  destroyOnClose: true,
  maskClosable: false,
  closable: false,
  wrapClassName: 'custom-wrap'
}
const defaultDrawerProps = {
  destroyOnClose: true,
  maskClosable: false,
  closable: false,
  width: 500,
  rootClassName: 'root-class-name'
}
const props = defineProps({
  modalType: {
    type: String,
    default: 'drawer'
  },
  open: {
    type: Boolean,
    default: false
  },
  customFooter: {
    type: Boolean,
    default: false
  },
  modalProps: {
    type: Object,
    default: () => ({})
  }
})

const modalOpen = ref(props.open)
watch(
  () => props.open,
  (v) => {
    modalOpen.value = v
  }
)

const emit = defineEmits(['onOk', 'onCancel', 'update:open'])
const handleOk = () => {
  emit('onOk')
}
const handleCancel = () => {
  emit('onCancel')
  emit('update:open', modalOpen.value)
}

const handleCancelDrawer = () => {
  modalOpen.value = false
  emit('onCancel')
  emit('update:open', modalOpen.value)
}
</script>

<style lang="less">
.custom-wrap {
  .ant-modal {
    // max-width: 724px;
    // max-height: 434px;
    .ant-modal-body {
      max-height: 60vh;
      overflow: auto;
    }
  }
}
.custom-class {
  .ant-drawer-footer {
    padding: 8px 24px !important;
  }
}

.ant-form-item .ant-form-item-label {
  text-align: start;
}
</style>
