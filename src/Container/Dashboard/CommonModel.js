import { buildingIconWhite, clientRosterIcon, dashboardAskingPriceIcon, reasonToBuyIcon, reasonToSellIcon, suggestedBuyersWhiteIcon, teamIcon } from "../../assets/icons/svgIcons";
import { checkEditableFieldValue, findObjectValue } from "../../helper/commonHelper";
import { Objectives } from "../SellerOnboarding/SellerOnboardingSchemas";

export const CompanyCommonData = (company) => {
    return {
    "teamData": {
      "label": "Team Data",
      "type": "two_col",
      "icon": teamIcon,
      "subSection": [
          {
            "label": "Team Size",
            "qk_key": "teamSize",
            "answer": company["teamSize"] || '',
            "placeholder": '',
            "isEditable": true,
            "field_type": 'numberRange',
            "validation": '',
            "dashboardVisbile": true,
            "required": true,
            "onChange": "validateTeamSize"
              
          },
          {
            "label": "Founder Pedigree",
            "qk_key": "founderPedigree",
            "answer": company["founderPedigree"] || '',
            "placeholder": "Share founder's education, experience, and notable achievements.",
            "isEditable": true,
            "field_type": 'textarea',
            "validation": '',
            "dashboardVisbile": true,
            "required": true
          },
      ]
    },
    // "sellReason": {
    //   "label": "Reason for Acquisition / Raise capital? ",
    //   "icon": reasonToSellIcon,
    //   "type": "two_col",
    //   "icon": suggestedBuyersWhiteIcon,
    //   "subSection": [
    //     {
    //       "label": "Objective",
    //       "qk_key": "objective",
    //       "answer": company["objective"],
    //       "placeholder": 'Please select a objective',
    //       "isEditable": checkEditableFieldValue(company, 'objective'),
    //       "field_type": 'dropdown',
    //       "validation": '',
    //       "error": '',
    //       "required": true,
    //       "options": Objectives || [],
    //       "dashboardVisbile": true,
    //     },
    //     {
    //       'label': '',
    //       'dynamicLabel': renderFieldLabel,
    //       'answer': company["objective"],
    //       'qk_key': 'openToOtherObjective',
    //       'isEditable': true,
    //       'dependentOn': 'objective',
    //       "hideOnDashboard": true,
    //       "field_type": 'dependent_checkbox',
    //       "placeholder": 'dsfds',
    //     },
    //     {
    //       "label":  "Reason",
    //       "placeholder": "Can outline reason for selling if looking at acquisition or if open to raising capital via a strategic stake",
    //       "isEditable": true,
    //       "field_type": 'textarea',
    //       "qk_key": "reasonToSell",
    //       "validation": '',
    //       "answer": company["reasonToSell"] || '-',
    //       "dashboardVisbile": true,
    //       "nonCountable": true
    //     },
    //   ]
    // },
    "sellReason": {
      "label": "Reason for Acquisition / Raise capital? ",
      "icon": reasonToSellIcon,
      "type" : "single_col",
      "qk_key": "reasonToSell",
      "answer": company["reasonToSell"] || '',
      "placeholder": "Can outline reason for selling if looking at acquisition or if open to raising capital via a strategic stake ",
      "isEditable": true,
      "field_type": 'textarea',
      "validation": '',
      "dashboardVisbile": true,
    },
    "buyReason": {
      "label": "Why invest in us? ",
      "icon": reasonToBuyIcon,
      "type": "single_col",
      "qk_key": "reasonToBuy",
      "answer": company["reasonToBuy"] || '',
      "placeholder": 'Describe your company’s key assets / products / USP',
      "isEditable": true,
      "field_type": 'textarea',
      "validation": '',
      "dashboardVisbile": true,
      "required": true
    },
    "askPrice": {
      "label": "Expected Valuation  (₹)",
      "icon": dashboardAskingPriceIcon,
      "type": "single_col",
      "qk_key": "askPrice",
      "answer": company["askPrice"] || '',
      "placeholder": 'Share your expected 100% equity valuation, it helps us give you guidance to provide a high intent match',
      "isEditable": true,
      "field_type": 'number',
      "validation": '',
      "dashboardVisbile": true
    },
    
    "clientRoster": {
      "label":  "Client Roster",
      "type": "single_col",
      "icon": clientRosterIcon,
      "placeholder": 'List key clients, especially those well-known or significant to your business.',
      "isEditable": true,
      "field_type": 'text',
      "qk_key": "clientRoaster",
      "validation": '',
      "answer": company["clientRoaster"] || ''
    },
    "suggestedBuyers": {
      "label":  "Suggested Buyers",
      "type": "single_col",
      "icon": suggestedBuyersWhiteIcon,
      "placeholder": "Enter suggested buyers here (e.g., larger competitors or entities with a compatible business model).",
      "isEditable": true,
      "field_type": 'text',
      "qk_key": "suggestedBuyers",
      "validation": '',
      "answer": company["suggestedBuyers"] || ''
    },
  }
}

export function getFieldObjData (key= '', dataObj) {
  let value = '';
  let splitKeys = key.split('.');
  if(dataObj && dataObj[splitKeys[0]] && dataObj[splitKeys[0]][splitKeys[1]]) value = dataObj[splitKeys[0]][splitKeys[1]];
  return value;
}

function renderFieldLabel(fieldsArray) {
  let operationValue = findObjectValue(fieldsArray, this?.dependentOn);
  if(operationValue) {
    return operationValue === 'acquisition' ? 'Are you open to funding as well ?' : 'Are you open to inbound interest from strategic acquirers ?'
  };
  return '';
}