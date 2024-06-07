<!-- eslint-disable vue/no-mutating-props -->
<template>
  <a-form ref="formRef" v-bind="{ ...defaultProps, ...formProps }">
    <template v-for="(item, index) in formItems">
      <a-form-item
        v-if="!item.hide"
        :key="index"
        v-bind="item.itemProps"
        :class="{ help: item.itemProps.help, ...item.itemProps.class }"
      >
        <template #label>
          <slot name="label" :item="item" />
        </template>
        <a-input
          v-if="item.type === 'input'"
          v-model:value="formProps.model[item.itemProps.name]"
          allow-clear
          placeholder="请输入"
          :maxlength="40"
          v-bind="item.selfProps"
          @click="item.clickFun?.(item.itemProps.name)"
        />
        <a-textarea
          v-if="item.type === 'textarea'"
          v-model:value="formProps.model[item.itemProps.name]"
          :rows="4"
          allow-clear
          placeholder="请输入"
          :maxlength="200"
          v-bind="item.selfProps"
          @click="item.clickFun?.(item.itemProps.name)"
        />
        <a-select
          v-else-if="item.type === 'select'"
          v-model:value="formProps.model[item.itemProps.name]"
          :mode="item.mode"
          allow-clear
          show-search
          :filter-option="
            (input, option) => {
              return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          "
          :style="{ minWidth: '200px' }"
          placeholder="请选择"
          :options="item.options"
          v-bind="item.selfProps"
          @change="(v, o) => item.changeFun?.(v, item, o)"
        >
          <!-- <a-select-option v-for="(option, i) in item.options" :key="i" :value="option.value">
            {{ option.label }}</a-select-option
          > -->
        </a-select>
        <a-date-picker
          v-else-if="item.type === 'date-picker'"
          v-model:value="formProps.model[item.itemProps.name]"
          allow-clear
          v-bind="item.selfProps"
          @change="(date, str) => item.changeFun?.(date, str)"
        />
        <a-range-picker
          v-else-if="item.type === 'range-picker'"
          v-model:value="formProps.model[item.itemProps.name]"
          allow-clear
          v-bind="item.selfProps"
          @change="(date, str) => item.changeFun?.(date, str)"
        />
        <a-time-picker
          v-else-if="item.type === 'time-picker'"
          v-model:value="formProps.model[item.itemProps.name]"
          allow-clear
          v-bind="item.selfProps"
          @change="(date, str) => item.changeFun?.(date, str)"
        />
        <a-time-range-picker
          v-else-if="item.type === 'time-range-picker'"
          v-model:value="formProps.model[item.itemProps.name]"
          allow-clear
          v-bind="item.selfProps"
          @change="(date, str) => item.changeFun?.(date, str)"
        />
        <a-radio-group
          v-else-if="item.type === 'radio'"
          v-model:value="formProps.model[item.itemProps.name]"
          v-bind="item.selfProps"
          @change="(v, o) => item.changeFun?.(v, item)"
        >
          <a-radio v-for="(option, i) in item.options" :key="i" :value="option.value">{{
            option.label
          }}</a-radio>
        </a-radio-group>
        <a-input-number
          v-else-if="item.type === 'number'"
          v-model:value="formProps.model[item.itemProps.name]"
          allow-clear
          placeholder="请输入"
          v-bind="item.selfProps"
        />
        <a-input-group v-else-if="item.type === 'input-group'" compact>
          <template v-for="(k, inde) in item.itemGroup" :key="inde">
            <!--一个Form.Item只能收集一个表单项的数据，多个表单项会导致收集错乱,使用a-form-item-rest阻止数据的收集-->
            <a-form-item-rest>
              <a-select
                v-if="k.type === 'select'"
                v-model:value="formProps.model[k.name]"
                :options="k.options"
                :mode="k.mode"
                allow-clear
                show-search
                :filter-option="
                  (input, option) => {
                    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                "
                style="width: 120px"
                placeholder="请选择"
              >
              </a-select>
            </a-form-item-rest>
            <a-input
              v-if="k.type === 'input'"
              v-model:value="formProps.model[k.name]"
              style="width: 50%"
              allow-clear
              placeholder="请输入"
              :maxlength="40"
            />
            <a-range-picker
              v-if="k.type === 'range-picker'"
              v-model:value="formProps.model[k.name]"
              :show-time="{ format: 'HH:mm:ss' }"
              value-format="YYYY-MM-DD HH:mm:ss"
              :placeholder="['开始时间', '结束时间']"
              allow-clear
              @change="(date, str) => k.changeFun?.(date, str)"
            />
          </template>
        </a-input-group>
        <tag-input
          v-else-if="item.type === 'tags'"
          v-model:tags="formProps.model[item.itemProps.name]"
          :name="item.itemProps.name"
          :self-props="item.selfProps"
          :tag-props="{ closable: !formProps.disabled }"
          @click="item.clickFun?.(item.itemProps.name)"
        />
        <!-- 自定义类型 -->
        <slot v-else-if="item.type === 'slot'" :name="item.slotName" :self-props="item.selfProps" />
        <!-- 可根据需要自行添加其他表单类型 -->
        <!-- tips放在最后 -->
        <a-tooltip
          v-if="item.itemProps.tips"
          class="tips"
          :class="{ positionClass: item.type === 'number', rightClass: item.itemProps.tipsRight }"
        >
          <template #title>{{ item.itemProps.tips }}</template>
          <exclamation-circle-outlined />
        </a-tooltip>
      </a-form-item>
    </template>
    <slot name="buttons" />
  </a-form>
</template>

<script setup>
import { ref } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import TagInput from './TagInput.vue'

const defaultProps = {
  layout: 'horizontal',
  model: {},
  labelCol: { span: 6 }
}
const formRef = ref(null)
const inputRef = ref(null)
const { formProps } = defineProps({
  formProps: {
    type: Object,
    default: () => ({})
  },
  formItems: {
    type: Array,
    default: () => [
      // {
      //   itemProps: {
      //     name: 'fieldA',
      //     label: '文本',
      //     rules: [{ required: true, message: '请输入名称' }]
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
      //   pformProps: {
      //
      //   }
      // },
      // {
      //   itemProps: {
      //     name: 'fieldD',
      //     label: '自定义'
      //   },
      //   type: 'slot',
      //   slotName: 'fieldD'
      // }
    ]
  }
})

defineExpose({ formRef, inputRef })
</script>

<style lang="less" scoped>
:deep(.ant-form-item-control-input) {
  padding-right: 20px;
  .tips {
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 99;
    margin-left: 5px;
    transform: translateY(-50%);
  }
  .positionClass {
    position: relative;
    top: 5px;
  }
  .rightClass {
    position: absolute;
    top: 9px;
    right: -22px;
  }
}
// 有help，特殊处理下边距
.help {
  margin-bottom: 0;
  :deep(.ant-form-margin-offset) {
    margin-bottom: 0 !important;
  }
}
</style>
