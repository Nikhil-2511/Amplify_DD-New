import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { API_SUCCESS_CODE, APPROVE, INTRODUCTION_PENDING_KEY, POST, REJECT, UPLOAD_EXTENSIONS } from '../../../constants';
import { Box, Stack } from '@mui/system';
import { whiteTickIcon, whiteWarningIcon } from '../../../assets/icons/svgIcons';
import DoneDealFormField from '../../../CommonComponent/DoneDealFormField';
import CustomFileUpload from '../../../CommonComponent/CustomFileUpload';
import { GenericButton, OutlineButton } from '../../../CommonComponent/CustomButton';
import { ENDPOINT } from '../../../config/endpoint';
import { useDispatch } from 'react-redux';
import { documentQuery, fetchDocument, fetchPdf, updateFormToServer, updateSnackbar, uploadDocument } from '../../../Redux/slice/CommonSlice';
import PdfIcon from '../../../assets/images/pdfUploadIcon.svg';
import DownloadIcon from '../../../assets/images/downloadIcon.svg';
import DocumentUploadIcon from '../../../assets/images/documentUploadIcon.svg';
import { dowanloadPdfUsingBase64, downloadFile } from '../../../helper/commonHelper';
import moment from 'moment';
import CircularProgressWithLabel from '../../../CommonComponent/CircularProgressBarWithLabel';
import Loader from '../../../CommonComponent/Loader';
import { circularProgressClasses } from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import SelectComponent from '../../../CommonComponent/SelectComponent';
import { isAdminUser } from '../../../Services';
import CustomSelect from '../../../CommonComponent/CustomSelect';
import LightBulbIcon from '../../../assets/images/lightbulbIcon.svg';
import TimeSlotSelection from '../../../Component/TimeSlotSelection';
import { getSellerSlots } from '../../../Redux/slice/DealsSlice';
import { NO_SLOT } from '../../../constants/keyVariableConstants';


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
    overflowY: 'auto',
    maxHeight: '90vh'
}; 

