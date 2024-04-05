import React, { useEffect, useMemo, useState } from 'react';
import { API_SUCCESS_CODE, POST } from '../../../constants';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isAdminUser } from '../../../Services';
import { documentQuery } from '../../../Redux/slice/CommonSlice';
import DocumentCollectionSection from './documentCollectionSection';

function DocumentsSubsection({selectedSectionModel, subSectionModelData={}}) {
    const [documentsList, setDocumentsList] = useState({});
    const dispatch = useDispatch();
    const useParamValue = useParams();
    const [reloadDocuments, setReloadDocuments] = useState(true);
    
    useEffect(() => {
        if(reloadDocuments) {
            let docType = '';
            if(selectedSectionModel?.docType) {
                docType = selectedSectionModel?.docType;
            }
            getDocumentDetails(docType)
        }
    }, [selectedSectionModel, reloadDocuments])

    function getDocumentDetails(docType) {
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
                    "docType": docType,
                    ...adminData
                }
            }
        }
        dispatch(documentQuery(dataToSend))
    }

    function handleGetDocumentCb(res) {
        if(res?.status === API_SUCCESS_CODE) {
            if(res?.data?.userDocMap) {
                setDocumentsList(res?.data?.userDocMap);
            }
        }
        else {
            setDocumentsList({})
        }
        setReloadDocuments(false);
    }

    return (
        <div className='flex flex-direction-coloum row-gap-12'>
            {
                Object.keys(subSectionModelData)?.length > 0 && 
                Object.keys(subSectionModelData).map((modelListKey, index) => {
                    let modelListItem = subSectionModelData[modelListKey];
                    return (
                        <div className='' key={modelListKey + index}>
                            <DocumentCollectionSection dataModel={modelListItem} documentList={documentsList[modelListItem?.key]} onSuccess={() => setReloadDocuments(true)}/>
                        </div>
                    )
                })                
            }
        </div>
    )
}

export default DocumentsSubsection;