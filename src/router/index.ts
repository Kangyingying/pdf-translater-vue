import { createRouter, createWebHistory } from 'vue-router'
import PDFIndex from '@/views/pdf/PDFIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pdf',
      name: 'pdf-viewer',
      component: PDFIndex
    },

  ]
})

export default router
