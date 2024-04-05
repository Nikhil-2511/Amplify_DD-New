import { Chip, Stack } from "@mui/material";
import { AllDealsArr, SubStatuses } from "../../../CommonModels/CommonCollection";
import { getAppBaseUrl, getAuthBasedUrl, getDate, getValueFromArr, handleCopyContent, isOverDue, renderIconBasedOnDeals, statusMap } from "../../../helper/commonHelper";
import DealAction from "./DealAction";
import store from "../../../Redux";
import { RUPEE_SYMBOL } from "../../../constants";
import moment from "moment";
import ReminderAction from "./ReminderAction";
import InfoIcon from '../../../assets/images/infoIcon.svg'
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Padding } from "@mui/icons-material";
import CustomPopover from "../../../CommonComponent/CustomPopover";
import copyContentIcon from '../../../assets/images/contentCopyIcon.svg';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { showNoteViewModal } from "../../../Redux/slice/CommonSlice";

export function AdminDefaultDealsTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Deal ID',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Buyer',
                    sx: {width: '10%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Seller',
                    sx: {width: '10%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Buy Owner',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Sell Owner',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Revenue(${RUPEE_SYMBOL} crores)`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Status',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Last Activity',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Deal Created on',
                    sx: {},
                    className: '',
                    style: {}
                },
                // {
                //     label: 'Notes',
                //     sx: {},
                //     className: '',
                //     style: {}
                // },
                {
                    label: 'Actions',
                    sx: {},
                    className: '',
                    style: {}
                },
            ],
            tableContent: [
                {
                    key: 'id',
                    hasCustomData: true
                },
                {
                    key: 'buyerName'
                },
                { 
                    key: 'sellerName',
                    hasCustomData: true
                },
                { 
                    key: 'buySideOwner',
                },
                { 
                    key: 'sellSideOwner',
                },
                { 
                    key: 'ttmRevenue',
                    hasCurrency: true
                },
                { 
                    key: 'status',
                },
                { 
                    key: 'updatedAt',
                },
                { 
                    key: 'createdAt',
                },
                // { 
                //     key: 'notes',
                // },
                { 
                    key: 'dealAction',
                },
            ]
        }
    )
}


export function AdminReminderTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Deal ID',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Buyer',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Seller',
                    // sx: {width: '40%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Action',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Revenue(${RUPEE_SYMBOL} crores)`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Due Date',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Status',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Actions',
                    sx: {},
                    className: '',
                    style: {}
                },
            ],
            tableContent: [
                {
                    key: 'id',
                    hasCustomData: true
                },
                {
                    key: 'buyerName'
                },
                { 
                    key: 'sellerName',
                    hasCustomData: true
                },
                { 
                    key: 'reminderTitle',
                },
                { 
                    key: 'ttmRevenue',
                    hasCurrency: true
                },
                { 
                    key: 'dueDate',
                },
                { 
                    key: 'reminderStatus',
                },
                { 
                    key: 'reminderAction',
                },
            ]
        }
    )
}

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      padding: '10px',
    },
  }));

  function handleShowNotes(noteData) {
    store.dispatch(showNoteViewModal({isOpen: true, notesData: noteData, redirectUrl: '/admin/deal-notes/'}));
  }

