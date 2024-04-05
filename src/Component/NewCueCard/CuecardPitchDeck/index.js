import React, { useState } from 'react';
import SideInformationWrapper from '../../../HOC/SideInofrmationWrapper';
import FolderIcon from '../../../assets/images/folderIcon.svg';
import GreyPdfIcon from '../../../assets/images/greyPdfIcon.svg'
import { ENDPOINT } from '../../../config/endpoint';
import { useDispatch } from 'react-redux';
import { fetchDocument, updateSnackbar } from '../../../Redux/slice/CommonSlice';
import { dowanloadPdfUsingBase64, getFileExtnsion, isMobileView, truncateFileName } from '../../../helper/commonHelper';
import { API_SUCCESS_CODE } from '../../../constants';
import { CAPTABLE_KEY, MIS_KEY } from '../../../constants/keyVariableConstants';
import DocumentReader from '../../../CommonComponent/DocumentReader';
import { downloadDocument } from '../../../helper/actionHelper';


function CuecardPitchDeck({cuecardData, handleDataroomView}) {
    const dispatch = useDispatch();
    const isMobile = isMobileView();
    const [documentData, setDocumentData] = useState(null);

    function handleDownload(selectedFile) {
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

    function handleClose() {
        setDocumentData(null);
    }

    return (
        <div className='flex flex-direction-coloum row-gap-16 margin-t20'>
            {
                cuecardData?.docData?.userDocMap?.pitch_deck?.length > 0 &&
                <div>
                    <div className='text-14 font-500 text-black'>Pitch Deck</div>
                    <div className='flex flex-direction-coloum row-gap-8 margin-t16'>
                        {
                            cuecardData?.docData?.userDocMap?.pitch_deck.map((pitchdeckListItem, index) => {
                                return (
                                    <div className='flex col-gap-8 align-center cursor-pointer' onClick={() => handleDownload(pitchdeckListItem)} key={"pitchdeckListItem" + index}>
                                        <img className='w-20px' src={GreyPdfIcon} alt="" />
                                        {/* <span className='text-2E90FA'>{pitchdeckListItem?.fileName}</span>     */}
                                        <span className='text-2E90FA'>{truncateFileName(pitchdeckListItem?.fileName,40)}</span>    
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
            {
                cuecardData?.docData?.userDocMap?.[MIS_KEY]?.length > 0 &&
                <div>
                    <div className='text-14 font-500 text-black margin-y16'>MIS</div>
                    <div className='flex flex-direction-coloum row-gap-8'>
                        {
                            cuecardData?.docData?.userDocMap?.[MIS_KEY].map((pitchdeckListItem, index) => {
                                return (
                                    <div className='flex col-gap-8 align-center cursor-pointer' onClick={() => handleDownload(pitchdeckListItem)} key={"pitchdeckListItem" + index}>
                                        <img className='w-20px' src={GreyPdfIcon} alt="" />
                                        {/* <span className='text-2E90FA'>{pitchdeckListItem?.fileName}</span>     */}
                                        <span className='text-2E90FA'>{truncateFileName(pitchdeckListItem?.fileName,40)}</span>    
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
            {
                cuecardData?.docData?.userDocMap?.[CAPTABLE_KEY]?.length > 0 &&
                <div>
                    <div className='text-14 font-500 text-black margin-y16'>Cap Table & Board Profile</div>
                    <div className='flex flex-direction-coloum row-gap-8'>
                        {
                            cuecardData?.docData?.userDocMap?.[CAPTABLE_KEY].map((pitchdeckListItem, index) => {
                                return (
                                    <div className='flex col-gap-8 align-center cursor-pointer' onClick={() => handleDownload(pitchdeckListItem)} key={"pitchdeckListItem" + index}>
                                        <img className='w-20px' src={GreyPdfIcon} alt="" />
                                        {/* <span className='text-2E90FA'>{pitchdeckListItem?.fileName}</span>     */}
                                        <span className='text-2E90FA'>{truncateFileName(pitchdeckListItem?.fileName,40)}</span>    
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
            <div className='cuecard-custom-action-cta' onClick={handleDataroomView}>
                View Data Room
            </div>

            {
                documentData?.fileName &&
                <DocumentReader documentData={documentData} handleClose={handleClose} />
            }
        </div>
    )
}

export default SideInformationWrapper({OriginalComponent: CuecardPitchDeck, title: 'Important Documents', description: '', icon:  FolderIcon, descriptionClass: 'text-3E4784', hideIconContainer: true, iconClass: 'width-27px'})