import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { categoryIconWithColors, commaSeperatedNumbers, formatCurrency, getAppBaseUrl, getDate, getFieldValue, getValueFromArr } from '../../helper/commonHelper';
import { CLOSING, DiSCOVERY_KEY, EXPRESS_INTEREST_KEY, NEGOTIATION, ON_HOLD, OTHERS, RUPEE_SYMBOL, SHORTLIST, VERIFIED } from '../../constants';
import { NewButton } from '../../CommonComponent/NewCustomButton';
import { AllDealsArr } from '../../CommonModels/CommonCollection';
import { trackEvent } from '../../helper/posthogHelper';
import { isAdminUser } from '../../Services';


function MobileCardView({listData, handleCompanyAction, isBuyerDeals,handleEventClick}) {
    const [showMoreAction, setShowMoreAction] = useState(false);
    const CategoryStyles = categoryIconWithColors(listData.category);
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <div className='flex justify-space-between col-gap-10'>
                <div className='flex col-gap-10'>
                    <div className='list-icon-container' style={{background: CategoryStyles.lightColor}}>
                        <span>
                            <img src={CategoryStyles.icon} alt={listData.category}/>
                        </span>
                    </div>
                    <div>
                        <div>
                            <span className='margin-r5 font-600 text-101828'>{getFieldValue(listData, 'category')}</span>
                            <span className='margin-r5 font-500 text-667085'>{listData.category === OTHERS ?  getFieldValue(listData, 'othersSubCategory') : getFieldValue(listData, 'subCategory')}</span>
                        </div>
                        <div>
                            <span className='margin-r5'>{`${isBuyerDeals ? 'D' : 'S'}${getFieldValue(listData, 'id')}`}</span>
                            {
                                getFieldValue(listData, 'verificationStatus') === VERIFIED &&
                                <span className='list-label success-label margin-r5'><CheckCircleOutlineIcon fontSize='10px' sx={{verticalAlign: 'middle', mr: '2px'}} /><span className='margin-l2'>Verified</span></span>
                            }
                            {
                                (!isBuyerDeals && (getFieldValue(listData, 'dealStatus') === 'express_interest' ||
                                getFieldValue(listData, 'dealStatus') === 'negotiation' || 
                                getFieldValue(listData, 'dealStatus') === 'closing')) &&
                                <span className='list-label warning-label'>In Conversation</span>
                            }
                            {
                                isBuyerDeals && listData?.dealStatus && 
                                <span className='list-label warning-label'>{getValueFromArr(listData?.dealStatus, AllDealsArr)}</span>
                            }
                        </div>
                    </div>
                </div>
                <div className='action-icon flex'>
                    {
                        !isBuyerDeals &&
                        getFieldValue(listData, 'dealStatus') !== EXPRESS_INTEREST_KEY &&
                        getFieldValue(listData, 'dealStatus') !== NEGOTIATION.key &&
                        getFieldValue(listData, 'dealStatus') !== CLOSING.key && 
                        getFieldValue(listData, 'dealStatus') !== ON_HOLD.key && 
                        <IconButton aria-label="fav" size="small" sx={{height: '22px', p: 0, mr: '5px'}} onClick={() => handleCompanyAction(getFieldValue(listData, 'shortlisted') ? DiSCOVERY_KEY : SHORTLIST, '', getFieldValue(listData, 'shortlisted') ? 'no' : 'yes')}>
                            {
                                getFieldValue(listData, 'shortlisted') ? 
                                <FavoriteIcon sx={{fill: '#ff3334', color: '#ff3334', fontSize: '20px'}} />
                                :
                                <FavoriteBorderIcon fontSize="small" sx={{fontSize: '20px'}}/>
                            }
                        </IconButton>
                    }
                    {/* <IconButton aria-label="more"  size="small" sx={{height: '22px', p: 0}} onClick={() => setShowMoreAction(!showMoreAction)}>
                        <MoreVertIcon fontSize="small" />
                        {
                            showMoreAction &&
                            <div className='more-vert-container'>
                                <div className='more-vert-list text-14 text-left' onClick={() => {setShowMoreAction(!showMoreAction); handleCompanyAction('not_relevant', true)}}>Not Relevant</div>
                            </div>
                        }
                    </IconButton> */}
                </div>
            </div>
            <div className={'list-description text-14 ' + (isAdminUser() ? '' : 'noselect')}>{isBuyerDeals ? getFieldValue(listData, 'sellerDescription') : getFieldValue(listData, 'about')}</div>
            <div className='list-grid'>
                <div>
                    <div className='grid-list-heading'>TTM Revenue</div>
                    {
                        isBuyerDeals ?
                        <div className='grid-list-text'>{listData?.ttmRevenue ? `${RUPEE_SYMBOL}${formatCurrency(getFieldValue(listData, 'ttmRevenue'))}` : '-'}</div>
                        :
                        <div className='grid-list-text'>{listData?.ttmCalculated ? `${RUPEE_SYMBOL}${formatCurrency(getFieldValue(listData, 'ttmCalculated'))}` : '-'}</div>
                    }
                </div>
                {
                    !isBuyerDeals &&
                    <div className='grid-list-spaning'>
                        <div className='grid-list-heading'>Age of Company</div>
                        <div className='grid-list-text'>{getFieldValue(listData, 'ageOfOps')}</div>
                    </div>
                }
                {
                    !isBuyerDeals &&
                    <div>
                        <div className='grid-list-heading'>Number of Customers</div>
                        <div className='grid-list-text'>{listData?.customersCalculated ? `${commaSeperatedNumbers(getFieldValue(listData, 'customersCalculated'))}` : ''}</div>
                    </div>
                }
                {
                    !isBuyerDeals &&
                    <div>
                        <div className='grid-list-heading'>EBITDA</div>
                        <div className='grid-list-text'>{listData.ebitda === 'yes' ? 'Positive' : (listData.ebitda === 'no' ? 'Negative' :'NA')}</div>
                    </div>
                }
                {
                    isBuyerDeals &&
                    <div>
                        <div className='grid-list-heading'>Last Activity</div>
                        <div className='grid-list-text'>{getDate(listData.updatedAt)}</div>
                    </div>
                }
            </div>
            <div>
                <NewButton onClick={() => handleEventClick()} fullWidth href={getAppBaseUrl() + `buyer/cue-card/${getFieldValue(listData, 'companyId')}`} target="_blank" className='capitalize' variant="contained" size='medium' color="primary" sx={{color: '#fff !important',fontWeight: "500"}} >View Listing</NewButton>
            </div>
        </React.Fragment>
    )
}

export default MobileCardView;