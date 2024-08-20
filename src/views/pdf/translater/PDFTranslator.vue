<template>
  <div id="translatorContainer">
    <div id="translateViewer" class="pdfViewer"></div>
<!--    <div class="pdfViewer singlePageView"></div>-->
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import PDFRender from '@/views/pdf/PDFRender'
import pdfFile from '@/assets/test.pdf'
const props = defineProps<{id: any}>()

// 页面view model
const {renderPDF } = PDFRender(props)

onMounted(() => {
  renderPDF(pdfFile)
})


</script>

<style scoped>
#translatorContainer {
  overflow: hidden;
  position: absolute;
  width: 100%;
  /*height: 100%;*/
}
</style>
