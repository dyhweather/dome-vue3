<!-- 带操头部作按钮和底部分页的内容组件 -->
<template>
  <div v-loading="loading" class="base-padding table-wrap">
    <div v-if="showTitle" class="table-header">
      <div class="table-header-title">{{ title || '' }}</div>
      <div class="table-header-operate">
        <BaseBtns :btn-items="btnItems" />
        <slot name="fun" />
      </div>
    </div>
    <slot />
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
import { computed } from 'vue'
import BaseBtns from './BaseBtns.vue'
// import TableSetting from './TableSetting.vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  btnItems: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  },
  page: {
    type: Object,
    default: () => ({})
  }
})

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

const emit = defineEmits(['onPageChange'])
const handlePageChange = (pageNo, pageSize) => {
  emit('onPageChange', pageNo, pageSize)
}
</script>

<style lang="less" scoped>
.table-wrap {
  width: 100%;
  flex-grow: 1;
  background-color: var(--vt-white);
  margin-top: 10px;
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
