<template>
  <a-tooltip>
    <template #title>{{ compTitle }}</template>
    <setting-outlined style="color: var(--theme-color)" @click="handleShowDrawer" />
  </a-tooltip>
  <a-drawer v-model:open="drawerVisible" :title="compTitle" placement="right">
    <div>
      <a-checkbox
        v-model:checked="checkAll"
        :indeterminate="indeterminate"
        @change="onCheckAllChange"
      >
        全选
      </a-checkbox>
      <span style="float: right">已选择 {{ checkedList.length }} 个 </span>
    </div>
    <a-checkbox-group
      v-model:value="checkedList"
      class="checkbox-group"
      @change="handleColumnChange"
    >
      <draggable
        v-model="allColumns"
        :item-key="(item) => item.dataIndex"
        handle=".move"
        animation="300"
        @end="onDragColumnEnd"
      >
        <template #item="{ element }">
          <li class="move">
            <drag-outlined style="font-size: 16px; margin-right: 10px" />
            <a-checkbox :value="element.dataIndex"> {{ element.title }}</a-checkbox>
          </li>
        </template>
      </draggable>
    </a-checkbox-group>
    <template #footer>
      <div class="drawer-footer">
        <a-button @click="drawerVisible = false">取消</a-button>
        <a-button style="margin-left: 10px" type="primary" @click="handleSaveSetting"
          >保存</a-button
        >
      </div>
    </template>
  </a-drawer>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
import { message } from 'ant-design-vue'
import { SettingOutlined, DragOutlined } from '@ant-design/icons-vue'
import draggable from 'vuedraggable'

const props = defineProps({
  allColumnList: {
    // 所有列数组
    type: Array,
    default: () => []
  },
  currentColumns: {
    // 当前列数组
    type: Array,
    default: () => []
  },
  settingName: {
    type: String,
    default: 'column_setting'
  }
})
const emits = defineEmits(['columnChanged', 'columnOrderChanged'])
const compTitle = ref('列设置')
// 抽屉展示相关
const drawerVisible = ref(false)
const handleShowDrawer = () => {
  drawerVisible.value = true
}
// 选择列相关
const allColumns = ref([])
const checkedList = ref([])
watchEffect(() => {
  allColumns.value = props.allColumnList.filter((item) => item.dataIndex !== 'operation')
  checkedList.value = props.currentColumns
    .filter((item) => item.dataIndex !== 'operation')
    .map((item) => item.dataIndex)
})
// 监听列顺序改变
const onDragColumnEnd = () => {
  // console.log('列顺序改变', allColumns.value)
  // 新顺序的所有列
  const newOrderAllColumns = [
    ...allColumns.value,
    props.allColumnList[props.allColumnList.length - 1]
  ]
  emits('columnOrderChanged', newOrderAllColumns)
  // 生成新顺序的选中列
  const newOrderSelectColumns = [
    ...allColumns.value.filter((item) => checkedList.value.includes(item.dataIndex)),
    props.allColumnList[props.allColumnList.length - 1]
  ]
  emits('columnChanged', newOrderSelectColumns)
}
const checkAll = ref(false)
const indeterminate = ref(true) // 不定态
// 全选逻辑
const onCheckAllChange = (e) => {
  if (e.target.checked) {
    checkedList.value = allColumns.value.map((item) => item.dataIndex)
    handleColumnChange(checkedList.value)
  } else {
    checkedList.value = []
    handleColumnChange([])
  }
  indeterminate.value = false
}
watch(
  () => checkedList.value,
  (val) => {
    indeterminate.value = !!val.length && val.length < allColumns.value.length
    checkAll.value = val.length === allColumns.value.length
  }
)
// 处理列改变逻辑
const handleColumnChange = (dataIndexList) => {
  // console.log('新的值', dataIndexList, props.allColumnList)
  const newColumn = [
    ...props.allColumnList.filter((item) => dataIndexList.includes(item.dataIndex)),
    props.allColumnList[props.allColumnList.length - 1]
  ]
  emits('columnChanged', newColumn)
}
// 处理保存设置逻辑
const handleSaveSetting = () => {
  const setting = [...checkedList.value, 'action']
  const newOrderAllColumns = [
    ...allColumns.value,
    props.allColumnList[props.allColumnList.length - 1]
  ]
  localStorage.setItem(props.settingName, JSON.stringify(setting))
  localStorage.setItem(`${props.settingName}Order`, JSON.stringify(newOrderAllColumns))
  message.success('保存成功')
  drawerVisible.value = false
}

defineExpose({
  SettingOutlined,
  DragOutlined,
  compTitle,
  draggable,
  drawerVisible,
  allColumns,
  checkedList,
  checkAll,
  indeterminate,
  handleShowDrawer,
  onCheckAllChange,
  handleSaveSetting,
  handleColumnChange,
  onDragColumnEnd
})
</script>

<style lang="less" scoped>
.checkbox-group {
  display: flex;
  flex-direction: column;
}
.drawer-footer {
  display: flex;
  justify-content: flex-end;
}
.move {
  list-style: none;
  cursor: move;
}
:deep(.ant-checkbox-wrapper + .ant-checkbox-wrapper) {
  margin-left: 0;
}
</style>
