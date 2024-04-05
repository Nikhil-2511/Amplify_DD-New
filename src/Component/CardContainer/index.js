import React from 'react';
import { MessageIcon } from '../../assets/icons/svgIcons';
import './style.scss';
import { ARRAY, BOOLEAN, CURRENCY, RUPEE_SYMBOL } from '../../constants';
import { formatCurrency, formatCurrencyNumber, getEbitdaStatus, getValueFromArr, isMobileView } from '../../helper/commonHelper';
import { isAdminUser } from '../../Services';

function CardContainer({title, modelFieldData, cueCardData, hasRowFirst, icon}) {
    const ColumModel = modelFieldData?.subSection?.colData || [];
    const RowModel = modelFieldData?.subSection?.rowData || [];
 
    function getModelFieldValue(modelListDetails) {
        let label = ''
        if(cueCardData) {
            let value= cueCardData[modelListDetails.key];
            if(modelListDetails?.field_type === BOOLEAN) {
                return value;
            }
            else if(modelListDetails?.key === 'ttmEbitda'){
                return getEbitdaStatus(cueCardData);
            }
            else if(modelListDetails?.field_type === ARRAY) {
                return getValueFromArr(value, modelListDetails.options);
            }
            else {
                if(value) {
                    if(modelListDetails.prefix) label += modelListDetails.prefix;
                    if(modelListDetails?.field_type === CURRENCY) value = formatCurrency(value);
                    label += value;
                    if(modelListDetails.suffix) label += modelListDetails.suffix;
                } 
                else if(modelListDetails.hasCustomLabel) label = modelListDetails.hasCustomLabel;
            }
        }
        return label || '-';
    }

    function renderCol() {
        return (
            <div className={'flex margin-t20 ' + (isMobileView() ? 'flex-wrap row-gap-10' : 'col-gap-10')}>
                {
                    ColumModel.map((colModelList, index) => {
                        return (
                            <div className={'model-list-item ' + (isMobileView() ? 'width-50 padding-x5' : 'flex-1')} key={`${colModelList.label}${index}`}>
                                <div className='text-667085 text-18 margin-b8 font-600'>{colModelList.label}</div>
                                {
                                    colModelList.type !== 'chip' &&
                                    <div className={"font-500 text-16 text-1D2939 " + (colModelList?.className || '')}>{getModelFieldValue(colModelList)}</div>
                                }
                                {
                                    colModelList.type === 'chip' &&
                                    <div className='bg-ECFDF3 text-16 font-500 text-green padding-y4 padding-x10 rounded-16 inline-block'>{`${getModelFieldValue(colModelList) ? 'Operational' : 'Non Operational'}`}</div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    function renderRow() {
        return (
            <div className='margin-t12'>
                {
                    RowModel.map((rowModelList, index) => {
                        return (
                            <div className={'model-list-item padding-12 bg-F2F4F7 rounded-4 ' + (index !== RowModel.length - 1 ? 'margin-b12' : '')} key={rowModelList.key + index}>
                                <div className='text-18 font-600 text-344054 margin-b8'>{rowModelList.label}</div>
                                <div className='padding-l4 text-344054 text-16'>{getModelFieldValue(rowModelList)}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    function rednerRowFistColum() {
        return (
            <React.Fragment>
                {renderRow()}
                {renderCol()}
            </React.Fragment>
        )
    }

    function renderColFirstColum() {
        return (
            <React.Fragment>
                {renderCol()}
                {renderRow()}
            </React.Fragment>
        )
    }

    return (
        <div className={'card-container ' + (isAdminUser() ? '' : 'noselect')}>
            <div className='flex align-center col-gap-12'>
                <div className='flex' >
                    <div className='square-36 bg-3E4784'>
                        {icon || MessageIcon}</div>
                    </div>
                <div className='card-title text-3E4784 font-600 text-20'>{title}</div>
            </div>
            {
                // ColumModel?.length > 0 &&
                <div className=''>
                    {
                        hasRowFirst ?
                        rednerRowFistColum()
                        :
                        renderColFirstColum()
                    }
                </div>
            }
        </div>
    )
}

export default CardContainer;