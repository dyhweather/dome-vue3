<template>
  <div v-loading="tablePropsShow.loading" class="base-padding table-wrap">
    <div v-if="showTitle" class="table-header">
      <div class="table-header-title">{{ title || '' }}</div>
      <div class="table-header-operate">
        <BaseBtns :btn-items="btnItems" />
        <slot name="fun" />
        <!-- <TableSetting
          :all-column-list="allColumns"
          :current-columns="columns"
          @column-order-changed="handleColumnOrderChanged"
          @column-changed="handleColumnChanged"
        /> -->
      </div>
    </div>
    <a-table
      ref="tableRef"
      v-bind="tablePropsShow"
      :loading="false"
      :columns="columns"
      @change="handleTableChange"
      @resize-column="handleResizeColumn"
      @expand="handleExpand"
    >
      <template #bodyCell="{ text, record, index, column }">
        <!-- 一些字段需要格式化显示内容,的如时间,所以默认tooltip显示内容不符合预期,可以使用closeTootip关掉默认tooltip -->
        <a-tooltip
          v-if="!column.closeTootip"
          :open="!column.closeTootip && activeCell === column.key + index"
          :title="text"
        >
          <div
            class="ellipsis"
            @mouseenter="handleMouseEnter($event, index, column)"
            @mouseleave="handleMouseLeave"
          >
            <slot name="tableTh" :text="text" :column="column" :record="record" :index="index">
              {{ text }}
            </slot>
          </div>
        </a-tooltip>
        <slot v-else name="tableTh" :text="text" :column="column" :record="record" :index="index">
          {{ text }}
        </slot>
      </template>
      <template v-if="isExpandRow" #expandedRowRender="{ column, record, index }">
        <slot name="expandRow" :column="column" :record="record" :index="index" />
      </template>
      <template #summary>
        <slot name="summary" />
      </template>
    </a-table>
    <footer v-if="pageShow.total > 0" class="table-footer">
      <a-pagination
        v-model:current="pageShow.pageNo"
        :show-size-changer="pageShow.showSizeChanger"
        :show-quick-jumper="pageShow.showQuickJumper && pageShow.pageSize > -1"
        :page-size-options="pageShow.sizeOptions"
        :total="pageShow.total"
        :page-size="pageShow.pageSize"
        :show-total="
          (total) => {
            if (pageShow.pageSize > 0) {
              return `共 ${total} 条记录，每页显示${pageShow.pageSize}`
            } else {
              return `共 ${total} 条记录`
            }
          }
        "
        :simple="pageShow.simple"
        @change="handlePageChange"
      >
        <template #buildOptionText="scopeprops">
          <span v-if="scopeprops.value !== '-1'">{{ scopeprops.value }}条/页</span>
          <span v-else>全部</span>
        </template>
      </a-pagination>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { isBeyond } from '@/common/utils/commonUtils'
import BaseBtns from './BaseBtns.vue'
// import TableSetting from './TableSetting.vue'

const defaultProps = {
  pagination: false,
  bordered: false,
  size: 'large',
  columns: [],
  dataSource: [],
  scroll: { x: '' },
  loading: false,
  rowKey: 'id'
}

const props = defineProps({
  showTitle: {
    type: Boolean,
    default: true
  },
  btnItems: {
    type: Array,
    default: () => []
  },
  tableProps: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    default: ''
  },
  isExpandRow: {
    type: Boolean,
    default: false
  },
  isTabHeader: {
    type: Boolean,
    default: true
  },
  page: {
    type: Object,
    default: () => ({})
  },
  // vux的插槽
  vxeSlotArray: {
    type: Array,
    default: () => []
  },
  // 使用Vxe表格需要合并单元格的字段；
  // mergeKeys 数组必须按照表头顺序排列，不需要的字段用 falsy 值填充；
  mergeKeys: {
    type: Array,
    default: () => []
  }
})

const tablePropsShow = computed(() => {
  return { ...defaultProps, ...props.tableProps }
})

const columns = ref([])
const allColumns = ref([])

watch(
  () => props.tableProps.columns?.length,
  () => {
    allColumns.value = props.tableProps.columns || []
    columns.value = props.tableProps.columns?.map((col) => {
      if (!col.width) {
        // col.width = import.meta.env.MODE === 'development' ? 100 : '' // 加了数字拖动会有bug，不加数字有警告
        col.width = 100
      }
      col.resizable = true
      return col
    })
  },
  { immediate: true }
)

function handleResizeColumn(w, col) {
  col.width = w
}

// function handleColumnOrderChanged(newOrderAllColumns) {
//   allColumns.value = newOrderAllColumns
// }

// function handleColumnChanged(newColumn) {
//   columns.value = newColumn
// }

const defaultPage = {
  pageNo: 0,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  simple: false,
  sizeOptions: ['10', '20', '50', '100']
}

const pageShow = computed(() => ({ ...defaultPage, ...props.page }))

const emit = defineEmits(['onTableChange', 'onPageChange', 'onExpand'])
const handleTableChange = (pagination, filters, sorter, { currentDataSource }) => {
  emit('onTableChange', pagination, filters, sorter, { currentDataSource })
}
const handlePageChange = (pageNo, pageSize) => {
  emit('onPageChange', pageNo, pageSize)
}
const handleExpand = (expanded, record) => {
  emit('onExpand', expanded, record)
}

const activeCell = ref()

const handleMouseEnter = (e, index, column) => {
  if (!isBeyond(e)) {
    activeCell.value = column.key + index
  }
}
const handleMouseLeave = () => {
  activeCell.value = undefined
}

const tableRef = ref()
const getTableRef = () => {
  return tableRef.value?.$el
}
defineExpose({ getTableRef })
</script>

<style lang="less" scoped>
.table-wrap {
  width: 100%;
  flex-grow: 1;
  background-color: var(--vt-white);
  margin-top: 10px;

  .vxe-table-wrap {
    height: calc(100% - 32px);
    position: relative;
    .table-wrap-layout {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }
  .vxe-table-wrap-page {
    height: calc(100% - 42px - 51px) !important;
  }
  .table-header {
    display: flex;
    height: 32px;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    .table-header-title {
      font-weight: bold;
    }
  }

  :deep(.ant-table-cell) {
    button {
      padding: 4px;
    }
  }

  .table-footer {
    margin: 16px 0;
    text-align: right;
    .ant-pagination {
      display: inline-block;
      width: 100%;
      :deep(.ant-pagination-total-text) {
        float: left;
      }
      :deep(.ant-pagination-options-size-changer) {
        min-width: 100px;
        text-align: center;
      }
    }
  }
}
</style>
