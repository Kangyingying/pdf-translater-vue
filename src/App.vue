<script setup lang="ts">
import PDFViewer from '@/views/pdf/viewer/PDFViewer.vue'
import PDFTranslater from '@/views/pdf/translater/PDFTranslater.vue'
</script>

<template>
  <div class="app-content">
    <PDFViewer id="viewerContainer"></PDFViewer>
  </div>
  <div class="app-content">
    <PDFTranslater id="translaterContainer"></PDFTranslater>
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
