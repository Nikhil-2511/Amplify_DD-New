import React from 'react';
import MessageLockIcon from '../../assets/images/messageLockIcon.svg'
import { getValueFromArr } from '../../helper/commonHelper';

function InternalInformationContainer({className, cardData={}, cardModel}) {
    function renderFieldValue(data, fieldKey, cardData){
       if(data?.customValue){
        return <p className='padding-l8 text-344054 text-12'>{data.getCustomValue(cardData[fieldKey] ? 'Active': 'Passive')}</p>
       }else if(data?.customLink){
        return <p className='padding-l8 text-344054 text-12'>{data.getCustomValue(cardData)}</p>
       }
        return <p className='padding-l8 text-344054 text-12'>{data.getValue(cardData[fieldKey], data?.optionData)}</p> 
    }

    return (
        <div className={'internal-information-container box-shadow-type1 padding-16 rounded-8' + (className || '')}>
            <div className='flex col-gap-20 '>
                <div className='max-w64px w-full h-64px flex flex-center bg-F5FBEE rounded-8'>
                    <img className='max-w20px' src={MessageLockIcon} alt=""/>
                </div>
                <div>
                    <h6 className='text-18 margin-0 padding-b10'>{cardModel.label}</h6>
                    <p className='text-475467 text-14 margin-t0'>{cardModel.description}</p>
                </div>
            </div>
            {
                Object.keys(cardModel.fields)?.length > 0 &&
                Object.keys(cardModel.fields).map((fieldKey, index) => {
                    let fieldData = cardModel.fields[fieldKey];
                    return (
                        <React.Fragment key={fieldData.label + index}>
                            <p className='label text-344054 font-500 text-14 py-2'>{fieldData.label}</p>
                            {
                                renderFieldValue(fieldData, fieldKey, cardData)
                                // fieldData.customValue ?
                                // <p className='padding-l8 text-344054 text-12'>{fieldData.getCustomValue(cardData[fieldKey] ? 'Active': 'Passive')}</p>
                                // :
                                // <p className='padding-l8 text-344054 text-12'>{fieldData.getValue(cardData[fieldKey], fieldData?.optionData)}</p>
                            }
                            
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}

export default InternalInformationContainer;