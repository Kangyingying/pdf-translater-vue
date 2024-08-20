<template>
  <div id="viewerContainer">
    <div id="viewer" class="pdfViewer"></div>
  </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import pdfFile from '@/assets/test.pdf'
// import PDFViewerViewModel from '@/views/pdf/PDFViewerViewModel'
import PDFRender from '@/views/pdf/PDFRender'

// 自定义属性
const props = defineProps<{id: any}>()
// 页面viewmodel
// const {initData } = PDFViewerViewModel(props)

const { renderPDF} = PDFRender(props)


onMounted(() => {
  // initData()
  renderPDF(pdfFile, 'Languages')
})

</script>


<style scoped>
  #viewerContainer {
    overflow: hidden;
    position: absolute;
    width: 100%;
   /* height: 100%;*/
  }


</style>
