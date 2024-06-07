<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="search-wrap base-padding">
    <!-- <div v-if="title" class="sw-hd">
      <span class="title">{{ title }}</span>
    </div> -->
    <BaseForm
      ref="searchFormRef"
      :form-props="{
        model: formState,
        layout: 'inline',
        labelCol: { span: '' }
      }"
      :form-items="formItems"
    >
      <template v-if="showBtn" #buttons>
        <template v-if="showSearch">
          <a-button
            v-if="publicBtn || isShowBtn(btnCode.searchCode)"
            class="mr8 btn"
            type="primary"
            @click="handleSearch"
            >搜索</a-button
          >
          <a-button
            v-if="publicBtn || isShowBtn(btnCode.resetCode)"
            class="mr8 btn"
            @click="handleReset"
            >重置</a-button
          >
        </template>
        <!-- 其他自定义按钮 -->
        <slot name="buttons" />
      </template>
    </BaseForm>
    <slot name="custom" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseForm from '@/components/base/BaseForm.vue'
import { btnCode } from '@/common/btn'
import { useGetBtns } from '@/hooks/useGetBtns'

const searchFormRef = ref()
defineProps({
  title: {
    type: String,
    default: undefined
  },
  // 控制是否需要控制按钮权限，一般二级以后的页面不需要控制按钮权限
  publicBtn: {
    type: Boolean,
    default: false
  },
  showBtn: {
    type: Boolean,
    default: true
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  formState: {
    type: Object,
    default: () => ({})
  },
  formItems: {
    type: Array,
    default: () => [
      // {
      //   itemProps: {
      //     name: 'fieldA',
      //     label: '文本'
      //   },
      //   type: 'input',
      //   selfProps: {
      //
      //   }
      // },
      // {
      //   itemProps: {
      //     name: 'fieldB',
      //     label: '选择'
      //   },
      //   type: 'select',
      //   selfProps: {
      //
      //   },
      //   options: [
      //     {
      //       label: 'Zone one',
      //       value: 'shanghai'
      //     },
      //     {
      //       label: 'Zone two',
      //       value: 'beijing'
      //     }
      //   ]
      // },
      // {
      //   itemProps: {
      //     name: 'fieldC',
      //     label: '日期'
      //   },
      //   type: 'date-picker',
      //   selfProps: {
      //
      //   }
      // }
    ]
  }
})

const isShowBtn = useGetBtns()

const emit = defineEmits(['onSearch', 'onReset'])
const handleSearch = () => {
  emit('onSearch')
}
const handleReset = () => {
  searchFormRef.value?.formRef.resetFields()
  emit('onReset')
}
</script>

<style lang="less" scoped>
@mt: 24px;
.search-wrap {
  background-color: var(--vt-white);
  // padding: 32px;
  padding-top: calc(32px - @mt); // 抵消上边距
  // margin-bottom: 15px;
  flex-shrink: 0;
  max-height: 142px;
  overflow: auto;
  .sw-hd {
    padding-top: 20px;
  }
  .title {
    font-size: 20px;
  }
  :deep(.ant-form-item) {
    margin-right: 15px;
    margin-top: @mt;
  }
  :deep(.ant-form-inline) {
    // 自定义按钮对齐
    align-items: baseline;
  }
  .btn {
    margin-top: @mt;
  }
}
</style>
