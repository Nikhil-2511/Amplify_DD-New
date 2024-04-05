import { reasonToBuyIcon, reasonToSellIcon } from "../../assets/icons/svgIcons";

export const cuecardValuationData = {
  "sellReason": {
    "label": "Reason for Acquisition/Raise Capital",
    "icon": reasonToSellIcon,
    "type" : "single_col",
    "qk_key": "reasonToSell",
    "placeholder": '',
    "isEditable": true,
    "field_type": 'text',
    "validation": '',
  },
  "buyReason": {
    "label": "Why Invest in Us?",
    "icon": reasonToBuyIcon,
    "type": "single_col",
    "qk_key": "reasonToBuy",
    "placeholder": '',
    "isEditable": true,
    "field_type": 'text',
    "validation": '',
  }
}