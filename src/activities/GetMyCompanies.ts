import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { ApiService } from "../ApiService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetMyCompaniesInputs {
    /**
     * @description The Elements XS API Service.
     * @required
     */
    service: ApiService;
    /**
     * @displayName User ID
     * @description The ID of the user whose company is to be found.
     * @required
     */
    userId: number;
}

/** An interface that defines the outputs of the activity. */
export interface GetMyCompaniesOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        apiToken: string;
        app_Connect_Enable: any;
        companyID: number;
        companyName: string;
        company_Departments: any[];
        connect_AddressBlock: string;
        connect_Email: string;
        connect_Hours: string;
        connect_LocationTitle: string;
        connect_MainLogo: string;
        connect_Phone: string;
        connect_PrivacyPolicy: string;
        connect_SmallLogo: string;
        connect_TermsOfUse: string;
        connect_Wallpaper: any;
        customerAccount: string;
        customerNumberFormat: any;
        mapAppID: any;
        rowVersion: string;
        syncAction: number;
    }[];
}

/**
 * @category Elements XS
 * @description Gets the Elements XS companies of a user.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class GetMyCompanies implements IActivityHandler {
    async execute(
        inputs: GetMyCompaniesInputs
    ): Promise<GetMyCompaniesOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (inputs.userId === undefined) {
            throw new Error("userId is required");
        }

        const response = await get(
            inputs.service,
            "people/users/mycompanies",
            {
                userId: inputs.userId,
            }
        );

        return {
            result: response,
        };
    }
}