function SellerDealsActionModal({actionData, approvalState, handleClose, handleRefresh}) {

    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");
    const [pdfFileLink, setPdfFileLink] = useState('');
    const [fileName, setFileName] = useState('');
    const [documentError, setDocumentError] = useState('');
    const [primaryId, setPrimaryId] = useState(null);
    const [localFileUploading, setLocalFileUploading] = useState('')
    const [progressValue, setProgressValue] = useState(0);
    const [selectedPitchDeck, setSelectedPitchDeck] = useState({});
    const [pitchDeckList, setPitchDeckList] = useState([]);
    const [dataLoadedTrue, setDataLoadedTrue] = useState(false);
    const useParamValue = useParams();
    const pitchdeckUploadFileLimit = 15;
    const [selectedSlot, setSelectedSlot] = useState('');
    const [timeSlotsOptions, setTimeSlotsOptions] = useState([]);
    const [slotError, setSlotError] = useState(false);


    useEffect(() => {
        if(approvalState === APPROVE) {
          getDocumentDetails();
          getUserSlots();
        }
    }, [])

    function getUserSlots() {
      let dataToSend = {
        postBody: {
          dealId: actionData?.id,
        },
        callback: handleUserSlotsCb
      }
      dispatch(getSellerSlots(dataToSend));
    }

    function handleUserSlotsCb(res) {
      if(res?.status === API_SUCCESS_CODE) {
        if(res?.data?.meetingBookingRequired) setTimeSlotsOptions((res?.data?.possibleMeetingList || []));
      }
      else {
        setTimeSlotsOptions([]);
      }
    }


    function getDocumentDetails() {
        let adminData = {};
        if(isAdminUser()) {
            adminData = {
                primaryUid: useParamValue?.companyId, 
                primaryIdType: 'seller',
            }
        }
        let dataToSend = {
            callback: handleGetDocumentCb,
            postBody: {
                "criteriaMap": {
                    "docType": "pitch_deck",
                    ...adminData
                }
            }
        }
        dispatch(documentQuery(dataToSend))
    }

    function handleGetDocumentCb(res) {
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data?.userDocMap?.pitch_deck?.length) {
                let pitchDecks = res?.data?.userDocMap?.pitch_deck;
                setPitchDeckList(pitchDecks);
                setSelectedPitchDeck(pitchDecks[0]);
            }
            setDataLoadedTrue(true);
        }
        else {

        }
    }

    function handleChange(value) {
        setInputValue(value);
        if(error) setError("");
    }

    function handleAction(action) {
        if(!inputValue && action === 'seller_rejected') {
            setError("Please enter a reason for rejecting this buyer");
            return;
        }
        if(localFileUploading) return;
        if(approvalState === APPROVE) {
          if(timeSlotsOptions?.length && !selectedSlot) {
            setSlotError(true);
            return;
          }
        }
        let uid = (primaryId ? primaryId : selectedPitchDeck.uid !== 'no_pitchdeck' ? selectedPitchDeck.uid : undefined)
        let prepareData = {
                buyerId: actionData?.buyerId, 
                companyId: actionData?.sellerId,
                dealStatus: action,
                interactionNotes: inputValue || undefined,
                docUid: uid,
                slotId: (selectedSlot && selectedSlot !== NO_SLOT) ? parseInt(selectedSlot) : null
            }

        let dataToSend = {
            postBody: prepareData,
            url: ENDPOINT.DEALS.updateDealActionApi(),
            method: POST,
            callback: handleCallback
        }
        dispatch(updateFormToServer(dataToSend))
    }

    function handleCallback(res) {
        if(res?.status === API_SUCCESS_CODE) {
            setPrimaryId(null);
            if(handleRefresh) {
                handleRefresh();
            }
            handleClose();
        }
        else {
            if(res?.data?.message) {
                setError(res?.data?.message);
            }
        }
    }

    function handleFileUplaod(file) {
        if(hasPdfData()) return ;
        setDocumentError(false);
        if(file.target.files[0]) {
            // if()
            let restrictedSize = pitchdeckUploadFileLimit * 1024 *1024;
            if(file.target.files[0].size > restrictedSize) {
                setDocumentError(true)
                return 
            }
            setLocalFileUploading(true);
            setFileName(file.target.files[0].name);
            let uploadedFile = file.target.files[0];
            
            let dataToSend = {
                "file": uploadedFile,
                "docData": {"userDocArray":[{"docType":"pitch_deck", "category": "company"}]},
                url: ENDPOINT.DOCUMENT.upload(),
                method: POST,
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
            setPrimaryId(res?.data);
            // getDocumentDetails();
        }

        else {
            dispatch(updateSnackbar({
                message: res?.data?.message,
                isOpen: true,
                type: 'error'
            }));
        }
    }

    function handleDownload() {
        let filters = {
            criteriaMap: {
                docType: 'pitch_deck'
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

    function hasPdfData() {
        return !!(fileName || pdfFileLink);
    }

    function handleModalClose() {
        if(localFileUploading) return;
        setPrimaryId(null);
        handleClose()
    }

    const handleSelectChange = (selectedList) => {
        setSelectedPitchDeck(selectedList);
    }

    function handleTimeSlot(value) {
      setSelectedSlot(value);
      setSlotError(false);
    }

    return (
      <React.Fragment>
        {approvalState && approvalState === APPROVE && (
          <Modal open={!!approvalState} onClose={() => {}}>
            <div className="global-modal-container">
              <Box sx={style}>
                <div className="flex row-gap-20 flex-direction-coloum margin-b20">
                  <div className="flex col-gap-20 align-center">
                    <div className="seller-approval-icon success flex justify-center items-center">
                      {whiteTickIcon}
                    </div>
                    <div className="text-22">Accept buyer interest?</div>
                  </div>
                  <div className="text-16 font-300">
                    <div>
                        Your identity will be revealed to this buyer over email.
                    </div>                    
                  </div>
                  {
                    actionData?.investorNote?.description &&
                    <div className='border border-667085 rounded-10 padding-y10 padding-x14'>
                      <div className='font-700 text-white'>Investor’s message:</div>
                      <div className='padding-t8 text-16 text-white'>{actionData?.investorNote?.description}</div>
                    </div>
                  }
                  {
                    dataLoadedTrue &&
                    <React.Fragment>
                        {
                            pitchDeckList?.length > 0 ?
                            <div>
                                <div className='margin-b8'>
                                    Select a pitchdeck to share with this buyer
                                </div>
                                <CustomSelect
                                    className="rounded-12"
                                    parentClass={' primary-theme padding-y4 '}
                                    themeBasedParentClass=' primary-theme rounded-8 '
                                    options={[{uid: 'no_pitchdeck', fileName: 'No pitchdeck'}, ...pitchDeckList]}
                                    handleSelect={handleSelectChange}
                                    label={selectedPitchDeck.uid} 
                                    size="small"
                                    theme="dark"
                                    keyToCompare = 'uid'
                                    displayKey = 'fileName'
                                    filterBodyClass='dark-theme'
                                />
                                {
                                    selectedPitchDeck.uid === 'no_pitchdeck' &&
                                    <div className='flex align-center col-gap-8 text-FEDF89 margin-t16'>
                                        <img className='w-24px' src={LightBulbIcon} alt = '' />
                                        <div>We recommend sharing a pitch deck to improve your odds.</div>
                                    </div>
                                }
                            </div>
                            :

                            <div>
                                <div className='margin-b16'>
                                    You can share a pitchdeck below with the buyer or later
                                    through your data room.
                                </div>
                                <div className="bg-282727 padding-y10 padding-x20 rounded-8">
                                {localFileUploading ? (
                                    <div className="flex col-gap-20">
                                    <CircularProgressWithLabel
                                        value={progressValue}
                                        label={`${Math.round(progressValue)}%`}
                                        thickness={5}
                                        size={60}
                                        sx={{
                                        color: "#3247FF",
                                        [`& .${circularProgressClasses.circle}`]: {
                                            strokeLinecap: "round",
                                        },
                                        }}
                                    />
                                    <div className="text-white">
                                        <div className="font-600">
                                        {fileName || "fafasd"}
                                        </div>
                                        <div className="text-16 font-300 margin-t5">
                                        Uploading
                                        </div>
                                    </div>
                                    </div>
                                ) : (
                                    <React.Fragment>
                                    <CustomFileUpload
                                        id="file-upload-pitchdeck"
                                        accept={UPLOAD_EXTENSIONS}
                                        className={
                                        "flex  " +
                                        (hasPdfData()
                                            ? "justify-space-between"
                                            : "justify-center")
                                        }
                                        handleOnChange={handleFileUplaod}
                                        labelClassName={hasPdfData() ? "w-full" : ""}
                                        disabled={hasPdfData()}
                                    >
                                        <div
                                        className={
                                            "" +
                                            (hasPdfData()
                                            ? "flex justify-space-between align-center col-gap-8"
                                            : "cursor-pointer")
                                        }
                                        >
                                        <div className="flex col-gap-8 align-center">
                                            {hasPdfData() && (
                                            <div className="flex col-gap-8 align-center">
                                                <img
                                                className="w-20px"
                                                src={PdfIcon}
                                                alt=""
                                                />
                                                <span>{fileName || pdfFileLink}</span>
                                            </div>
                                            )}
                                            {!hasPdfData() && (
                                            <div className="flex flex-direction-coloum justify-center align-center">
                                                <div className="upload-pitch-deck">
                                                <img
                                                    className="w-20px"
                                                    src={DocumentUploadIcon}
                                                    alt=""
                                                />
                                                <span>Upload pitchdeck</span>
                                                </div>
                                            </div>
                                            )}
                                        </div>
                                        {hasPdfData() && (
                                            <div
                                            className="cursor-pointer"
                                            onClick={handleDownload}
                                            >
                                            <img
                                                className="w-20px"
                                                src={DownloadIcon}
                                                alt=""
                                            />
                                            </div>
                                        )}
                                        </div>
                                    </CustomFileUpload>
                                    {!hasPdfData() && (
                                        <div className="text-7D7C7C margin-t6 text-10 text-center">
                                        PDF or PPT(X), size limit:{" "}
                                        {pitchdeckUploadFileLimit} MB
                                        </div>
                                    )}
                                    </React.Fragment>
                                )}
                                </div>
                                {documentError && (
                                <div className="text-FF8970 text-10 font-300 margin-t8">
                                    Please upload a PDF/PPT(X) file less than{" "}
                                    {pitchdeckUploadFileLimit} MB in size
                                </div>
                                )}
                            </div>
                        }
                    </React.Fragment>
                  }
                  {
                    <React.Fragment>
                      <TimeSlotSelection selectedSlot={selectedSlot} timeSlotsOptions={timeSlotsOptions} handleOnChange={handleTimeSlot} error={slotError} />
                      {
                        slotError &&
                        <div className='text-FF8970 text-12 font-300 margin-b8'>Please select a valid option from the above</div>
                      }
                    </React.Fragment>
                  }
                </div>
                <Stack
                  direction={"row"}
                  columnGap={1}
                  justifyContent={"flex-end"}
                >
                  <OutlineButton
                    className="text-30 capitalize"
                    onClick={handleModalClose}
                    sx={{ fontWeight: 400, padding: "11px 34px" }}
                  >
                    Cancel
                  </OutlineButton>
                  <GenericButton
                    className="capitalize"
                    color="modalButton"
                    onClick={() => handleAction(INTRODUCTION_PENDING_KEY)}
                    variant="contained"
                    sx={{ fontWeight: 400, padding: "11px 34px" }}
                  >
                    Accept
                  </GenericButton>
                </Stack>
              </Box>
            </div>
          </Modal>
        )}
        {approvalState && approvalState === REJECT && (
          <Modal open={!!approvalState} onClose={() => {}}>
            <div className="global-modal-container">
              <Box sx={style}>
                <div className="flex row-gap-20 flex-direction-coloum margin-b20">
                  <div className="flex col-gap-20 align-center">
                    <div className="seller-approval-icon error flex justify-center items-center">
                      {whiteWarningIcon}
                    </div>
                    <div className="text-22">Reject buyer interest?</div>
                  </div>
                  <div className="text-16 font-300">
                    Please specify a reason for rejecting the buyer interest.
                    <span className="text-FF8970">*</span>
                  </div>
                  <div className="text-16 font-300">
                    Please note, that your identity will continue to remain
                    anonymous. Your note could give the buyer an opportunity to
                    justify their reason for expressing interest
                  </div>
                  <div>
                    <DoneDealFormField
                      className="rounded-8 primary-theme"
                      placeholder={
                        "Enter your reason for rejecting buyer interest here"
                      }
                      fullWidth={true}
                      minRows={3}
                      maxRows={5}
                      backgroundColor="#121212"
                      borderRadius={12}
                      multiline={true}
                      size="small"
                      answer={inputValue}
                      isEditable={true}
                      updateAnswer={(e) => handleChange(e)}
                      error={error}
                    />
                  </div>
                </div>
                <Stack
                  direction={"row"}
                  columnGap={1}
                  justifyContent={"flex-end"}
                >
                  <OutlineButton
                    className="text-30 capitalize"
                    sx={{ fontWeight: 400, padding: "11px 34px" }}
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </OutlineButton>
                  <GenericButton
                    className="button error capitalize"
                    sx={{ fontWeight: 400, padding: "11px 34px" }}
                    color="modalButton"
                    onClick={() => handleAction("seller_rejected")}
                    variant="contained"
                  >
                    Reject
                  </GenericButton>
                </Stack>
              </Box>
            </div>
          </Modal>
        )}
        {/* {
                localFileUploading &&
                <Loader isOpen={localFileUploading} hasCustomMessage={'File is uploading, please wait.....'}  />
            } */}
      </React.Fragment>
    );
}

export default SellerDealsActionModal;