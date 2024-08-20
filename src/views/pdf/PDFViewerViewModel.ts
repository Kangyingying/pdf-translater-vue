// // 导入pdfjs 依赖
// import * as PDF from 'pdfjs-dist'
// import 'pdfjs-dist/web/pdf_viewer.css'
// import {
//   EventBus,
//   PDFFindController,
//   PDFLinkService,
//   PDFScriptingManager,
//   PDFViewer,
//   TextLayerBuilder
// } from 'pdfjs-dist/web/pdf_viewer.mjs'
// import 'pdfjs-dist/build/pdf.worker.mjs' // 此处import 解决控制台报错 No "GlobalWorkerOptions.workerSrc" specified.
// import pdfFile from '../../assets/test.pdf'
//
// import { reactive } from 'vue'
//
//
// export default function (props: any) {
//   let pdfDoc: any, pageDiv: any, container: any, pdfViewer: PDFViewer // 此处不用响应式 解决 vue3  Cannot read from private field问题
//   const pdfState: any = reactive<any>({
//     pdfPages: '',
//     scale: 1.5
//   })
//
//   const initData = () => {
//     loadFile(pdfFile);
//   }
//
//   const loadFile = (url?: string) => {
//     PDF.getDocument(url).promise.then(async (pdf) => {
//       pdfDoc = pdf;
//       container = document.getElementById(props.id) as HTMLElement;
//       for (let i = 1; i<= pdf.numPages; i++) {
//         await renderPDF(i);
//       }
//     })
//
//   }
//
//   const renderPDF = (num: any) => {
//     return new Promise((resolve) => {
//       pdfDoc.getPage(num).then((page: any) => {
//         const viewport = page.getViewport({ scale: pdfState.scale });
//         pageDiv = document.createElement('div');
//         pageDiv.setAttribute('id', 'page-' + num);
//         pageDiv.setAttribute('style', 'position: relative');
//         container.appendChild(pageDiv);
//         const canvas = document.createElement('canvas');
//         pageDiv.appendChild(canvas);
//         const context = canvas.getContext('2d');
//         canvas.height = viewport.height;
//         canvas.width = viewport.width;
//
//         const renderContext = {
//           canvasContext: context,
//           viewport: viewport
//         };
//         page.render(renderContext).promise.then(() => {
//           return page.getTextContent();
//         }).then(async (textContent: any) => {
//           console.log(textContent)
//           // 创建文本图层div
//           const textLayerDiv = document.createElement('div');
//           textLayerDiv.setAttribute('class', 'textLayer');
//           // 将文本图层div添加至每页pdf的div中
//           pageDiv.appendChild(textLayerDiv);
//
//           // 创建新的TextLayerBuilder实例
//           const viewport = page.getViewport({ scale: pdfState.scale }) // 设置pdf文件显示比例
//           // 创建新的TextLayerBuilder实例
//           const textLayer = new TextLayerBuilder({pdfPage: page});
//           textLayer.div = textLayerDiv;
//           await textLayer.render(viewport, textContent)
//           resolve(true)
//         });
//       });
//     })
//   }
//
//   const customLoadFile = (url?: string) => {
//     const SEARCH_FOR = ""; // try "Mozilla";
//
//     // const SANDBOX_BUNDLE_SRC = "../../node_modules/pdfjs-dist/build/pdf.sandbox.js";
//
//     const container: any = document.getElementById('viewerContainer');
//
//     const eventBus = new EventBus();
//
//     // (Optionally) enable hyperlinks within PDF files.
//     const pdfLinkService = new PDFLinkService({eventBus});
//
//     // (Optionally) enable find controller.
//     const pdfFindController = new PDFFindController({eventBus,linkService: pdfLinkService,});
//
//     // (Optionally) enable scripting support.
//     const pdfScriptingManager = new PDFScriptingManager({eventBus}); // ,// sandboxBundleSrc: SANDBOX_BUNDLE_SRC,
//
//     pdfViewer = new PDFViewer({
//       container,
//       eventBus,
//       linkService: pdfLinkService,
//       findController: pdfFindController,
//       scriptingManager: pdfScriptingManager,
//     });
//     pdfLinkService.setViewer(pdfViewer);
//     pdfScriptingManager.setViewer(pdfViewer);
//
//     eventBus.on("pagesinit", function () {
//       // We can use pdfViewer now, e.g. let's change default scale.
//       pdfViewer.currentScaleValue = "page-width";
//
//       // We can try searching for things.
//       if (SEARCH_FOR) {
//         eventBus.dispatch("find", { type: "", query: SEARCH_FOR });
//       }
//     });
//
//     // Loading document.
//     PDF.getDocument(url).promise.then(async (pdfDocument: any) => {
//       pdfDoc = pdfDocument;
//       pdfViewer.setDocument(pdfDoc);
//       pdfLinkService.setDocument(pdfDoc, null);
//       // const result = await pdfViewer._layerProperties
//       console.log(pdfViewer)
//     });
//
//   }
//
//   // const getNewPdfPag= (pdfPage: any): Promise<any>  => {
//   //   return new Promise((resolve) => {
//   //     pdfPage.getTextContent().then((textContent: any) => {
//   //       textContent.items.forEach((item: any) => {
//   //         if (item.str === 'Languages') {
//   //           item.str = '语言';
//   //         }
//   //       });
//   //       resolve(true)
//   //     });
//   //
//   //   })
//   // }
//
//   return {
//     initData,
//     pdfState
//   }
// }
