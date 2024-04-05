import { Box, Modal } from '@mui/material';
import React, { useState } from 'react';
import PdfviewComponent from '../../Component/PdfviewComponent.js';
// import FileViewer from 'react-file-viewer';
import { CrossIcon } from '../../assets/icons/index.js';


const compStyle = {
    width: '100%',
    borderRadius: '12px',
    border: 'none',
    outline: 'none',
    boxShadow: '0px 8px 8px -4px #10182808, 0px 20px 24px -4px #10182814',
    p: 3,
    maxWidth: 688,
    height: '90vh',
    display: 'flex',
    rowGap: '20px',
    flexDirection: 'column'
}

function DocumentReader({documentData, handleClose, headerClass}) {
    const [showDocument, setShowDocument] = useState(true);

    function onCloseClick() {
        setShowDocument(false);
        if(handleClose) handleClose();
    }

    return (
        <Modal
            open={showDocument} 
            onClose={onCloseClick}
        >
            <div className="global-modal-container">
                <Box className="bg-white text-black" sx={compStyle}>
                    <div className={'relative padding-r30 text-18 font-500' + (headerClass || '')}>
                        {documentData?.fileName}
                        <CrossIcon sx={{position: 'absolute', right: 0, top: 5, fontSize: 16, cursor: 'pointer'}} onClick={() => onCloseClick()}/>
                    </div>
                    {/* {
                        isPdf ? 
                        <FileViewer documents={[{uri: documentData?.file}]} />
                        :
                        <PdfviewComponent tncDocument={documentData?.file} bottomComponent={() => ''} />
                    } */}
                    {/* <FileViewer 
                        fileType={documentData?.type}
                        filePath={documentData?.file}
                    /> */}
                </Box>
            </div>

        </Modal>
    )
}
export default DocumentReader;