import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ENDPOINT } from '../../config/endpoint';
import { getPdfData } from '../../helper/actionHelper';
import styled from '@emotion/styled';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { API_SUCCESS_CODE } from '../../constants';
import useIntersectionObserver from '../../helper/useIntersectionObserver';
import './style.scss';
import DocumentDownloadIcon from '../../assets/images/documentDownloadIcon.svg';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { isMobileView } from '../../helper/commonHelper';


const DocumentWrapper = styled("div")({
    // maxHeight: "600px",
    // overflowY: "auto",
    position: 'relative'
});

const DocumenDownloadWrapper = styled("a")({
    // maxHeight: "600px",
    // overflowY: "auto",
    position: 'sticky',
    top: '80%',
    left: '92%',
    boxShadow: '0px 4px 4px 0px #00000026',
    borderRadius: '10px',
    padding: '6px 10px',
    background: 'rgba(22, 22, 22, 0.6)',
    cursor: 'pointer',
    display: 'inline-block',
    zIndex: 10,
    marginBottom: '10px',
    marginRight: isMobileView() ? '10px' : 0
});


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

  const observerConfig = {
    // How much of the page needs to be visible to consider page visible
    threshold: 0
  };


  function PageWithObserver({ pageNumber, setPageVisibility, ...otherProps }) {
    const [page, setPage] = useState();
  
    const onIntersectionChange = useCallback(
      ([entry]) => {
        setPageVisibility(pageNumber, entry.isIntersecting);
      },
      [pageNumber, setPageVisibility]
    );
  
    useIntersectionObserver(page, observerConfig, onIntersectionChange);
  
    return <Page canvasRef={setPage} pageNumber={pageNumber} {...otherProps} />;
  }

function PdfviewComponent({showBottomContent, bottomComponent, canDownload, tncDocument, fileName}) {
    const [file, setFile] = useState('');
    const [numPages, setNumPages] = useState();
    const [visiblePages, setVisiblePages] = useState({});
    const [documentLoaded, setDocumentLoaded] = useState(false);
    const [initialWidth, setInitialWidth] = useState(null);
    const pdfWrapper = useRef(null);

    const setPdfSize = () => {
        if(pdfWrapper.current) setInitialWidth(pdfWrapper.current.getBoundingClientRect().width);
    };

    useEffect(() => {
        window.addEventListener('resize', setPdfSize);
        setPdfSize();
        return () => {
        window.removeEventListener('resize', setPdfSize, 3000);
        };
    }, []);

    const setPageVisibility = useCallback((pageNumber, isIntersecting) => {
        setVisiblePages((prevVisiblePages) => ({
        ...prevVisiblePages,
        [pageNumber]: isIntersecting
        }));
    }, []);
    
      function onDocumentLoadSuccess({ numPages}) {
        setNumPages(numPages);
        setDocumentLoaded(true);
      }

    function renderFile() {
        // will add this condition if we fetch data from api
        // if(file) {
        if(true) {
            return (
                <div>
                    <DocumentWrapper className='relative' id= 'pdf-id' ref={pdfWrapper}>
                        {/* <div className='pdf-header-container'>
                            <img className='w-48px' src={SuccessCircularIcon} alt="" />
                            <div className='text-18 lh-28 font-500'>Our terms and conditions</div>
                        </div> */}
                        <div>
                            {
                                documentLoaded && canDownload &&
                                <DocumenDownloadWrapper
                                    className='inline-block cursor-pointer'
                                    href={tncDocument}
                                    download={fileName}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span>
                                        <img src={DocumentDownloadIcon} alt="" />
                                    </span>
                                </DocumenDownloadWrapper>
                            }
                            <Document file={tncDocument} onLoadSuccess={onDocumentLoadSuccess} >
                                {/* <Page pageNumber={this.state.pageNumber} /> */}
                                {Array.from(new Array(numPages), (el, index) => (
                                    <PageWithObserver
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        setPageVisibility={setPageVisibility}
                                        width={initialWidth}
                                />
                                ))}
                            </Document>
                        </div>
                        {
                            documentLoaded &&
                            bottomComponent()
                        }
                    </DocumentWrapper>
                </div>
            )
        }
        return '';
    }
    return (
        <div className='relative'>
            {
                renderFile()
            }
        </div>
    )
}

export default PdfviewComponent;