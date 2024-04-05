import PaperclipBlueIcon from '../../assets/images/paperclipBlueIcon.svg';
import PaperclipGreyIcon from '../../assets/images/paperclipGreyIcon.svg';
import AnnotationBlue from '../../assets/images/annotation-dots-blue.svg';
import AnnotationGrey from '../../assets/images/annotation-dots-grey.svg';
import ActivityBlueIcon from '../../assets/images/activityBlueIcon.svg'
import ActivityGreyIcon from '../../assets/images/activityGreyIcon.svg';
import RecommendStarBlue from '../../assets/images/RecommendStarBlue.svg';
import RecommendStarGrey from '../../assets/images/RecommendStarGrey.svg';
import { ENDPOINT } from '../../config/endpoint';

function prepareTabDefaultFilter(noteType, uid) {
    return (
        {
            noteIdType: noteType, 
            primaryid: uid
        }
    )
}

export function SellerNotesTabModel() {
    return (
        [

            {
                customComponent: true,
                activeIcon: AnnotationBlue,
                inActiveIcon: AnnotationGrey,
                label: 'Cue card',
            },
            {
                customComponent: true,
                activeIcon: PaperclipBlueIcon,
                inActiveIcon: PaperclipGreyIcon,
                label: 'Notes',
            },
            {
                customComponent: true,
                activeIcon: RecommendStarBlue,
                inActiveIcon: RecommendStarGrey,
                label: 'Recommended Buyers',
            },
            {
                customComponent: true,
                activeIcon: ActivityBlueIcon,
                inActiveIcon: ActivityGreyIcon,
                label: 'Activity',
            },
        ]
    )
}


export function RecommendedSellertListingTabData() {
    return (
        [
            {
                label: 'Search by Buyer Name',
                url: ENDPOINT.MATCHING.queryText,
                searchPlaceholder: 'Enter buyer name and click ‘Enter’',
                searchType: 'name'
            },
            {
                label: 'Search Buyer by Keyword',
                url: ENDPOINT.MATCHING.queryText,
                searchPlaceholder: "Search for buyer by entering a keyword and hitting 'Enter",
                searchType: 'text'
            },
        ]
    )
}