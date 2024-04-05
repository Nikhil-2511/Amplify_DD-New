export const filters = {
  "industry" : {
    label: "Industry",
    type: 'industry',
    data: [
      {label: 'D2C', isAcive: false},
      {label: 'Fintech', isAcive: false},
      {label: 'Marketplace', isAcive: false},
      {label: 'Gaming', isAcive: false},
      {label: 'SaaS', isAcive: false},
      {label: 'Edtech', isAcive: false},
      {label: 'Agency', isAcive: false},
      {label: 'Others', isAcive: false},
    ],
  },
  "status": {
    label: 'Status',
    type: 'status',
    data: [{label: 'Active', isAcive: false}, {label: 'Passive', isActive: false}]
  }
}