import React, { useEffect, useState } from 'react';
import { API_SUCCESS_CODE, POST } from '../../../constants';
import { ENDPOINT } from '../../../config/endpoint';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { isAdminUser } from '../../../Services';
import { CrossIcon } from '../../../assets/icons';
import CustomFileUpload from '../../../CommonComponent/CustomFileUpload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PdfIcon from '../../../assets/images/pdfUploadIcon.svg';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDocument, updateSnackbar } from '../../../Redux/slice/CommonSlice';
import { dowanloadPdfUsingBase64, truncateFileName } from '../../../helper/commonHelper';
import ShareModal from '../ShareModal';
import TemplateDownloadComponent from '../../../Component/DocumentDownloadComponent';
import MobileDocumentUpload from '../../../Component/MobileDocumentUpload';

function DocumentCollectionSection({dataModel, documentList, onSuccess}) {
    const useParamValue = useParams();
    const [showInfo, setShowInfo] = useState('');
    const documentUploadFileLimit = 20;
    const [localFileUploading, setLocalFileUploading] = useState(false);
    const [showShareModel, setShowShareModel] = useState(false);
    const [shareData, setShareData] = useState({});
    const [selectedList, setSelectedList] = useState('');
    const dispatch = useDispatch();

    function handleUploadSuccess(data) {
        setShareData({uid: data, key: dataModel?.key});
        setShowShareModel(true);
        if(onSuccess) onSuccess();
    }

    function handleSelectedList(pitchDeckListItem) {
        let value = '';
        if(selectedList !== pitchDeckListItem.uid) value = pitchDeckListItem.uid
        setSelectedList(value);
    }


    function handleShare(listData) {
        setShareData(listData);
        setShowShareModel(true);
        setSelectedList('');
    }

    function handleDownload(selectedFile) {
        let adminData = {};
        setSelectedList('');
        if(isAdminUser()) {
            adminData = {
                primaryUid: useParamValue?.uid, 
                primaryIdType: 'seller',
            }
        }
        let filters = {
            criteriaMap: {
                docType: selectedFile?.docType,
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
                let pitchdeckObj = res?.data?.userDocArray[res?.data?.userDocArray?.length - 1];
                let fileName = pitchdeckObj.fileName;
                dowanloadPdfUsingBase64(pitchdeckObj?.content, fileName);
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

    function handleShareModalClose() {
        setShareData({}); 
        setShowShareModel(false);
    }

    return (
        <div className='padding-16 subsection-container rounded-12'>
            <div className=''>
                <div className='relative flex align-center text-white col-gap-4'>
                    <span>{dataModel?.label || ''}</span>
                    <span className=''>
                        <ErrorOutlineIcon sx={{transform: 'rotate(180deg)', fontSize: '18px', position: 'relative', verticalAlign: 'middle'}} onClick={() => setShowInfo(dataModel?.key)} />
                        {
                            showInfo === dataModel?.key &&
                            <div className='custom-info-box-mobile'>
                                <CrossIcon sx={{position: 'absolute', right: 5, top: 5, fontSize: 16, cursor: 'pointer'}} onClick={() => setShowInfo('')}/>
                                {dataModel?.description}
                            </div>
                        }
                    </span>
                </div>
                <div className='margin-t16'>
                    {
                        !isAdminUser() &&
                        <div className='flex col-gap-10'>
                            <div>
                            {
                                !localFileUploading &&
                                <MobileDocumentUpload 
                                    documentUploadFileLimit={documentUploadFileLimit}
                                    apiUrl={ENDPOINT.DOCUMENT.upload()}
                                    onSuccess={handleUploadSuccess}
                                    docData= {{"userDocArray":[{"docType": dataModel?.key, "category": "company"}]}}
                                    fileType={dataModel?.fileType}
                                    id={dataModel?.key}
                                />
                            }
                            </div>
                            {
                                dataModel?.hasDownloadTemplate &&
                                <div className='inline-block'>
                                    <TemplateDownloadComponent
                                        api={dataModel?.apiUrl}
                                        label='Download'
                                        className='padding-5 text-14'
                                        docType={dataModel?.key}
                                    />
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
            {
                documentList?.length > 0 &&
                <div className='margin-t24 flex row-gap-20 flex-direction-coloum'>
                    {
                        documentList.map((documentListItem, index) => {
                            return (
                                <div className='flex justify-space-between padding-y10 padding-x10 bg-121212 rounded-8' key={`documentListItem${index}`}>
                                    <div className='flex col-gap-8 align-center'>
                                        <img className='w-20px' src={PdfIcon} alt="" />
                                        <span>{truncateFileName(documentListItem?.fileName, 35)}</span>    
                                    </div>
                                    <div className='col-gap-8 relative'>
                                        <MoreVertIcon sx={{color: '#fff', fontSize: '18px'}} onClick={() => handleSelectedList(documentListItem)} />
                                        {
                                            selectedList === documentListItem?.uid &&
                                            <div className='selected-deal-pitchdeck-mobile text-18'>
                                                {
                                                    !isAdminUser() &&
                                                    <div className='cursor-pointer list-item border-b border-353535' onClick={() => handleShare(documentListItem)}>
                                                        Share
                                                    </div>
                                                }
                                                <div className='cursor-pointer list-item' onClick={() => handleDownload(documentListItem, dataModel?.key)}>
                                                    Download
                                                </div>
                                            </div>
                                        }
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

export default DocumentCollectionSection;