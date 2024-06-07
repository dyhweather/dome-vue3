<template>
  <div class="page" ref="rootRef">
    <div class="title">图片剪裁上传</div>
    <a-upload
      accept=".jpg, .png"
      :custom-request="handleUpload"
      :show-upload-list="false"
      :before-upload="beforeUpload"
    >
      <div>
        <LoadingOutlined v-if="picLoading" />
        <div v-else class="upload-box">
          <img v-if="picUrl" :src="picUrl" />
          <div v-else class="add">
            <svg-icon name="icon-add" />
            <div class="text">上传图片</div>
          </div>
        </div>
      </div>
    </a-upload>
    <image-cropping
      v-model:visible="croppingModal.visible"
      :img="croppingModal.img"
      :fixed-number="[3, 4]"
      :root-ref="rootRef"
      @submit="handleUpload"
    />
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { fetchUploadList } from '@/api/api.js'
import { message } from 'ant-design-vue'
import ImageCropping from '@/components/ImageCropping.vue'

const rootRef = ref(null)
const picLoading = ref(false)
const picUrl = ref('')
const croppingModal = reactive({
  visible: false,
  img: ''
})
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('仅支持JPG、PNG格式!')
  }
  if (isJpgOrPng) {
    croppingModal.img = window.URL.createObjectURL(file)
    croppingModal.visible = true
  }
  return false
}

const handleUpload = (file) => {
  picLoading.value = true
  fetchUploadList(file)
    .then(({ respCode, respMsg, datas }) => {
      if (respCode === 200) {
        message.success('上传成功')
        picUrl.value = datas.fileUrl
      } else {
        message.error(respMsg || '上传失败')
      }
    })
    .finally(() => {
      picLoading.value = false
    })
}
</script>
<style lang="less" scoped>
.page {
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  .title {
    font-size: 22px;
    font-weight: 550;
    line-height: 54px;
  }
}
.upload-box {
  width: 190px;
  height: 253px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #ededed;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  .add {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    svg {
      font-size: 36px;
    }
    .text {
      font-size: 14px;
      color: #5d7092;
      line-height: 20px;
      margin-top: 10px;
    }
  }
}
</style>
