export function offPlatformSellerTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Seller',
                    sx: {width: '20%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'LinkedIn Description',
                    sx: {width: '25%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Email',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Founder Name`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Team Size',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Industry`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Investors',
                    sx: {},
                    className: '',
                    style: {}
                },
            ],
            tableContent: [
                {
                    key: 'seller',
                },
                {
                    key: 'linkedinDescription',
                },
                { 
                    key: 'email',
                },
                { 
                    key: 'founderName',
                },
                { 
                    key: 'teamSize',
                },
                { 
                    key: 'industry',
                },
                { 
                    key: 'investor',
                },
            ]
        }
    )
}


export function offPlatformSellerUpdateModel({dataResponse}) {
    let seller = (
        <div>
            <span className="text-2E90FA">
                {/* <a href={`${getAppBaseUrl()}admin-user/dashboard/${dataResponse.companyId}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`${dataResponse?.name || ''} - ${dataResponse?.legalName || ''}`}</a> */}
                <span className="margin-l8 text-667085">{`${dataResponse?.name || ''} - ${dataResponse?.legalName || ''}`}</span>
            </span>
        </div>
    )
    return {
        'seller': seller,
        'linkedinDescription': dataResponse?.about,
        'email': dataResponse?.email,
        'founderName': dataResponse?.founders,
        'teamSize': dataResponse?.teamSize,
        'industry': dataResponse?.category, 
        'investor': dataResponse?.vc,
    }
}

export function offPlatformBuyerTableModel() {
    return (
        {
            headers: [
                {
                    label: 'Buyer',
                    sx: {width: '20%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'LinkedIn Description',
                    sx: {width: '25%'},
                    className: '',
                    style: {}
                },
                {
                    label: 'Email',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Founder Name`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Team Size',
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: `Industry`,
                    sx: {},
                    className: '',
                    style: {}
                },
                {
                    label: 'Investors',
                    sx: {},
                    className: '',
                    style: {}
                },
            ],
            tableContent: [
                {
                    key: 'seller',
                },
                {
                    key: 'linkedinDescription',
                },
                { 
                    key: 'email',
                },
                { 
                    key: 'founderName',
                },
                { 
                    key: 'teamSize',
                },
                { 
                    key: 'industry',
                },
                { 
                    key: 'investor',
                },
            ]
        }
    )
}


export function offPlatformBuyerUpdateModel({dataResponse}) {
    let seller = (
        <div>
            <span className="text-2E90FA">
                {/* <a href={`${getAppBaseUrl()}admin-user/dashboard/${dataResponse.companyId}`} rel="noreferrer" target="_blank" className="text-2E90FA font-500">{`${dataResponse?.name || ''} - ${dataResponse?.legalName || ''}`}</a> */}
                <span className="margin-l8 text-667085">{`${dataResponse?.name || ''} - ${dataResponse?.legalName || ''}`}</span>
            </span>
        </div>
    )
    return {
        'seller': seller,
        'linkedinDescription': dataResponse?.about,
        'email': dataResponse?.email,
        'founderName': dataResponse?.founders,
        'teamSize': dataResponse?.teamSize,
        'industry': dataResponse?.category, 
        'investor': dataResponse?.vc,
    }
}