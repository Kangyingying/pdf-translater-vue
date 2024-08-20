import * as PDF from 'pdfjs-dist'
import 'pdfjs-dist/web/pdf_viewer.css'
import {
  EventBus,
  PDFFindController,
  PDFLinkService, PDFPageView,
  PDFScriptingManager,
  PDFViewer
} from 'pdfjs-dist/web/pdf_viewer.mjs'
import 'pdfjs-dist/build/pdf.worker.mjs' // 此处import 解决控制台报错 No "GlobalWorkerOptions.workerSrc" specified.

export default function(props: any) {
  // 此处不用响应式 解决 vue3  Cannot read from private field问题
  let pdfDoc: any
  let pdfViewer: PDFViewer

  /**
   * 加载pdf
   * @param url
   * @param searchText
   */
  const renderPDF = (url?: string, searchText?: string) => {
    const SEARCH_FOR = searchText || ''; // try "Mozilla";

    const container: any = document.getElementById(props.id);

    const eventBus = new EventBus();

    // (Optionally) enable hyperlinks within PDF files.
    const pdfLinkService = new PDFLinkService({eventBus});

    // (Optionally) enable find controller.
    const pdfFindController = new PDFFindController({eventBus,linkService: pdfLinkService,});

    // (Optionally) enable scripting support.
    const pdfScriptingManager = new PDFScriptingManager({eventBus}); // ,// sandboxBundleSrc: SANDBOX_BUNDLE_SRC,

    pdfViewer = new PDFViewer({
      container,
      eventBus,
      linkService: pdfLinkService,
      findController: pdfFindController,
      scriptingManager: pdfScriptingManager,
    });

    pdfLinkService.setViewer(pdfViewer);
    pdfScriptingManager.setViewer(pdfViewer);

    eventBus.on("pagesinit", function () {
      console.log(pdfViewer)

      // We can use pdfViewer now, e.g. let's change default scale.
      pdfViewer.currentScaleValue = "page-width";
      // We can try searching for things.
      if (SEARCH_FOR) {
        // 搜索关键字高亮
        eventBus.dispatch("find", { type: "", query: SEARCH_FOR, highlightAll: true});
      }
    });
    // Loading document.
    PDF.getDocument(url).promise.then(async (pdfDocument) => {
      pdfDoc = pdfDocument;
      pdfViewer.setDocument(pdfDoc);
      pdfLinkService.setDocument(pdfDoc, null);
    });
  }

  const renderPDFPage = async (url?: string) => {

    const PAGE_TO_VIEW = 1;
    const SCALE = 0.7;

    const ENABLE_XFA = true;

    const container = document.querySelector(`#${props.id} .pdfViewer`) as HTMLDivElement;

    const eventBus = new EventBus();

    eventBus.on("pagesinit", function () {
      console.log('pagesinit===============>>')
      // We can use pdfViewer now, e.g. let's change default scale.
      pdfViewer.currentScaleValue = "page-width";

      // // We can try searching for things.
      // if (SEARCH_FOR) {
      //   eventBus.dispatch("find", { type: "", query: SEARCH_FOR });
      // }
    });

    // Loading document.
    pdfDoc = await  PDF.getDocument(url).promise;
    // Document loaded, retrieving the page.
    const pdfPage = await getPDFPage(PAGE_TO_VIEW);

    console.log(await pdfPage.getTextContent())

    // Creating the page view with default parameters.
    const pdfPageView = new PDFPageView({
      container,
      id: PAGE_TO_VIEW,
      scale: SCALE,
      defaultViewport: pdfPage.getViewport({ scale: SCALE }),
      eventBus,
    });
    // Associate the actual page with the view, and draw it.
    pdfPageView.setPdfPage(pdfPage);

    await pdfPageView.draw();
  }

  const getPDFPage = (num: any): Promise<any>  => {
    return new Promise((resolve) => {
       pdfDoc.getPage(num).then((pdfPage: any) => {
         pdfPage.getTextContent().then((textContent: any) => {
           textContent.items.forEach((item: any) => {
             if (item.str === 'Languages') {
               item.str = '语言';
             }
           });
           // pdfPage.textContent = textContent;
           // pdfPage.cleanup()
           resolve(pdfPage)
         });
      })


    })
  }

  /**
   * pdf可视区缩放
   * @param scale
   */
  const changeScale = (scale: any) => {
    pdfViewer.currentScaleValue = scale;
  }

  return {
    renderPDF,
    renderPDFPage,
  }

}