export function AdminUpdateDealsModel(dataResponse, handleRefresh) {
    let buyerName = (
        <div className="flex align-center">
            <Stack direction={'column'} >
                <span className="text-667085 font-500 text-14">{dataResponse?.buyerName || ''}</span>
                <span className="text-2E90FA">
                    <a href={`${getAuthBasedUrl()}buyer/profile-page/${dataResponse.buyerUid}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`B${dataResponse?.buyerId}`}</a>
                </span>
            </Stack>
            {
                dataResponse?.investorNote &&
                <CommentOutlinedIcon sx={{cursor: 'pointer'}} onClick={() => handleShowNotes(dataResponse?.investorNote)} />
            }
        </div>
    );

    let sellerName = (
      <Stack direction={"column"}>
        <div className="">
          <span className="text-667085 font-500 text-14">
            {dataResponse?.sellerName || ""}
          </span>
          <div className="flex align-center">
            <span className="text-2E90FA">
              <a
                href={`${getAppBaseUrl()}admin-user/dashboard/${
                  dataResponse.companyId
                }`}
                rel="noreferrer"
                target="_blank"
                className="text-2E90FA font-500"
              >{`S${dataResponse?.sellerId}`}</a>
            </span>
            {dataResponse.sellerPhone && (
              <BootstrapTooltip
                title={dataResponse.sellerPhone}
                placement="top"
              >
                <img className="w-[15px] h-[15px] ml-1" src={InfoIcon} width="15px" height="15px" />
              </BootstrapTooltip>
            )}
          </div>
        </div>

        {/* <div className="text-667085 font-600 text-14">{`${dataResponse?.category || ''} ${dataResponse?.subCategory || ''} ${dataResponse?.othersSubCategory || ''}`}</div> */}
      </Stack>
    );

    // Will use in future 
    /* let description = (
        <Stack direction={'column'} >
        <div className="text-14">
            <span className="margin-l8 text-black">{`S${dataResponse?.id}`}</span>
        </div>
        <div className="text-667085 text-14"><span className="font-600">{dataResponse?.sellerDescription}</span><span>{dataResponse?.subCategory}</span> </div>
    </Stack>
    ) */
    let dealStatusValue = `${getValueFromArr(dataResponse.dealStatus, AllDealsArr)}`;
    if(dataResponse?.subStatus) {
        dealStatusValue += ` > ${SubStatuses[dataResponse?.subStatus]}`;
    }

    if(dataResponse?.dealStatus === 'on_hold') {
        dealStatusValue = `${getValueFromArr(dataResponse.preHoldStatus, AllDealsArr)} > On Hold`
    }
    let trimValue = dealStatusValue;
    if(dealStatusValue?.length > 35) trimValue = `${dealStatusValue.substring(0, 30)}...`;
    let status = (dealStatusValue ? 
            <BootstrapTooltip
                title={dealStatusValue}
                placement="top"
            >
                <Chip label={trimValue} />
            </BootstrapTooltip> 
            : '');
    let dealId = (
        <span className="text-2E90FA flex col-gap-8">
            <a href={`${getAuthBasedUrl()}cue-card/${dataResponse.companyId}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`D${dataResponse?.id}`}</a>
            {renderIconBasedOnDeals(dataResponse?.objective)}
        </span>
    )

    let notes = (
        <div className={`custom-chip bg-ECFDF3`}>
            <a href={getAuthBasedUrl() + `deal-notes/${dataResponse.id}`} rel="noreferrer" target="_blank" className="text-12 font-500" style={{color: '#027A48'}}>
                View
            </a>
        </div>
    )
    return {
        'id': dealId,
        'buyerName': buyerName,
        'sellerName': sellerName,
        // 'description': dataResponse.sellerDescription,
        'ttmRevenue': dataResponse?.ttmRevenue,
        // 'ebitda': dataResponse.ebitda === 'yes' ? EBITDA_POSITIVE : EBIDTA_NEGATIVE,
        // 'askPrice': dataResponse.askPrice || 'TBD',
        'buySideOwner': getValueFromArr(dataResponse?.buySideOwner, (store.getState()?.authorizationStore?.adminUsersList || [])),
        'sellSideOwner': getValueFromArr(dataResponse?.sellSideOwner, (store.getState()?.authorizationStore?.adminUsersList || [])),
        'createdAt' : getDate(dataResponse.createdAt),
        'status': status,
        'updatedAt': getDate(dataResponse.updatedAt),
        'dealAction': <DealAction actionData={dataResponse} handleRefresh={handleRefresh}  />,
        // 'notes': notes
    }
}


