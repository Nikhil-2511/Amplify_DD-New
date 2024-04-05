import { CORPORATE_KEY, CORPORATE_VC_KEY, FAMILY_OFFICE_KEY, INDIVIDUAL_KEY, VC_PE_KEY } from "../constants/keyVariableConstants";

export const User_Roles = {
    /**
     * 
     * Keep these variable common everywhere for consistent user role feature
     */
    'mandate': [CORPORATE_KEY, FAMILY_OFFICE_KEY, INDIVIDUAL_KEY],
    'browse': [VC_PE_KEY, CORPORATE_VC_KEY, FAMILY_OFFICE_KEY, CORPORATE_KEY, INDIVIDUAL_KEY],
    'expressIntrest': [FAMILY_OFFICE_KEY]
}

export function checkUserRole(feature, userType) {
    let userRole = User_Roles[feature];
    if(userRole?.length) {
        return userRole.includes(userType);
    }
    return false;
}