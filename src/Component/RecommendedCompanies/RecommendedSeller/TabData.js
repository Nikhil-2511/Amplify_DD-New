import { ENDPOINT } from "../../../config/endpoint";

export function recommendedSellertabData() {
    return (
        [
            {
                label: 'Search by Seller Name',
                url: ENDPOINT.MATCHING.queryText,
                searchPlaceholder: 'Enter seller name and click ‘Enter’',
                searchType: 'name'
            },
            {
                label: 'Search by Buyer Requirement',
                url: ENDPOINT.MATCHING.queryText,
                searchPlaceholder: "Search for sellers by entering a keyword and hitting 'Enter",
                searchType: 'text'
            },
        ]
    )
}