import { customerIcon, financialIcon, teamIcon } from "../../assets/icons/svgIcons";

export const cuecardD2C = {
  "financialData": {
    "label": "Financial Data",
    "type": "four_col",
    "icon": financialIcon,
    "subSection": [
      {
        "label": "Monthly net revenue(₹)",
        "qk_key": "currentNet",
        "field_type": 'currency'
      },
      {
        "label": "MoM Growth(%)",
        "qk_key": "momGrowth"
      },
      {
        "label": "Gross Margin(%)",
        "qk_key": "grossMargins"
      },
      {
        "label": "EBITDA positive",
        "qk_key": "ebitda"
      },
    ]
  },
  "customerData": {
    "label": "Customer Data",
    "type": "three_col",
    "icon": customerIcon,
    "subSection": [
      {
        "label": "Total Paying Customers",
        "qk_key": "totalPaying"
      },
      {
        "label": "Repeat Customer rate(%)",
        "qk_key": "repeatCustomers"

      },
      {
        "label": "Amazon Rating",
        "qk_key": "amazonRating"
      }
    ]
  },
  "teamData": {
    "label": "Team data",
    "type": "two_col",
    "icon": teamIcon,
    "subSection": [
      {
        "label": "Team size",
        "qk_key": "teamSize"

      },
      {
        "label": "Founder pedigree",
        "qk_key": "founderPedigree"
      },
    ]
  }
}

export const cuecardSaaS = {
  "financialData": {
    "label": "Financial Data",
    "type": "four_col",
    "icon": financialIcon,
    "subSection": [
      {
        "label": "TTM Revenue (₹)",
        "qk_key": "ttmRevenue",
        "field_type": 'currency'
      },
      {
        "label": "Monthly net revenue(₹)",
        "qk_key": "currentRevenue",
        "field_type": 'currency'
      },
      {
        "label": "YoY Growth(%)",
        "qk_key": "yoyGrowth"
      },
      {
        "label": "Gross Margin(%)",
        "qk_key": "grossMargins"
      }
    ]
  },
  "customerData": {
    "label": "Customer Data",
    "type": "three_col",
    "icon": customerIcon,
    "subSection": [
      {
        "label": "Total Customers",
        "qk_key": "totalCustomers"
      },
      {
        "label": "CAC Payback in months",
        "qk_key": "cacPayback"

      },
      {
        "label": "NPS score",
        "qk_key": "nps"
      }
    ]
  },
  "teamData": {
    "label": "Team data",
    "type": "two_col",
    "icon": teamIcon,
    "subSection": [
      {
        "label": "Team size",
        "qk_key": "teamSize"

      },
      {
        "label": "Founder pedigree",
        "qk_key": "founderPedigree"
      },
    ]
  }
}


export const cuecardMarketPlace = {
  "financialData": {
    "label": "Financial Data",
    "type": "four_col",
    "icon": financialIcon,
    "subSection": [
      {
        "label": "TTM GMV(₹)",
        "qk_key": "ttmGmv",
        "field_type": 'currency'
      },
      {
        "label": "TTM Revenue (₹)",
        "qk_key": "ttmNet",
        "field_type": 'currency'
      },
      {
        "label": "Gross Margin(%)",
        "qk_key": "grossMargins"
      },
      {
        "label": "MoM growth",
        "qk_key": "momGrowth"
      }
    ]
  },
  "customerData": {
    "label": "Customer Data",
    "type": "three_col",
    "icon": customerIcon,
    "subSection": [
      {
        "label": "Repeat Customer(%)",
        "qk_key": "repeatCustomers"
      },
      {
        "label": "CM1",
        "qk_key": "cm1"

      },
      {
        "label": "LTV : CAC ratio",
        "qk_key": "ltvbycac"
      }
    ]
  },
  "teamData": {
    "label": "Team data",
    "type": "two_col",
    "icon": teamIcon,
    "subSection": [
      {
        "label": "Team size",
        "qk_key": "teamSize"

      },
      {
        "label": "Founder pedigree",
        "qk_key": "founderPedigree"
      },
    ]
  }
}

export const cuecardFintech = {
  "financialData": {
    "label": "Financial Data",
    "type": "three_col",
    "icon": financialIcon,
    "subSection": [
      {
        "label": "TTM Revenue (₹)",
        "qk_key": "ttmRevenue",
        "field_type": 'currency'
      },
      {
        "label": "Gross Margin(%)",
        "qk_key": "grossMargins"
      },
      {
        "label": "MoM growth",
        "qk_key": "momGrowth"
      }
    ]
  },
  "customerData": {
    "label": "Customer Data",
    "type": "four_col",
    "icon": customerIcon,
    "subSection": [
      {
        "label": "Total Customers",
        "qk_key": "totalCustomers"
      },
      {
        "label": "Customers Retention(%)",
        "qk_key": "customerRetention"

      },
      {
        "label": "CAC (₹)",
        "qk_key": "cac",
        "field_type": 'currency'
      },
      {
        "label": "RoAS",
        "qk_key": "roas"
      }
    ]
  },
  "teamData": {
    "label": "Team data",
    "type": "two_col",
    "icon": teamIcon,
    "subSection": [
      {
        "label": "Team size",
        "qk_key": "teamSize"

      },
      {
        "label": "Founder pedigree",
        "qk_key": "founderPedigree"
      },
    ]
  }
}

