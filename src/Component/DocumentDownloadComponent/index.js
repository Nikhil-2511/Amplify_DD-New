import React from 'react';
import DownloadIcon from '../../assets/images/downloadRoundedIcon.svg';
import { fetchDocument, updateSnackbar } from '../../Redux/slice/CommonSlice';
import { useDispatch } from 'react-redux';
import { dowanloadPdfUsingBase64 } from '../../helper/commonHelper';
import { API_SUCCESS_CODE } from '../../constants';
import './style.scss';

function TemplateDownloadComponent({label='', icon='', className = '', api, docType}) {
    const dispatch = useDispatch();

    function handleDownloadClick() {
        let dataToSend = {
            postBody: {
                criteriaMap: {
                    docType
                }
            },
            callback: handleDownloadCb,
            url: api
        }
        dispatch(fetchDocument(dataToSend))
    }

    function handleDownloadCb(res) {
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data?.appDocMap) {
                let documentObj = res?.data?.appDocMap[docType];
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
    
    return (
        <div className={'download-template-container ' + (className)} onClick={handleDownloadClick}>
            <img className={'download-icon-class'} src={icon || DownloadIcon} alt="" />
            <span>{label}</span>
        </div>
    )
}

export default TemplateDownloadComponent;