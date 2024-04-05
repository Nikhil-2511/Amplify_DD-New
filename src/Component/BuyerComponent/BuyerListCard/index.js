import React, { useState } from 'react';
import { Chip, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { categoryIconWithColors, commaSeperatedNumbers, formatCurrency, formatCurrencyNumber, getAppBaseUrl, getEbitdaStatus, getFieldValue } from '../../../helper/commonHelper';
import { CLOSING, DiSCOVERY_KEY, EXPRESS_INTEREST_KEY, NEGOTIATION, ON_HOLD, OTHERS, RUPEE_SYMBOL, SHORTLIST, VERIFIED } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { NewButton } from '../../../CommonComponent/NewCustomButton';
import { SHORTLISTED_KEY } from '../../../constants/keyVariableConstants';
import { trackEvent } from '../../../helper/posthogHelper';
import { isAdminUser } from '../../../Services';


function BuyerListCard({listData, handleCompanyAction, handleEventClick}) {
    const [showMoreAction, setShowMoreAction] = useState(false);
    const CategoryStyles = categoryIconWithColors(listData.category);
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <div className='flex justify-space-between col-gap-10'>
                <div className='flex list-header col-gap-10'>
                    <div className='list-icon-container' style={{background: CategoryStyles.lightColor}}>
                        <span>
                            <img src={CategoryStyles.icon} alt={listData.category}/>
                        </span>
                    </div>
                    <div>
                        <div>
                            <span className='margin-r5 font-600 text-101828'>{getFieldValue(listData, 'category')}</span>
                            <span className='margin-r5 font-500 text-667085'>{listData.category === OTHERS ?  getFieldValue(listData, 'othersSubCategory') : getFieldValue(listData, 'subCategory')}</span>
                            <span className='margin-r5'>S{getFieldValue(listData, 'id')}</span>
                            {
                                getFieldValue(listData, 'verificationStatus') === VERIFIED &&
                                <span className='list-label success-label margin-r5'><CheckCircleOutlineIcon fontSize='10px' sx={{verticalAlign: 'middle', mr: '2px'}} /><span className='margin-l2'>Verified</span></span>
                            }
                            {
                                (getFieldValue(listData, 'dealStatus') === 'express_interest' ||
                                getFieldValue(listData, 'dealStatus') === 'negotiation' || 
                                getFieldValue(listData, 'dealStatus') === 'closing') &&
                                <span className='list-label warning-label'>In Conversation</span>
                            }
                        </div>
                        <div className={'list-description ' + (isAdminUser() ? '' : 'noselect')}>{getFieldValue(listData, 'about')}</div>
                    </div>
                </div>
                <div className='action-icon flex'>
                    {
                        getFieldValue(listData, 'dealStatus') !== EXPRESS_INTEREST_KEY &&
                        getFieldValue(listData, 'dealStatus') !== NEGOTIATION.key &&
                        getFieldValue(listData, 'dealStatus') !== CLOSING.key && 
                        getFieldValue(listData, 'dealStatus') !== ON_HOLD.key && 
                        <IconButton aria-label="fav" size="small" sx={{height: '22px', p: 0, mr: '5px'}} onClick={() => handleCompanyAction(getFieldValue(listData, SHORTLISTED_KEY) ? DiSCOVERY_KEY : SHORTLIST, '', getFieldValue(listData, SHORTLISTED_KEY) ? 'no' : 'yes')}>
                            {
                                getFieldValue(listData, SHORTLISTED_KEY) ? 
                                <FavoriteIcon sx={{fill: '#ff3334', color: '#ff3334', fontSize: '20px'}} />
                                :
                                <FavoriteBorderIcon fontSize="small" sx={{fontSize: '20px'}}/>
                            }
                        </IconButton>
                    }
                    <IconButton aria-label="more"  size="small" sx={{height: '22px', p: 0}} onClick={() => setShowMoreAction(!showMoreAction)}>
                        <MoreVertIcon fontSize="small" />
                        {
                            showMoreAction &&
                            <div className='more-vert-container'>
                                <div className='more-vert-list text-14 text-left' onClick={() => {setShowMoreAction(!showMoreAction); handleCompanyAction('not_relevant', true)}}>Not Relevant</div>
                            </div>
                        }
                    </IconButton>
                </div>
            </div>
            <div className='list-grid'>
                <div>
                    <div className='grid-list-heading'>TTM Revenue</div>
                    <div className='grid-list-text'>{listData?.ttmCalculated ? `${RUPEE_SYMBOL}${formatCurrency(getFieldValue(listData, 'ttmCalculated'))}` : '-'}</div>
                </div>
                <div className='grid-list-spaning'>
                    <div className='grid-list-heading'>Age of Company</div>
                    <div className='grid-list-text'>{getFieldValue(listData, 'ageOfOps')}</div>
                </div>
                <div>
                    <div className='grid-list-heading'>Number of Customers</div>
                    <div className='grid-list-text'>{listData?.customersCalculated ? `${commaSeperatedNumbers(getFieldValue(listData, 'customersCalculated'))}` : ''}</div>
                </div>
                <div>
                    <div className='grid-list-heading'>EBITDA</div>
                    <div className='grid-list-text'>{getEbitdaStatus(listData, RUPEE_SYMBOL)}</div>
                </div>
                <div className='text-right'>
                    <NewButton onClick={() => handleEventClick()} href={getAppBaseUrl() + `buyer/cue-card/${getFieldValue(listData, 'companyId')}`} target="_blank" className='capitalize' variant="contained" size='small' color="primary" sx={{color: '#fff !important', fontWeight: '700'}} >View Listing</NewButton>
                </div>
            </div>
            {/* // Line clamp testing need to be required */}
            {/* <div class="text ellipsis">
                <span class="text-concat">
                Lorem ipsum dolor sit amet, nibh eleifend cu his, porro fugit mandamus no mea. Sit tale facete voluptatum ea, ad sumo altera scripta per, eius ullum feugait id duo. At nominavi pericula persecuti ius, sea at sonet tincidunt, cu posse facilisis eos. Aliquid philosophia contentiones id eos, per cu atqui option disputationi, no vis nobis vidisse. Eu has mentitum conclusionemque, primis deterruisset est in.

                Virtute feugait ei vim. Commune honestatis accommodare pri ex. Ut est civibus accusam, pro principes conceptam ei, et duo case veniam. Partiendo concludaturque at duo. Ei eirmod verear consequuntur pri. Esse malis facilisis ex vix, cu hinc suavitate scriptorem pri.
                </span>
            </div> */}
        </React.Fragment>
    )
}

export default BuyerListCard;