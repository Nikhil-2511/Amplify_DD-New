import { Chip, Stack } from "@mui/material";
import CustomBuyerMemberApproveAction from "../../../../Component/CustomBuyerMemberApproveAction";
import { getAppBaseUrl, getAuthBasedUrl, getDate } from "../../../../helper/commonHelper";

export function AdminSubBuyersTableModel() {
    return (
        {
            headers: [
                {
                    label: 'User',
                    sx: {width: '30%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Email ID',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Phone',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Onboarded at`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Approval',
                    sx: {},
                    className: '',
                    style: {}
                }
            ],
            tableContent: [
                {
                    key: 'pocName',
                },
                {
                    key: 'email',
                },
                { 
                    key: 'phone',
                },
                { 
                    key: 'createdAt',
                },
                { 
                    key: 'action',
                }
            ]
        }
    )
}

export function updateUserTableModel(dataResponse) {
    let pocDetails = (<Stack direction={'column'} >
        <div className="text-14">
            <div className="text-667085 text-14">
                <span className="text-667085 font-600">{dataResponse?.pocName}</span>
                {dataResponse?.primaryMember && <Chip  sx={{padding: '2px 5px', background: '#F9F5FF', height: '22px', color: '#6941C6', fontWeight: 500, fontSize: '12px'}} label={`Primary`} />}
            </div>
            <span className="text-2E90FA">
                <a href={`${getAuthBasedUrl()}buyer/profile-page/${dataResponse.uid}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`${dataResponse?.id}`}</a>
            </span>
        </div>
    </Stack>);


 return {
    pocName: pocDetails,
    email: dataResponse?.email || '',
    phone: dataResponse?.phone || '',
    createdAt: getDate(dataResponse?.createdAt),
    action: <CustomBuyerMemberApproveAction dataResponse={dataResponse} />
 }
}