import React, { useEffect, useState } from "react";
import CircularProgressWithLabel from "../../CommonComponent/CircularProgressBarWithLabel";
import { circularProgressClasses } from "@mui/material";
import DocumentUploadIcon from '../../assets/images/documentUploadIcon.svg';
import CustomFileUpload from "../../CommonComponent/CustomFileUpload";
import { useDispatch } from "react-redux";
import { API_SUCCESS_CODE, POST } from "../../constants";
import { updateSnackbar, uploadDocument } from "../../Redux/slice/CommonSlice";
import { trackEvent } from "../../helper/posthogHelper";
import { SELLER_CLICKED_UPLOAD_FILE, SELLER_UPLOAD_FILE_SUCCESS } from "../../constants/posthogEvents";

function DocumentUploadComponent({documentUploadFileLimit=20, apiUrl, docData, onSuccess, method, fileType, id=''}) {
    const [documentError, setDocumentError] = useState(false);
    const [localFileUploading, setLocalFileUploading] = useState('');
    const dispatch = useDispatch();
    const [fileName, setFileName] = useState('');
    const [progressValue, setProgressValue] = useState(0);


    function handleFileUplaod(file) {
        trackEvent(SELLER_CLICKED_UPLOAD_FILE);
        setDocumentError(false);
        if(file.target.files[0]) {
            // if()
            let restrictedSize = documentUploadFileLimit * 1024 *1024;
            if(file.target.files[0].size > restrictedSize) {
                setDocumentError(true);
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
        trackEvent(SELLER_UPLOAD_FILE_SUCCESS);
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
        <div>
            {
                localFileUploading ? 
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
                :
                <React.Fragment>
    
                    <CustomFileUpload 
                        id={"document- " + id} accept={fileType?.key || '.pdf, .ppt, .pptx'}
                        className={"flex "} 
                        handleOnChange={handleFileUplaod}
                        labelClassName={''}
                    >
                        <div className={'' + ('cursor-pointer')} >
                            <div className='flex col-gap-8 align-center'>
                                {
                                    <div className='flex flex-direction-coloum align-center'>
                                        <div className='upload-pitch-deck'>
                                            <img className='w-20px' src={DocumentUploadIcon} alt="" />
                                            <span>Upload Files</span> 
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </CustomFileUpload>
                    <div className='text-7D7C7C margin-t6 text-10'>{fileType?.displayValue || 'PDF or PPT(X)'}, size limit: {documentUploadFileLimit} MB</div>
                </React.Fragment>
            }
            {
                documentError &&
                <div className='text-FF8970 text-10 font-300 margin-t8'>Please upload a {fileType?.displayValue || 'PDF/PPT(X)'} file less than {documentUploadFileLimit} MB in size</div>
            }
        </div>
    )
}

export default DocumentUploadComponent;