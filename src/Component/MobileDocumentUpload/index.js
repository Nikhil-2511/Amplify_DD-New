import React, { useState } from 'react';
import CustomFileUpload from '../../CommonComponent/CustomFileUpload';
import { useDispatch } from 'react-redux';
import { updateSnackbar, uploadDocument } from '../../Redux/slice/CommonSlice';
import { API_SUCCESS_CODE, POST } from '../../constants';
import DocumentUploadIcon from '../../assets/images/documentUploadIcon.svg';
import { Box, Modal, circularProgressClasses } from '@mui/material';
import CircularProgressWithLabel from '../../CommonComponent/CircularProgressBarWithLabel';


const style = {
    maxWidth: 500,
    width: '100%',
    bgcolor: '#353535',
    borderRadius: '10px',
    // border: '1px solid #353535',
    outline: 'none',
    color: '#fff',
    boxShadow: '0px 8px 8px -4px #10182808, 0px 20px 24px -4px #10182814',
    p: 4,
}; 

function MobileDocumentUpload({documentUploadFileLimit=20, apiUrl, docData, onSuccess, method, fileType, id=''}) {
    const [localFileUploading, setLocalFileUploading] = useState('');
    const dispatch = useDispatch();
    const [fileName, setFileName] = useState('');
    const [progressValue, setProgressValue] = useState(0);


    function handleFileUplaod(file) {
        if(file.target.files[0]) {
            // if()
            let restrictedSize = documentUploadFileLimit * 1024 *1024;
            if(file.target.files[0].size > restrictedSize) {
                dispatch(updateSnackbar({
                    message: `Please upload a PDF/PPT(X) file less than ${documentUploadFileLimit} MB in size`,
                    isOpen: true,
                    type: 'error'
                }));
                return 
            }
            setLocalFileUploading(true);
            setFileName(file.target.files[0].name);
            let uploadedFile = file.target.files[0];
            
            let dataToSend = {
                "file": uploadedFile,
                "docData": {...docData},
                url: apiUrl,
                method: method || POST,
                callback: handleUploadFileCb,
                onUploadProgress: handleUploadProgress,
                hideLoader: true
            }
            dispatch(uploadDocument(dataToSend));
        }
    }

    function handleUploadProgress(data) {
        setProgressValue(Math.round((100 * data.loaded) / data.total));
    }

    function handleUploadFileCb(res) {
        setLocalFileUploading(false);
        if(res?.status === API_SUCCESS_CODE) {
            if(onSuccess) onSuccess(res?.data);
        }

        else {
            dispatch(updateSnackbar({
                message: res?.data?.message,
                isOpen: true,
                type: 'error'
            }));
        }
    }

    return (
        <React.Fragment>
            <CustomFileUpload 
                id={`data-room-${id}`} accept={fileType?.key || '.pdf, .ppt, .pptx'}
                className={"flex "} 
                handleOnChange={(file) => handleFileUplaod(file)}
                labelClassName={''}
            >
                <div className={'' + ('cursor-pointer')} >
                    <div className='flex col-gap-8 align-center'>
                        {
                            <div className='flex flex-direction-coloum align-center'>
                                <div className='upload-pitch-deck-mobile'>
                                    <img className='w-15px' src={DocumentUploadIcon} alt="" />
                                    <span className='text-16'>Upload</span> 
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </CustomFileUpload>
            <div className='text-7D7C7C margin-t6 text-10'>{fileType?.displayValue || 'PDF/PPT(X)'},{`<`}{documentUploadFileLimit}MB</div>
            {
                localFileUploading &&
                <Modal
                    open={localFileUploading}
                >
                    <div className='global-modal-container'>
                        <Box className='' sx={style}>
                            <div className='flex col-gap-20'>
                                <CircularProgressWithLabel 
                                    value={progressValue} 
                                    label={`${Math.round(progressValue)}%`}
                                    thickness={5} 
                                    size= {60}
                                    sx={{color: '#3247FF', 
                                        [`& .${circularProgressClasses.circle}`]: {
                                            strokeLinecap: 'round',
                                        },
                                    }} 
                                />
                                <div className='text-white'>
                                    <div className='font-600'>{fileName}</div>
                                    <div className='text-16 font-300 margin-t5'>Uploading</div>
                                </div>
                            </div>
                        </Box>
                    </div>
                </Modal>
            }
        </React.Fragment>
    )
}

export default MobileDocumentUpload;