export function AdminUpdateReminderModel(dataResponse, handleRefresh) {
    let reminderStatus = statusMap(dataResponse?.reminderState,  dataResponse?.reminderDate);
    let buyerName = (<Stack direction={'column'} >
        <span className="text-667085 font-500 text-14">{dataResponse?.primaryData?.buyerName || ''}</span>
        <span className="text-2E90FA">
            <a href={`${getAuthBasedUrl()}buyer/profile-page/${dataResponse?.primaryData?.buyerUid}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`B${dataResponse?.primaryData?.buyerId}`}</a>
        </span>
    </Stack>);

    let sellerName = (<Stack direction={'column'} >
        <span className="text-667085 font-500 text-14">{dataResponse?.primaryData?.sellerName || ''}</span>
        <span className="text-2E90FA">
            <a href={`${getAppBaseUrl()}admin-user/dashboard/${dataResponse?.primaryData?.companyId}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`S${dataResponse?.primaryData?.sellerId}`}</a>
        </span>
    </Stack>);

    let status = (
        dataResponse?.reminderDate ? <Chip label={reminderStatus?.label} sx={{background: reminderStatus.bg, color: reminderStatus?.color, fontWeight: 500}} /> : ''
    )
    let dealId = (
        <span className="text-2E90FA">
            <a href={`${getAuthBasedUrl()}cue-card/${dataResponse?.primaryData?.companyId}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`D${dataResponse?.primaryData?.id}`}</a>
        </span>
    )

    return {
        'id': dealId,
        'buyerName': buyerName,
        'sellerName': sellerName,
        'reminderTitle': dataResponse.title,
        'ttmRevenue': dataResponse?.primaryData?.ttmRevenue,
        'dueDate': getDate(dataResponse.reminderDate),
        'reminderStatus': status,
        'reminderAction': <ReminderAction actionData={dataResponse} handleRefresh={handleRefresh}  />,
    }
}

export function AdminScheduledCallsTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Deal ID',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Buyer',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Seller',
                    // sx: {width: '40%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Buy Owner',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Status`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Meeting Timestamp',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Meeting Link',
                    sx: {},
                    className: '',
                    style: {}
                },
            ],
            tableContent: [
                {
                    key: 'id',
                    hasCustomData: true
                },
                {
                    key: 'buyerName'
                },
                { 
                    key: 'sellerName',
                    hasCustomData: true
                },
                { 
                    key: 'callBuyOwner',
                },
                { 
                    key: 'callStatus',
                    hasCurrency: true
                },
                { 
                    key: 'callTimestamp',
                },
                { 
                    key: 'callLink',
                },
            ]
        }
    )
}

export function AdminUpdateScheduledCallsModel(dataResponse, handleRefresh) {
    let buyerName = (<Stack direction={'column'} >
        <span className="text-667085 font-500 text-14">{dataResponse?.deal?.buyerName || ''}</span>
        <span className="text-2E90FA">
            <a href={`${getAuthBasedUrl()}buyer/profile-page/${dataResponse?.deal?.buyerUid}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`B${dataResponse?.deal?.buyerId}`}</a>
        </span>
    </Stack>);

    let sellerName = (<Stack direction={'column'} >
        <span className="text-667085 font-500 text-14">{dataResponse?.deal?.sellerName || ''}</span>
        <span className="text-2E90FA">
            <a href={`${getAppBaseUrl()}admin-user/dashboard/${dataResponse?.deal?.companyId}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`S${dataResponse?.deal?.sellerId}`}</a>
        </span>
    </Stack>);

    let dealStatusValue = `${getValueFromArr(dataResponse?.deal?.dealStatus, AllDealsArr)}`;
    if (dataResponse?.subStatus) {
        dealStatusValue += ` > ${SubStatuses[dataResponse?.subStatus]}`;
    }

    if (dataResponse?.dealStatus === 'on_hold') {
        dealStatusValue = `${getValueFromArr(dataResponse.preHoldStatus, AllDealsArr)} > On Hold`
    }
    let trimValue = dealStatusValue;
    if (dealStatusValue?.length > 35) trimValue = `${dealStatusValue.substring(0, 30)}...`;
    let status = (dealStatusValue ?
        <BootstrapTooltip
            title={dealStatusValue}
            placement="top"
        >
            <Chip label={trimValue} />
        </BootstrapTooltip>
        : '');
    let dealId = (
        <span className="text-2E90FA">
            <a href={`${getAuthBasedUrl()}cue-card/${dataResponse?.deal?.companyId}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`D${dataResponse?.dealId}`}</a>
        </span>
    );
    let meetingLink = (
     <div className="flex items-center">
        <span className="!w-[15rem] !min-w-[50px] overflow-hidden whitespace-nowrap text-ellipsis">{dataResponse?.hangoutLink}</span>
        <BootstrapTooltip
            title='Copy Link'
            placement="top"
        >
            <img onClick={() => handleCopyContent(dataResponse?.hangoutLink, 'Meeting Link')} className="w-5 h-10 cursor-pointer ml-3" src={copyContentIcon} alt=""/>
        </BootstrapTooltip>
     </div>
    );

    return {
        'id': dealId,
        'buyerName': buyerName,
        'sellerName': sellerName,
        'callBuyOwner': getValueFromArr(dataResponse?.deal?.buySideOwner, (store.getState()?.authorizationStore?.adminUsersList || [])),
        'callTimestamp': dataResponse.scheduledDateTime,
        'callStatus': status,
        'callLink': meetingLink,
    }
}