import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { documentQuery, fetchDocument, updateSnackbar, uploadDocument } from '../../../Redux/slice/CommonSlice';
import { ENDPOINT } from '../../../config/endpoint';
import { API_SUCCESS_CODE, POST } from '../../../constants';
import { dowanloadPdfUsingBase64, truncateFileName } from '../../../helper/commonHelper';
import DownloadIcon from '../../../assets/images/downloadIcon.svg';
import PdfIcon from '../../../assets/images/pdfUploadIcon.svg';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import './style.scss';
import ShareModal from '../ShareModal';
import { isAdminUser } from '../../../Services';
import { useParams } from 'react-router-dom';
import DocumentUploadComponent from '../../../Component/DocumentUploadComponent';
import TemplateDownloadComponent from '../../../Component/DocumentDownloadComponent';

function DataRoomSection({seletedDataModel}) {
    const documentUploadFileLimit = 20;
    const dispatch = useDispatch();
    const [documentLists, setDocumentLists] = useState([]);
    const [showShareModel, setShowShareModel] = useState(false);
    const [shareData, setShareData] = useState({});
    const useParamValue = useParams();

    // function validateUser() {
    //     let dataToSend = {

    //     }

    //     dispatch(validateUserForupload())
    // }

    useEffect(() => {
        getDocumentDetails();
    }, [seletedDataModel])

    function getDocumentDetails() {
        let adminData = {};
        if(isAdminUser()) {
            adminData = {
                primaryUid: useParamValue?.uid, 
                primaryIdType: 'seller',
            }
        }
        let dataToSend = {
            callback: handleGetDocumentCb,
            postBody: {
                "criteriaMap": {
                    "docType": seletedDataModel?.key,
                    ...adminData
                }
            }
        }
        dispatch(documentQuery(dataToSend))
    }

    function handleUploadSuccess(data) {
        setShareData({uid: data});
        setShowShareModel(true);
        getDocumentDetails();
    }

    function handleGetDocumentCb(res) {
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data?.userDocMap?.[seletedDataModel?.key]?.length) {
                setDocumentLists(res?.data?.userDocMap?.[seletedDataModel?.key]);
            }
            else {
                setDocumentLists([]);
            }
        }
        else {

        }
    }

    function handleDownload(selectedFile) {
        let adminData = {};
        if(isAdminUser()) {
            adminData = {
                primaryUid: useParamValue?.uid, 
                primaryIdType: 'seller',
            }
        }
        let filters = {
            criteriaMap: {
                docType: seletedDataModel?.key,
                uid: selectedFile?.uid,
                ...adminData
            }
        };
        let dataToSend = {
            postBody: filters,
            callback: handleDownloadCb,
            url: ENDPOINT.DOCUMENT.download()
        }
        dispatch(fetchDocument(dataToSend))
    }

    function handleDownloadCb(res) {
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data?.userDocArray?.length) {
                let documentObj = res?.data?.userDocArray[res?.data?.userDocArray?.length - 1];
                let fileName = documentObj.fileName;
                dowanloadPdfUsingBase64(documentObj?.content, fileName);
            }
        }
        else {
            dispatch(updateSnackbar({
                message: res?.data?.message,
                isOpen: true,
                type: 'error'
            }));
        }
    }

    function handleShare(listData) {
        setShareData(listData);
        setShowShareModel(true);
    }

    function handleShareModalClose() {
        setShareData({}); 
        setShowShareModel(false);
    }

    return (
        <div className='pitchdeck-section data-room-section margin-t25'>
            <div className='flex row-gap-24 flex-direction-coloum text-white'>
                <div className='text-24 font-500 text-white'>{seletedDataModel?.title || ''}</div>
                <div className=''>{seletedDataModel?.description || ''}</div>
                {
                    !isAdminUser() &&
                    <div className='flex col-gap-10'>
                        <DocumentUploadComponent 
                            documentUploadFileLimit={documentUploadFileLimit}
                            apiUrl={ENDPOINT.DOCUMENT.upload()}
                            onSuccess={handleUploadSuccess}
                            docData= {{"userDocArray":[{"docType": seletedDataModel?.key, "category": "company"}]}}
                            fileType={seletedDataModel?.fileType}
                            id={seletedDataModel?.key}
                        />
                        {
                            seletedDataModel?.hasDownloadTemplate &&
                            <div className='inline-block'>
                                <TemplateDownloadComponent
                                    api={seletedDataModel?.apiUrl}
                                    label='Download Template'
                                    className='padding-y15 padding-x20'
                                    docType={seletedDataModel?.key}
                                />
                            </div>
                        }
                    </div>
                }
            </div>
            {
                documentLists?.length > 0 &&
                <div className='margin-t24 flex row-gap-20 flex-direction-coloum'>
                    {
                        documentLists.map((documentListItem) => {
                            return (
                                <div className='flex justify-space-between padding-y12 padding-x16 bg-282727 rounded-8' key={documentListItem?.uid}>
                                    <div className='flex col-gap-8 align-center'>
                                        <img className='w-20px' src={PdfIcon} alt="" />
                                        <span>{truncateFileName(documentListItem?.fileName, 75)}</span>    
                                    </div>
                                    <div className='flex align-center col-gap-8'>
                                        {
                                            !isAdminUser() &&
                                            <div className='cursor-pointer' onClick={() => handleShare(documentListItem)}>
                                                <ShareOutlinedIcon sx={{color: '#fff', fontSize: '24px'}} />
                                            </div>
                                        }
                                        <div className='cursor-pointer' onClick={() => handleDownload(documentListItem)}>
                                            <img className='w-20px' src={DownloadIcon} alt="" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
            {
                showShareModel &&
                <ShareModal pitchdeckData = {shareData} handleOnClose={handleShareModalClose} />
            }
        </div>
    )
}

export default DataRoomSection;