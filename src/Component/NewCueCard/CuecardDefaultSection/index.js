import React from 'react';
import { NewCueCardCommonModel } from '../NewCueCardCommonData';
import CardContainer from '../../CardContainer';
import CuecardPitchDeck from '../CuecardPitchDeck';
import { isAdminUser, isAuthenticated, isBuyerUser } from '../../../Services';
import { useNavigate } from 'react-router-dom';
import { isMobileView, isObjectEmpty } from '../../../helper/commonHelper';
import { CLOSING, DONE_DEAL, DiSCOVERY_KEY, EXPRESS_INTEREST_KEY, INTRODUCTION_PENDING_KEY, NEGOTIATION, ON_HOLD, PASS, SHORTLIST } from '../../../constants';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector } from 'react-redux';

function CuecardDefaultSection({cueCardModel, cueCardData, handleAction, handleDataroomView}) {
    const navigate = useNavigate();
    const buyerParams = useSelector((state) => state.buyerStore?.buyerParams);

    function getDealsStatus(dealStatusState) {
        return cueCardData?.dealStatus === dealStatusState;
    }

    function validateImportantDocument() {
        return isAuthenticated() && 
            ((isBuyerUser() && (getDealsStatus(INTRODUCTION_PENDING_KEY) || getDealsStatus(NEGOTIATION.key) || getDealsStatus(DONE_DEAL.key) || getDealsStatus(CLOSING.key) || getDealsStatus(ON_HOLD.key))) || isAdminUser()) && 
            (cueCardData?.docData?.userDocMap?.pitch_deck?.length > 0 || cueCardData?.docData?.userDocMap?.cap_table?.length > 0 || cueCardData?.docData?.userDocMap?.mis?.length > 0)
    }

    return (
        <React.Fragment>
            <div className='cuecard-left-section flex-1'>
                {
                    Object.keys(NewCueCardCommonModel)?.length > 0 &&
                    Object.keys(NewCueCardCommonModel).map((modelList, index) => {
                        let fieldData = NewCueCardCommonModel[modelList];
                        return <CardContainer key={`${modelList}${index}`} title={fieldData.label} icon={fieldData.icon} modelFieldData={fieldData} cueCardData={cueCardData} hasRowFirst={true} />
                    })
                }
                {
                    Object.keys(cueCardModel)?.length > 0 &&
                    Object.keys(cueCardModel).map((modelList, index) => {
                        let fieldData = cueCardModel[modelList];
                        return <CardContainer key={`${modelList}${index}`} title={fieldData.label} icon={fieldData.icon} modelFieldData={fieldData} cueCardData={cueCardData} />
                    })
                }
            </div>
            {
                (isBuyerUser() || (isAdminUser() && (cueCardData?.docData?.userDocMap?.pitch_deck?.length > 0 || cueCardData?.docData?.userDocMap?.cap_table?.length > 0 || cueCardData?.docData?.userDocMap?.mis?.length > 0))) &&
                <div className={'cuecard-right-section w-full ' + (isMobileView() ? '' : 'max-width320') }>
                    {/* {
                        cueCardData?.activeDealCount > 0 &&
                        <CuecardActivity cuecardData={cueCardData} className="row-gap-24" />
                    } */}
                    {
                        isAuthenticated() && isBuyerUser() && Object.keys(cueCardData).length > 0 && (!cueCardData.dealStatus || getDealsStatus(DiSCOVERY_KEY) || getDealsStatus(PASS) || getDealsStatus(SHORTLIST)) &&
                        <div className='flex flex-direction-coloum row-gap-8'>
                            <div className='cue-card-actions express-interest-cta flex-direction-coloum ' onClick={() => handleAction(EXPRESS_INTEREST_KEY)}>
                                <div className='flex items-center'>
                                    <div className='text-white'>
                                        <div className='square-outline'>
                                            +
                                        </div>
                                    </div>
                                    <span className='margin-l12'>{'Express Interest'}</span>
                                </div>
                                {!isObjectEmpty(buyerParams) && !buyerParams?.dealLimitBypass && buyerParams?.totalInterestDealCount && <div className='margin-l12 text-12 text-B5B5B5'>{`${buyerParams?.interestDealCount}/${buyerParams?.totalInterestDealCount} deals used`}</div>}
                            </div>
                            <div className='cue-card-actions shortlist-cta' onClick={() => handleAction(getDealsStatus(SHORTLIST) ? DiSCOVERY_KEY : SHORTLIST)}>
                                <FavoriteBorderOutlinedIcon sx={{color: 'inherit'}}/>
                                <span className='margin-l12'>{getDealsStatus(SHORTLIST) ? 'Shortlisted' : 'Shortlist'}</span>
                            </div>
                            <div className='cue-card-actions pass-cta' onClick={() => handleAction(getDealsStatus(PASS) ? DiSCOVERY_KEY : PASS)}>
                                    <div className='square-outline'>
                                        -
                                    </div>
                                <span className='margin-l12'>{getDealsStatus(PASS) ? 'Passed' : 'Pass'}</span>
                            </div>
                            {/* Will add action in future */}
                            {/* <div className='cue-card-actions share-cta'>
                                <ShareOutlinedIcon sx={{color: '#667085'}}/>
                                <span className='margin-l12'>Share</span>
                            </div> */}
                        </div>
                    }
                    {
                        validateImportantDocument() &&
                        <CuecardPitchDeck cuecardData={cueCardData} handleDataroomView={handleDataroomView} />
                    }
                </div>
            }
            {
                !isAuthenticated() &&
                <div className={'cuecard-right-section w-full ' + (isMobileView() ? '' : 'max-width320') }>
                    <div className='cue-card-actions express-interest-cta ' onClick={() => navigate('/buyer/login')}>
                        <span>{'Login to access functionality'}</span>
                    </div>
                </div>
                
            }
        </React.Fragment>
    )
}

export default CuecardDefaultSection;