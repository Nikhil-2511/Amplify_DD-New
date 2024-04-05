import { ENDPOINT } from "../../config/endpoint";

export function offSellertabData() {
    return (
        [
            {
                label: 'Search by Buyer Requirement',
                url: ENDPOINT.MATCHING.queryText,
                searchPlaceholder: "Enter buyer requirement and click ‘Enter’",
                // searchType: 'text',
                primaryIdType: 'buyer'
            },
        ]
    )
}

export function offBuyertabData() {
    return (
        [
            {
                label: 'Search by Seller Requirement',
                url: ENDPOINT.MATCHING.queryText,
                searchPlaceholder: "Enter seller requirement and click ‘Enter’",
                // searchType: 'text',
                primaryIdType: 'seller'
            },
        ]
    )
}