export const cuecardGaming = {
  "financialData": {
    "label": "Financial Data",
    "type": "four_col",
    "icon": financialIcon,
    "subSection": [
      {
        "label": "TTM Revenue (₹)",
        "qk_key": "ttmNet",
        "field_type": 'currency'
      },
      {
        "label": "Gross Margin(%)",
        "qk_key": "grossMargins"
      },
      {
        "label": "EBITDA(+)",
        "qk_key": "ebitda"
      },
      {
        "label": "MoM growth",
        "qk_key": "momGrowth"
      }
    ]
  },
  "customerData": {
    "label": "Customer Data",
    "type": "three_col",
    "icon": customerIcon,
    "subSection": [
      {
        "label": "No. of Downloads",
        "qk_key": "downloads"
      },
      {
        "label": "Monthly active users",
        "qk_key": "mau"

      },
      {
        "label": "RoAS",
        "qk_key": "roas"
      }
    ]
  },
  "teamData": {
    "label": "Team data",
    "type": "two_col",
    "icon": teamIcon,
    "subSection": [
      {
        "label": "Team size",
        "qk_key": "teamSize"

      },
      {
        "label": "Founder pedigree",
        "qk_key": "founderPedigree"
      },
    ]
  }
}


export const cuecardGenric = {
  "financialData": {
    "label": "Financial Data",
    "type": "four_col",
    "icon": financialIcon,
    "subSection": [
      {
        "label": "TTM Revenue (₹)",
        "qk_key": "ttmNet",
        "field_type": 'currency'
      },
      {
        "label": "Monthly Revenue(₹)",
        "qk_key": "currentNet",
        "field_type": 'currency'
      },
      {
        "label": "Gross Margin(%)",
        "qk_key": "grossMargins"
      },
      {
        "label": "EBITDA(+)",
        "qk_key": "ebitda"
      }
    ]
  },
  "customerData": {
    "label": "Customer Data",
    "type": "four_col",
    "icon": customerIcon,
    "subSection": [
      {
        "label": "Total Customers",
        "qk_key": "totalCustomers"
      },
      {
        "label": "Repeat Customers(%)",
        "qk_key": "repeatCustomers"

      },
      {
        "label": "LTV/CAC",
        "qk_key": "ltvbycac"
      },
      {
        "label": "RoAS",
        "qk_key": "roas"
      }
    ]
  },
  "teamData": {
    "label": "Team data",
    "type": "two_col",
    "icon": teamIcon,
    "subSection": [
      {
        "label": "Team size",
        "qk_key": "teamSize"

      },
      {
        "label": "Founder pedigree",
        "qk_key": "founderPedigree"
      },
    ]
  }
}

export const cuecardEdTech = {
  "financialData": {
    "label": "Financial Data",
    "type": "four_col",
    "icon": financialIcon,
    "subSection": [
      {
        "label": "TTM Revenue (₹)",
        "qk_key": "ttmNet",
        "field_type": 'currency'
      },
      {
        "label": "MoM Growth(%)",
        "qk_key": "momGrowth"
      },
      {
        "label": "Gross Margin(%)",
        "qk_key": "grossMargins"
      },
      {
        "label": "EBITDA(+)",
        "qk_key": "ebitda"
      }
    ]
  },
  "customerData": {
    "label": "Customer Data",
    "type": "four_col",
    "icon": customerIcon,
    "subSection": [
      {
        "label": "Total Customers",
        "qk_key": "totalCustomers"
      },
      {
        "label": "Program Completion(%)",
        "qk_key": "programCompletion"
      },
      {
        "label": "CAC (₹)",
        "qk_key": "cac",
        "field_type": 'currency'
      },
      {
        "label": "RoAS",
        "qk_key": "roas"
      }
    ]
  },
  "teamData": {
    "label": "Team data",
    "type": "two_col",
    "icon": teamIcon,
    "subSection": [
      {
        "label": "Team size",
        "qk_key": "teamSize"

      },
      {
        "label": "Founder pedigree",
        "qk_key": "founderPedigree"
      },
    ]
  }
}


export const cuecardAgency = {
  "financialData": {
    "label": "Financial Data",
    "type": "three_col",
    "icon": financialIcon,
    "subSection": [
      {
        "label": "TTM Revenue (₹)",
        "qk_key": "ttmNet",
        "field_type": 'currency',
      },
      {
        "label": "Recurring Revenue(%)",
        "qk_key": "recurringRevenue"
      },
      {
        "label": "Gross Margin(%)",
        "qk_key": "grossMargins"
      }
    ]
  },
  "customerData": {
    "label": "Customer Data",
    "type": "four_col",
    "icon": customerIcon,
    "subSection": [
      {
        "label": "Total Customers",
        "qk_key": "totalCustomers"
      },
      {
        "label": "Revenue Contribution Top 5 Clients(%)",
        "qk_key": "revenueContributionTop5"
      },
      {
        "label": "Project:Retainer",
        "qk_key": "projectbyretainer"
      },
      {
        "label": "Largest Client Age",
        "qk_key": "clientAge"
      }
    ]
  },
  "teamData": {
    "label": "Team data",
    "type": "two_col",
    "icon": teamIcon,
    "subSection": [
      {
        "label": "Team size",
        "qk_key": "teamSize"

      },
      {
        "label": "Founder pedigree",
        "qk_key": "founderPedigree"
      },
    ]
  }
}