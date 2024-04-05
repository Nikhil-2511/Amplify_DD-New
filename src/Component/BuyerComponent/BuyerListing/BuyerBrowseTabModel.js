import GlobeBlueIcon from '../../../assets/images/globeBlueIcon.svg';
import GlobeGreyIcon from '../../../assets/images/globeGreyIcon.svg';
import RecommendedBlueIcon from '../../../assets/images/RecommendStarBlue.svg';
import RecommendedGreyIcon from '../../../assets/images/RecommendStarGrey.svg';
import PreferenceBlue from '../../../assets/images/preferenceBlue.svg';
import PreferenceGrey from '../../../assets/images/preferenceGrey.svg';
import HeartBlueIcon from '../../../assets/images/heartBlueIcon.svg';
import HeartGreyIcon from '../../../assets/images/heartGreyIcon.svg';
import { RECOMMENDED, SHORTLIST } from '../../../constants';

export const BrowseAllTab = {
    activeIcon: GlobeBlueIcon,
    inActiveIcon: GlobeGreyIcon,
    label: 'All',
    // hideOnMobile: true,
    hasFilters: true,
    noResultHeading: "No Matching Companies",
    norResultSubheading:'Adjust your filters or create a mandate for specific M&A needs.'
}

export const BrowseRecommendedTab = {
    activeIcon: RecommendedBlueIcon,
    inActiveIcon: RecommendedGreyIcon,
    label: RECOMMENDED,
    key: 'specialFlag',
    value: 'recommended',
    noResultHeading: "No Recommendations",
    norResultSubheading:'Check back later for recommendations or contact your deal partner.'
}

export const BrowseShortListTab = {
    activeIcon: HeartBlueIcon,
    inActiveIcon: HeartGreyIcon,
    label: 'Shortlisted',
    key: 'specialFlag',
    value: 'shortlisted',
    noResultHeading: "No shortlists yet",
    norResultSubheading: "To add a company to your shortlist for future reference, simply click on the heart icon next to the company's name while browsing companies. Alternatively, you can click the 'Shortlist' button when viewing a seller's listing."   
}


export function BrowseTabModel() {
    return (
        [
            { ...BrowseAllTab },
            { ...BrowseRecommendedTab },
            { ...BrowseShortListTab }
        ]
    )
}