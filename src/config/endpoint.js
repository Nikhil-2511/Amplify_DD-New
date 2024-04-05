export const ENDPOINT = {
  LOGIN : {
    loginApiPath : () => 'user',
    adminUserAPi: () => `user/admin/query`,
    dealPartnerApi: () => `user/dealPartner`,
    linkedinApiPath: () => `linkedin`,
    updateUserEmail: () => `user/email`
  },
  LOGOUT: {
    logoutApiPath : () => `user/logout`
  },
  SIGNUP: {
    getPasscodeApi: () => `user/send/passcode`
  },
  QUESTION: {
    questionApi: () => `3F95H3/data`,
    prevQuesApi: () => `questionnaire/questions/previous`,
    nextQuesApi: () => `questionnaire/questions`,
    answerApi: () => `questionnaire/answers/submit`,
    initalQuesApi: () => `questionnaire/questions/start`,
    updateAnswerApi: () => `questionnaire/answers`
  },
  VALUATION: {
    getValuationApi: () => `company`,
    getMetricApi: () => `company/metrics`,
    companyAction: () => `company/action`,
  },
  DASHBOARD: {
    getDashboardApi: () => `company`,
    evalutaionApi: () => `company/metrics/evaluate`,
    userFetchAPi: (uid, type) => `user/details/fetch${type ? `?type=${type}` : ''}${uid ? `&uid=${uid}` : ''}`,
    updateContactInfoApi: () => `user/details/save`,
    unregisteredCompany: (page, size, searchString) => `company/unregistered?page=${page}&size=${size}${searchString ? (`&searchString=${searchString}`) : ''}`,
    engagementLetter: (latest)=>`user/tncDoc/fetch${latest ? `?latest=true` : ``}`
  },
  CUECARD: {
    captureViewApi: () => `company/cue/card/capture/view`,
    captureInterestApi: () => `company/cue/card/capture/interest`,
    shareCueCardApi: () => `company/cue/card/share`,
    getCuecardApi: () => `company/cue/card`,
    cueCardUpdate: () => `company/cue/card/update`,
    openCueCardApi: (id) => `company/cue/card/link/get?cueCardId=${id}`,
    cueCardLinkCreate: () => `company/cue/card/link/create`
  },
  ADMIN: {
    listingPageApi: () => `company/query`
  },
  LOI: {
    getLoiApi: (id) => `company/loi/fetch${id ? `?companyId=${id}` : ''}`,
    updateLoiApi: () => `company/loi/update`,
    createLoiApi: () => `company/loi/create`
  },
  SELLERLISTING: {
    getSellerListApi: (page, size) => `company/query?page=${page}&size=${size}`,
    updateInterestApi: () => `deal/capture/interest`,
    verifySellerApi: () => `company/verify`,
    verifyReSignElApi: () => `user/tnc/verify`
  },
  BUYERS: {
    getBuyerListApi: (page, size, searchString) => `buyer/query?page=${page}&size=${size}${searchString ? (`&searchString=${searchString}`) : ''}`,
    buyerProfileApi: (uid) => `buyer/getBuyer${uid ? `?uid=${uid}` : ''}`,
    getCompanyInterested: (buyerId, page, size) => `deal/interested/companies?buyerId=${buyerId}&page=${page}&size=${size}`,
    updateBuyer: () => `buyer/updateBuyer`,
    getActiveDeals: (id) => `deal/interests?Id=${id}`,
    createBuyerApi: () => `buyer/createBuyer`,
    verifyBuyerAPi: () => `buyer/verify`,
    buyerStatus: () => `buyer/status`,
    buyerListing: (page, size, searchString) => `buyer/browse?page=${page}&size=${size}${searchString ? (`&searchString=${searchString}`) : ''}`,
    getBuyersFilter: () => `buyer/filter/fetch`,
    getFilterApi: () => `buyer/filter/fetch`,
    fetchAvailableTimeSlots: () => `meeting/slots/buyer`,
    bookSlots: () => `meeting/book/slots/buyer`
  },
  MANDATES: {
    getMandateAPi: (page, size) => `mandate/query?page=${page}&size=${size}`,
    createMandate: () => `mandate/createMandate`,
    getMandateDetailsAPi: (uid) => `mandate/getMandate${uid? `?uid=${uid}` : ''}`,
    updateMandate:()=>`mandate/updateMandate`
  },
  DEALS: {
    getBuyerDealsApi: (page, size) => `deal/query?page=${page}&size=${size}`,
    updateDealActionApi: () => `deal`,
    getDealCount: () => `deal/count`
  },
  TNC: {
    tncPdfFetchApi: (userType) =>  `user/tncDoc/fetch?userType=${userType}`,
    updateTnc: () => `user/tnc/update`
  },
  NOTES: {
    getNotesQueryAPi: (page, size) => `note/query?page=${page}&size=${size}`,
    createNoteApi: () => `note/createNote`,
    updateNoteApi: () => `note/updateNote`,
    getNote: () => `note/getNote`,
    getLatestNote: () => `note/one/criteria`

  },
  ACTIVITY: {
    getActivityApi: (page, size) => `audit/query?page=${page}&size=${size}`
  },
  MATCHING: {
    action: () => `matching/action`,
    refresh: ()=> `matching/refresh`,
    query: (page, size) => `matching/query?page=${page}&size=${size}`,
    create: () => `matching/create`,
    get: () => `matching/get`,
    queryText: (page, size, searchString) => `matching/query/text?page=${page}&size=${size}${searchString ? (`&searchString=${searchString}`) : ''}`,
    scrappedText: (page, size) => `matching/query/scrapped/text?page=${page}&size=${size}`
  },
  REMINDER: {
    query: (page, size) => `reminder/query?page=${page}&size=${size}`,
  },
  SCHEDULED_CALLS: {
    getScheduledCalls: (page, size) => `meeting/query?page=${page}&size=${size}`,
  },
  DOCUMENT: {
    get: (docType) => `document/get${docType ? (`?docType=${docType}`) : ''}`,
    upload: () => `document/user/upload`,
    download: () => `document/user/download`,
    validate: () => `document/user/validate`,
    query: () => `document/query`,
    dealShare: () => `document/deal/share`,
    removeAccess: () => `document/deal/revoke`,
    appDownload: () => `document/app/download`
  },
  BUYERPARAMS: {
    getParams: () => `buyer/params`,
    updateSpecialParams: () => `buyer/specialParams`,
  },
  MEETING: {
    sellerSlot: () => `meeting/slots/seller`
  },
  USER: {
    buyerEmailVerify: (email) => `user/emailCheck?email=${email}`,
    getUserDetails: (email= '') => `buyer/get/email?email=${email}`
  },
  SELLER: {
    createCompany: () => `company/createCompany`,
    analyticsSummary: () => `ga/oauth`,
    analyticsData: () => `ga/data`,
    summary: () => `ga/account/summary`
  }
};