import React, { useEffect, useRef, useState } from 'react';
import { CuecardDataroomModel } from './CuecardDataRoomModel';
import PdfIcon from '../../../assets/images/greyPdfIcon.svg';
import { getDate, getFileExtnsion, truncateFileName } from '../../../helper/commonHelper';
import './style.scss';
import { API_SUCCESS_CODE, DiSCOVERY_KEY, EXPRESS_INTEREST_KEY, PASS, SHORTLIST } from '../../../constants';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import { downloadDocument, viewDocument } from '../../../helper/actionHelper';
import { updateSnackbar } from '../../../Redux/slice/CommonSlice';
import { useDispatch } from 'react-redux';
import DocumentReader from '../../../CommonComponent/DocumentReader';
import useOutsideClick from '../../../helper/useDetectClickOutside';
import { isBuyerUser } from '../../../Services';
import { trackEvent } from '../../../helper/posthogHelper';
import { BUYER_LANDED_CONMPANY_DATA_ROOM } from '../../../constants/posthogEvents';

function CuecardDataroom({cuecardData={}, handleAction}) {
    const [selectedList, setSelectedList] = useState({});
    const [documentData, setDocumentData] = useState(null);
    const dispatch = useDispatch();
    const customRef = useRef();

    useEffect(() => {
      trackEvent(BUYER_LANDED_CONMPANY_DATA_ROOM);
    },[])

    useOutsideClick(customRef, () => setSelectedList({}));

    function renderUserDocState() {
        if(!!Object.keys(cuecardData?.docData?.userDocMap || {})?.length) {
            return dataRoomContent()
        }
        else if((!cuecardData.dealStatus || cuecardData.dealStatus === DiSCOVERY_KEY || cuecardData.dealStatus === PASS || cuecardData.dealStatus === SHORTLIST) && isBuyerUser()) {
            return renderExpressInterestContent();
        }
        return renderDefaultMessage()
    }

    function handleSelectedList(selectedItem) {
        let newListValue = selectedItem;
        if(selectedList?.uid === selectedItem?.uid) newListValue = {};
        setSelectedList(newListValue);
    }

    function renderExpressInterestContent() {
        return (
            <div className='text-center margin-b30'>
                <h3 className='margin-b16 text-36 font-600 text-344054'>Data Room Access Unavailable</h3>
                <p className='margin-b16 text-20 text-667085'>To access this company’s data room, Express interest in the company. Once accepted, you'll get access to documents shared by the founder.</p>
                <div className='inline-flex'>
                    <div className='cue-card-actions express-interest-cta' onClick={() => handleAction(EXPRESS_INTEREST_KEY)}>
                        <div className='text-white'>
                            <div className='square-outline'>
                                +
                            </div>
                        </div>
                        <span className='margin-l12'>{'Express Interest'}</span>
                    </div>
                </div>
            </div>
        )
    }

    function renderDefaultMessage() {
        return (
            <div className='text-center'>
                <h3 className='margin-b16 text-36 font-600 text-344054'>Data Room Access Unavailable</h3>
                <p className='margin-b16 text-20 text-667085'>Wait for the seller to accept your interest. Once accepted, you'll get access to documents shared by the them here.</p>
            </div>
        )
    }

    function handleDownloadClick(selectedFile) {
        setSelectedList({});
        let uid = selectedFile?.uid;
        let filters = {
            criteriaMap: {
                primaryUid: cuecardData?.companyId, 
                primaryIdType: 'seller',
                uid: uid || null
            }
        };
        downloadDocument(filters)
    }

    function handleViewDocument(selectedFile) {
        setSelectedList({});
        let uid = selectedFile?.uid;
        let filters = {
            criteriaMap: {
                primaryUid: cuecardData?.companyId, 
                primaryIdType: 'seller',
                uid: uid || null
            }
        };
        viewDocument({filters, cb: handleViewCallback})
    }

    function handleViewCallback(res) {
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data?.userDocArray?.length) {
                let pitchdeckObj = res?.data?.userDocArray[res?.data?.userDocArray?.length - 1];
                let documentObj = {
                    fileName: pitchdeckObj.fileName,
                    file: `data:application/pdf;base64,${pitchdeckObj?.content}`,
                    type: getFileExtnsion(pitchdeckObj.fileName)
                };
                setDocumentData(documentObj);
                // dowanloadPdfUsingBase64(pitchdeckObj?.content, fileName);
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

    function dataRoomContent() {
        return (
            <React.Fragment>
                {
                    Object.keys(CuecardDataroomModel)?.length > 0 &&
                    Object.keys(CuecardDataroomModel).map((keyName, index) => {
                        let modelData = CuecardDataroomModel[keyName];
                        let subsectionMap = {};
                        let hasSubSection = false;
                        {
                            modelData?.subSections && Object.keys(modelData.subSections)?.length > 0 &&
                            Object.keys(modelData.subSections).map((subSectionKeyName) => {
                                let subSectionModelData = modelData.subSections[subSectionKeyName];
                                if(cuecardData?.docData?.userDocMap[subSectionKeyName]?.length) {
                                    hasSubSection = true;
                                    subsectionMap[subSectionKeyName] = {
                                        label: subSectionModelData?.label,
                                        arrayData: cuecardData?.docData?.userDocMap[subSectionKeyName] || []
                                    }
                                }
                            })
                        }
                        if(!hasSubSection) return '';
                        return (
                            <div className='margin-b30 border border-EAECF0 padding-x12 padding-y16 rounded-8' key={keyName + index}>
                                <div className='flex col-gap-10 text-3E4784 text-24 font-600'>
                                    <div className='square-36 bg-3E4784'>
                                        {modelData?.icon }
                                    </div>
                                    <div className=''>{modelData?.label}</div>
                                </div>
                                <div className='margin-t12'>
                                    {
                                        Object.keys(subsectionMap)?.length > 0 &&
                                        Object.keys(subsectionMap).map((subSectionKeyName, j) => {
                                            let subSectionModellist = subsectionMap[subSectionKeyName];
                                            return (
                                                <div className='bg-FCFCFD padding-12 rounded-4' key={subSectionKeyName + j}>
                                                    <div className='text-344054 text-18 font-600'>{subSectionModellist?.label}</div>
                                                    <div className='data-room-list-container'>
                                                        {
                                                            subSectionModellist?.arrayData.map((subsectionItem, k) => {
                                                                return (
                                                                    <div className='data-room-list-view' key={subsectionItem?.uid + k}>
                                                                        <div className='flex col-gap-8 align-center'>
                                                                            <img className='image-container' src={PdfIcon} alt="" />
                                                                            <div>
                                                                                <div className='text-101828'>{truncateFileName(subsectionItem?.fileName, 30)}</div>
                                                                                <div className='text-10 text-768DA3 flex col-gap-4'>{subsectionItem?.size && <span>{`${subsectionItem?.size || ''}MB`}</span>}<span>{getDate(subsectionItem?.createdAt)}</span></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='relative'>
                                                                            <IconButton aria-label="more"  size="small" onClick={() => handleSelectedList(subsectionItem)}>
                                                                                <MoreVertIcon sx={{color: '#1D2939', fontSize: '24px', cursor: 'pointer'}} />
                                                                            </IconButton>
                                                                            {
                                                                                selectedList?.uid === subsectionItem?.uid &&
                                                                                <div className='download-popup text-344054' ref={customRef}>
                                                                                    {/* <div className='cursor-pointer download-popup-listitem padding-y10 padding-x16' onClick={()=> handleViewDocument(subsectionItem)}>View</div> */}
                                                                                    <div className='cursor-pointer padding-y10 padding-x16' onClick={() => handleDownloadClick(subsectionItem)}>Download</div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </React.Fragment>
        )
    }

    function handleClose() {
        setDocumentData(null);
    }

    return (
        <div className='w-full'>
            {
                renderUserDocState()
            }
            {
                documentData?.fileName &&
                <DocumentReader documentData={documentData} handleClose={handleClose} />
            }
        </div>
    )
}

export default CuecardDataroom;