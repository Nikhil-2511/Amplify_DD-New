import { BuyerDefaultMandatesTableModel } from "./BuyerMandateTableModel";


export function BuyerMandatesTabModel() {
    return (
        [
            {
                tableModel: BuyerDefaultMandatesTableModel(),
                noResultHeading: "No mandates available",
                norResultSubheading: "Create a mandate if you have a specific M&A requirement."
            },
        ]
    )
}