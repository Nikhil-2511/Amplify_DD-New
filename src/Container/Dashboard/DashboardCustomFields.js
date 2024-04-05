import { ArrowForward } from '@mui/icons-material'
import { NewButton } from '../../CommonComponent/NewCustomButton'
import analyticsIcon from '../../assets/images/analyticsIcon.svg'
import { GASignupModel } from '../../SocialLoginModel';
import { trackEvent } from '../../helper/posthogHelper';
import { SELLER_CLICKED_CONNNECT_GA, SELLER_CLICKED_VIEW_GA } from '../../constants/posthogEvents';

function prepareLink(socialLink) {    
    let {externalLink, clientID, redirectUri, accessType, scope, responseType, prompt} = socialLink;
    return `${externalLink}?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scope}&access_type=${accessType}&response_type=${responseType}&prompt=${prompt}`;
  }

  const analyticsCardText = {
    'connected' : {
        'header' : 'Explore Key Metrics Now',
        'body' : 'Discover valuable insights into your business performance through key metrics exploration'
    },
    'disconnected' : {
        'header' : 'Connect Google Analytics to get started',
        'body' : 'Metrics helps increase trust with buyers and helps answer initial questions to save your time'
    }
  }

export function GADashBoardField(summaryData){
    
    function handleConnectClick(){
        if(summaryData?.profileId){
         trackEvent(SELLER_CLICKED_VIEW_GA);
        }else{
         trackEvent(SELLER_CLICKED_CONNNECT_GA);
        }
    }

    return (
        <div className='flex flex-col items-center my-3 border-[1px] border-[#353535] p-5 rounded-[12px] bg-[#2d2e30]'>
            <div className='header flex justify-center items-center'>
             <img className='w-10 h-5' src={analyticsIcon} alt=''/>
             <span className='font-bold'>{summaryData?.profileId ? analyticsCardText.connected.header : analyticsCardText.disconnected.header}</span>
            </div>
            <div className='body my-3 font-[300] text-[14px] text-center'>
            {summaryData?.profileId ? analyticsCardText.connected.body : analyticsCardText.disconnected.body}
            </div>

            <NewButton onClick={handleConnectClick} className='text-white capitalize !shadow-none font-[500]' color='secondary' sx={{background: '#121212', color: '#B5B5B5', border: "1px solid"}}>
               {summaryData?.profileId ? <a href={`/analytics`}>Check your Analytics {<ArrowForward className='ml-3'/>}</a>  : <a href={prepareLink(GASignupModel())}>Connect Analytics {<ArrowForward className='ml-3'/>}</a> }
            </NewButton>
        </div>
    )
}