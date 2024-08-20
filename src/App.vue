<script setup lang="ts">
import PDFViewer from '@/views/pdf/viewer/PDFViewer.vue'
import PDFTranslator from '@/views/pdf/translater/PDFTranslator.vue'
</script>

<template>
  <div class="app-content">
    <PDFViewer id="viewerContainer"></PDFViewer>
  </div>
  <div class="app-content">
    <PDFTranslator id="translatorContainer"></PDFTranslator>
  </div>

  <!--  <RouterView />-->
</template>

<style scoped>
  .app-content{
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
  }

</style>
