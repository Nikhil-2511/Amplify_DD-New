import DownloadGreyIcon from '../../assets/images/downloadGreyIcon.svg';
import DownloadBlueIcon from '../../assets/images/downloadBlueIcon.svg';
import CompanyBlueIcon from '../../assets/images/companyBlueIcon.svg';
import CompanyGreyIcon from '../../assets/images/companyGreyIcon.svg';
import { DATAROOM_KEY } from '../../constants/keyVariableConstants';

export function newCueCardTabModel() {
    return (
        [
            {
                activeIcon: CompanyBlueIcon,
                inActiveIcon: CompanyGreyIcon,
                label: 'Company  Details',
            },
            {
                activeIcon: DownloadBlueIcon,
                inActiveIcon: DownloadGreyIcon,
                label: 'Data Room',
                key: DATAROOM_KEY
            },
        ]
    )
}