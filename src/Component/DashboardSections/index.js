import { Button, Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import IconBox from '../../CommonComponent/IconBox';
import { formatCurrencyNumber, getDetails, getValueFromOptions, isMobileView } from '../../helper/commonHelper';
import { getFieldObjData } from '../../Container/Dashboard/CommonModel';
import { OutlineButton } from '../../CommonComponent/CustomButton';
import  DownArrowIcon from '../../assets/images/downArrowIcon.svg';
import  UpArrowIcon from '../../assets/images/upArrowIcon.svg';

function DashboardSections({sectionId, dashboardSectionData, className, handleEditClick, valuation, canEdit, showCount, itemClassLabel, itemClass, labelClass, subsectionStackClass, iconClass, itemFieldClassLabel, defaultOpen, scrollId }) {
  const [count, setCount] = useState(0);
  const isMobile = isMobileView();
  const [showDetails, setShowDetails] = useState(true);
  const [showArrow, setShowArror] = useState(false);
  
  const toggleArrow = () => {
    setShowArror(true);
  };

  const toggleDetails = () => {
    if(isMobile && !defaultOpen){
      setShowDetails(!showDetails);
    }
  };

  useEffect(() => {
      if(isMobile && dashboardSectionData?.label !== 'About the Company'){
        if(defaultOpen) return;
        setShowDetails(false);
      }
  }, []);

  // useEffect(() => {
  //   if(showCount && dashboardSectionData.type !== 'chip' && dashboardSectionData?.subSection?.length) {
  //     let count = 0;
  //     dashboardSectionData?.subSection.map((item) => {
  //       if(!valuation[item.qk_key]) count++;
  //     })
  //     setCount(count);
  //   }
  // }, [valuation])

  function renderObjectPairValue(listItem, value) {
    let newValue = value;
    if(listItem.field_type === 'currency') {
      newValue = formatCurrencyNumber(value);
    }
    else if(listItem.field_type === 'dropdown') {
      newValue = getValueFromOptions(value, listItem.options);
    }
    return newValue || '-';
  }

  function renderSection() {
    switch (dashboardSectionData.type) {
      case 'two_col':
        return renderTwoColView();
      case 'three_col':
        return renderThreeColView();
      case 'four_col':
        return renderFourColView();
      case 'chip':
        return renderChipTypeView();
      case 'single_col':
        return renderSingleFieldView();
      case 'object_pair':
        return renderObjectPairtView();
      default: 
        return '';
    }
  }

  function renderTwoColView() {
    return (
      <div className={'primary-theme ' + (className ? className : '')} id={sectionId}>
        <div className={'flex justify-space-between align-center ' + (labelClass ? labelClass : '')} onClick={toggleDetails}>
          <div className='flex align-center col-gap-10'>
            <IconBox icon={dashboardSectionData.icon} className={"" + (iconClass ? iconClass : '')} /> <span className='form-field-title'>{dashboardSectionData?.label || ''}</span>
            {/* {showCount && count > 0 && <span  className='text-grey3 margin-l30 margin-t3'>{count} left out of {dashboardSectionData?.subSection?.length} </span>} */}
          </div>
          { isMobile && 
            <div>
              { showDetails ? (
                <img src={UpArrowIcon} alt="up arrow icon" />
              ) : (
                <img src={DownArrowIcon} alt="down arrow icon" />
              )}
            </div>
          }
          {!isMobile && canEdit && <div className='text-A9A9A9 text-14 cursor-pointer' onClick={() => handleEditClick(sectionId)}>Edit info</div>}
        </div>
        { 
          showDetails && 
          <React.Fragment>
            <Grid container className={'' + (subsectionStackClass ? subsectionStackClass : "") + (isMobile ? 'margin-t10' : '')} >
            {
              dashboardSectionData?.subSection?.length > 0 &&
              dashboardSectionData?.subSection.map((listItem, index) => {
                // if(!valuation[listItem.qk_key]) setCount(count => count + 1);
                let colCount = index++;
                if(listItem?.nonCountable) colCount--; 
                if (listItem.hideOnDashboard) return '';
                return (
                  <Grid className='custom-margin-mobile' sx={{marginBottom: '10px'}} xs={12} md={colCount%2 === 0 ? 4 : 8} key={index}>
                    <div className='text-6B6B6B padding-b5'>{listItem.label}</div>
                    <div className=''>{getDetails(listItem, valuation)}</div>
                  </Grid>
                )
              })
            }
          </Grid>
          {
            isMobile && canEdit && <div className='text-center padding-y10'><div className='text-16 cursor-pointer grad-text1 text-center inline-block' onClick={() => handleEditClick(sectionId)}>Edit info</div></div>
          }
          </React.Fragment>
        }
       
      </div>
    )
  }

  function renderThreeColView() {
    return (
      <div className={'primary-theme ' + (className ? className : '')} id={sectionId}>
        <div className={'flex justify-space-between align-center ' + (labelClass ? labelClass : '')} onClick={toggleDetails}>
          {
            dashboardSectionData?.label &&
            <div className='flex align-center col-gap-10'>
              <IconBox icon={dashboardSectionData.icon} className={"" + (iconClass ? iconClass : '')} /> <span className='form-field-title '>{dashboardSectionData?.label || ''}</span>
              {/* {showCount && count > 0 && <span  className='text-grey3 margin-l30 margin-t3'>{count} left out of {dashboardSectionData?.subSection?.length} </span>} */}
            </div>
          }
          { !defaultOpen && isMobile && 
            <div >
              { showDetails ? (
                <img src={UpArrowIcon} alt="up arrow icon" />
              ) : (
                <img src={DownArrowIcon} alt="down arrow icon" />
              )}
            </div>
          }
          {!isMobile && canEdit && <div className='text-A9A9A9 text-14 cursor-pointer' onClick={() => handleEditClick(sectionId)}>Edit info</div>}
        </div>
        {
          showDetails && 
          <React.Fragment>
             <div className='w-full'>
              {dashboardSectionData?.customFields?.length > 0 &&
               dashboardSectionData?.customFields?.map((field, idx) => {
                  return <React.Fragment key={idx}>{field}</React.Fragment>
              })
              }
              </div>
              <Stack direction={{ xs: 'column', md: 'row' }} rowGap={2} columnGap={2} className={"" + (subsectionStackClass ? subsectionStackClass : "") + (isMobile ? 'margin-t10' : '')}>
              {
                dashboardSectionData?.subSection?.length > 0 &&
                dashboardSectionData?.subSection.map((listItem, index) => {
                  // if(!valuation[listItem.qk_key]) setCount(count => count + 1);
                  if (listItem.hideOnDashboard) return '';
                  return (
                    <div className={'flex-1 ' + (itemClass ? itemClass : '')} key={index}>
                      <div className={'text-6B6B6B ' + (itemClassLabel ? itemClassLabel : '')}>{listItem.label}</div>
                      <div className={'' + (itemFieldClassLabel ? itemFieldClassLabel : '')}>{getDetails(listItem, valuation)}</div>
                    </div>
                  )
                })
              }
            </Stack>
            {
              isMobile && canEdit && <div className='text-center padding-y10'><div className='text-16 cursor-pointer grad-text1 text-center inline-block' onClick={() => handleEditClick(sectionId)}>Edit info</div></div>
            }
          </React.Fragment>
        }
       
      </div>
    )
  }

  function renderFourColView() {
    return (
      <div className={'primary-theme ' + (className ? className : '')} id={sectionId}>
        <div className={'flex justify-space-between align-center ' + (labelClass ? labelClass : '')} onClick={toggleDetails}>
          <div className='flex align-center col-gap-10'>
            <IconBox icon={dashboardSectionData.icon} className={"" + (iconClass ? iconClass : '')} /> <span className='form-field-title'>{dashboardSectionData?.label || ''}</span>
            {/* {showCount && count > 0 && <span className='text-grey3 margin-l30 margin-t3'>{count} left out of {dashboardSectionData?.subSection?.length} </span>} */}
          </div>
          { isMobile && 
            <div >
              { showDetails ? (
                <img src={UpArrowIcon} alt="up arrow icon" />
              ) : (
                <img src={DownArrowIcon} alt="down arrow icon" />
              )}
            </div>
          }
          {!isMobile && canEdit && <div className='text-A9A9A9 text-14 cursor-pointer' onClick={() => handleEditClick(sectionId)}>Edit info</div>}
        </div>
        { 
          showDetails && 
          <React.Fragment>

            <div className={"four-col-view flex-wrap " + (subsectionStackClass ? subsectionStackClass : "") + (isMobile ? 'margin-t10' : '')} id={sectionId}>
              <div className='w-full'>
              {dashboardSectionData?.customFields?.length > 0 &&
               dashboardSectionData?.customFields?.map((field, idx) => {
                  return <React.Fragment key={idx}>{field}</React.Fragment>
              })
              }
              </div>
              {
                dashboardSectionData?.subSection?.length > 0 &&
                dashboardSectionData?.subSection.map((listItem, index) => {
                  // if(!valuation[listItem.qk_key]) setCount(count => count + 1);
                  if (listItem.hideOnDashboard) return '';
                  return (
                    <div className={'four-col-list-item ' + (itemClass ? itemClass : '')} key={index}>
                      <div className={'text-6B6B6B ' + (itemClassLabel ? itemClassLabel : '')}>{listItem.label}</div>
                      <div className=''>{getDetails(listItem, valuation, dashboardSectionData?.subSection)}</div>
                    </div>
                  )
                })
              }
            </div>
            {
              isMobile && canEdit && <div className='text-center padding-y10'><div className='text-16 cursor-pointer grad-text1 text-center inline-block' onClick={() => handleEditClick(sectionId)}>Edit info</div></div>
            }
          </React.Fragment>
        }
      </div>
    )
  }

  function renderChipTypeView() {
    return (
      <div className={'primary-theme ' + (className ? className : '')} id={sectionId}>
        <div className={'flex justify-space-between align-center ' + (labelClass ? labelClass : '')}>
          <div className='flex align-center col-gap-10'>
            <IconBox icon={dashboardSectionData.icon} className={"" + (iconClass ? iconClass : '')} /> <span className='form-field-title'>{dashboardSectionData?.label || ''}</span>
          </div>
          {canEdit && <div className='text-A9A9A9 text-14 cursor-pointer' onClick={() => handleEditClick(sectionId)}>Edit info</div>}
        </div>
        <div className={'flex ' + (isMobile ? 'margin-t10' : '')}>
          {
            dashboardSectionData?.subSection?.length > 0 &&
            dashboardSectionData?.subSection.map((listItem, index) => {
              return (
                <div className='padding-r10' key={index}>{listItem}</div>
              )
            })
          }
        </div>
      </div>
    )
  }

  function renderSingleFieldView() {
    return (
      <div className={'primary-theme ' + (className ? className : '')} id={sectionId}>
        <div className={'flex justify-space-between align-center ' + (labelClass ? labelClass : '')} onClick={toggleDetails}>
          <div className='flex align-center col-gap-10'>
            <IconBox icon={dashboardSectionData.icon} className={"" + (iconClass ? iconClass : '')} /> <span className='form-field-title'>{dashboardSectionData?.label || ''}</span>
          </div>
          {
            !isMobile && canEdit && valuation[dashboardSectionData.qk_key] && <div className='text-A9A9A9 text-14 cursor-pointer' onClick={() => handleEditClick(sectionId)}>Edit info</div>
          }
          { isMobile && 
            <div >
              { showDetails ? (
                <img src={UpArrowIcon} alt="up arrow icon" />
              ) : (
                <img src={DownArrowIcon} alt="down arrow icon" />
              )}
            </div>
          } 
          {
           !isMobile && canEdit && !valuation[dashboardSectionData.qk_key] && <OutlineButton className={'capitalize'} onClick={() => handleEditClick(sectionId)}>Complete your info</OutlineButton>
          }
         
        </div>
        {
          showDetails && 
          <React.Fragment>
            <div className={'flex ' + (isMobile ? 'margin-t10' : '')}>
              <div className=''>{getDetails(dashboardSectionData, valuation)}</div>
            </div>
            {
              isMobile && canEdit && <div className='text-center padding-y10'><div className='text-16 cursor-pointer grad-text1 text-center inline-block' onClick={() => handleEditClick(sectionId)}>Edit info</div></div>
            }
          </React.Fragment>
          }
      </div>
    )
  }

  function renderObjectPairtView() {
    return (
      <div className={'primary-theme ' + (className ? className : '')} id={sectionId}>
        <div className={'flex justify-space-between align-center ' + (labelClass ? labelClass : '')} onClick={toggleDetails}>
          {
            dashboardSectionData?.label &&
            <div className='flex align-center col-gap-10'>
              <IconBox icon={dashboardSectionData.icon} className={"" + (iconClass ? iconClass : '')} /> <span className='form-field-title '>{dashboardSectionData?.label || ''}</span>
              {/* {showCount && count > 0 && <span  className='text-grey3 margin-l30 margin-t3'>{count} left out of {dashboardSectionData?.subSection?.length} </span>} */}
            </div>
          }
          {
            !isMobile && canEdit && <div className='text-A9A9A9 text-14 cursor-pointer' onClick={() => handleEditClick(sectionId)}>Edit info</div>
          }
          { isMobile && 
            <div>
              { showDetails ? (
                <img src={UpArrowIcon} alt="up arrow icon" />
              ) : (
                <img src={DownArrowIcon} alt="down arrow icon" />
              )}
            </div>
          }
        </div>
        {
          showDetails && 
          <React.Fragment>
            <Stack sx={{flexWrap: 'wrap'}} direction={{ xs: 'column', md: 'row' }} rowGap={2} className={"render-object-view " + (subsectionStackClass ? subsectionStackClass : "") + (isMobile ? 'margin-t10' : '')}>
              {
                dashboardSectionData?.subSection?.length > 0 &&
                dashboardSectionData?.subSection.map((listItem, index) => {
                  // if(!valuation[listItem.qk_key]) setCount(count => count + 1);
                  if (listItem.hideOnDashboard) return '';
                  return (
                    <div className={'render-object-view-item ' + (itemClass ? itemClass : '')} key={index}>
                      <div className={'text-6B6B6B ' + (itemClassLabel ? itemClassLabel : '')}>{listItem.label}</div>
                      <div className={'' + (itemFieldClassLabel ? itemFieldClassLabel : '')}>
                        {renderObjectPairValue(listItem, getFieldObjData(listItem.qk_key, valuation))}
                      </div>
                    </div>
                  )
                })
              }
            </Stack>
            {
              isMobile && canEdit && <div className='text-center padding-y10'><div className='text-16 cursor-pointer grad-text1 text-center inline-block' onClick={() => handleEditClick(sectionId)}>Edit info</div></div>
            }
          </React.Fragment>
        }
      </div>
    )
  }


  return (
    <React.Fragment>
      {
        renderSection()
      }
    </React.Fragment>
  )
}

export default DashboardSections;