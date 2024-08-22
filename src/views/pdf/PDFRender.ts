import * as PDF from 'pdfjs-dist'

import {
  EventBus,
  PDFFindController,
  PDFLinkService,
  PDFPageView,
  PDFScriptingManager,
  PDFViewer
} from 'pdfjs-dist/web/pdf_viewer.mjs'
import 'pdfjs-dist/build/pdf.worker.mjs'
import type { PDFDocumentProxy } from 'pdfjs-dist'

export default function(props?: any) {
  // 此处不用响应式 解决 vue3  Cannot read from private field问题
  let pdfDoc: PDFDocumentProxy,
      pdfViewer: PDFViewer,
      eventBus: EventBus,
      pdfLinkService: PDFLinkService,
      pdfFindController: PDFFindController,
      pdfScriptingManager: PDFScriptingManager
  /**
   * 加载pdf
   * @param url
   * @param SEARCH_FOR
   */
  const renderPDF = (url?: string, SEARCH_FOR?: string) => {
    SEARCH_FOR = SEARCH_FOR || ''; // try "Mozilla";
    // pdf渲染容器
    const container: any = document.getElementById(props.id)
    eventBus = new EventBus();
    // (Optionally) enable hyperlinks within PDF files.
    pdfLinkService = new PDFLinkService({eventBus});
    // (Optionally) enable find controller.
    pdfFindController = new PDFFindController({eventBus,linkService: pdfLinkService,});
    // (Optionally) enable scripting support.
    pdfScriptingManager = new PDFScriptingManager({eventBus}); // ,// sandboxBundleSrc: SANDBOX_BUNDLE_SRC,
    // TODO 初始化缩略图Layer
    pdfViewer = new PDFViewer({
      container,
      eventBus,
      linkService: pdfLinkService,
      findController: pdfFindController,
      scriptingManager: pdfScriptingManager,
      removePageBorders: true, // page获取焦点时不展示边框
    });
    pdfLinkService.setViewer(pdfViewer);
    pdfScriptingManager.setViewer(pdfViewer);
    // 初始化事件监听
    initEventBus(SEARCH_FOR)
    // Loading document.
    PDF.getDocument(url).promise.then(async (pdfDocument) => {
      pdfDoc = pdfDocument;
      pdfViewer.setDocument(pdfDoc);
      pdfLinkService.setDocument(pdfDoc, null);
    });
  }

  // /**
  //  * 加载pdf page(单页加载)
  //  * @param url
  //  */
  // const renderPDFPage = async (url?: string) => {
  //   const PAGE_TO_VIEW = 1;
  //   const SCALE = 0.7;
  //
  //   const ENABLE_XFA = true;
  //
  //   const container = document.querySelector(`#${props.id} .pdfViewer`) as HTMLDivElement;
  //
  //   const eventBus = new EventBus();
  //
  //   eventBus.on("pagesinit", function () {
  //     console.log('pagesinit===============>>')
  //     // We can use pdfViewer now, e.g. let's change default scale.
  //     pdfViewer.currentScaleValue = "page-width";
  //
  //     // // We can try searching for things.
  //     // if (SEARCH_FOR) {
  //     //   eventBus.dispatch("find", { type: "", query: SEARCH_FOR });
  //     // }
  //   });
  //
  //   // Loading document.
  //   pdfDoc = await  PDF.getDocument(url).promise;
  //   // Document loaded, retrieving the page.
  //   const pdfPage = await getPDFPage(PAGE_TO_VIEW);
  //
  //   console.log(await pdfPage.getTextContent())
  //
  //   // Creating the page view with default parameters.
  //   const pdfPageView = new PDFPageView({
  //     container,
  //     id: PAGE_TO_VIEW,
  //     scale: SCALE,
  //     defaultViewport: pdfPage.getViewport({ scale: SCALE }),
  //     eventBus,
  //   });
  //   // Associate the actual page with the view, and draw it.
  //   pdfPageView.setPdfPage(pdfPage);
  //
  //   await pdfPageView.draw();
  // }
  //
  // const getPDFPage = (num: any): Promise<any>  => {
  //   return new Promise((resolve) => {
  //      pdfDoc.getPage(num).then((pdfPage: any) => {
  //        pdfPage.getTextContent().then((textContent: any) => {
  //          textContent.items.forEach((item: any) => {
  //            if (item.str === 'Languages') {
  //              item.str = '语言';
  //            }
  //          });
  //          // pdfPage.textContent = textContent;
  //          // pdfPage.cleanup()
  //          resolve(pdfPage)
  //        });
  //     })
  //
  //
  //   })
  // }

  /**
   * 初始化事件监听
   * @param SEARCH_FOR
   */
  const initEventBus = (SEARCH_FOR?: string) => {
    // 页面加载完成事件监听
    eventBus.on("pagesinit", function () {
      // We can use pdfViewer now, e.g. let's change default scale.
      pdfViewer.currentScaleValue = "page-width";
      // We can try searching for things.
      if (SEARCH_FOR) {
        // 搜索关键字高亮
        eventBus.dispatch("find", { type: "", query: SEARCH_FOR, highlightAll: true});
      }
    });

    // 每页textLayer渲染完成事件监听
    eventBus.on('textlayerrendered', (event: any) => {
      // 为每个span增加id
      setTextSpanId(event);
    })
  }

  /**
   * 为span增加id
   * @param event
   */
  const setTextSpanId = (event: any) => {
    const pdfPageView = event.source as PDFPageView;
    const pageRenderId = pdfPageView.renderingId;
    const textLayerContainer = pdfPageView.textLayer?.div;
    const textNodes: any = textLayerContainer?.children
    for (const textNodesKey in textNodes) {
      const textNode = textNodes[textNodesKey] as HTMLElement;
      if (textNode.localName !== 'span') {
        continue;
      }
      textNode.id = `${pageRenderId}-text-${textNodesKey}`
    }

  }

  /**
   * pdf可视区缩放
   * @param scale
   */
  const changeScale = (scale: any) => {
    pdfViewer.currentScaleValue = scale;
  }

  /**
   * 展示缩略图
   */
  const showThumbnail = () => {

  }

  return {
    renderPDF,
    changeScale,
    showThumbnail
  }

}
