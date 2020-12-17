import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetCompanyInputs {
    /**
     * @description The Elements XS API Service.
     * @required
     */
    service: ApiService;
    /**
     * @displayName Company ID
     * @description The ID of the company to find.
     * @required
     */
    companyId: number;
}

/** An interface that defines the outputs of the activity. */
export interface GetCompanyOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        apiToken: string;
        app_Connect_Enable: any;
        companyID: number;
        companyName: string;
        company_Departments: [];
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
    };
}

/**
 * @category Elements XS
 * @description Gets an Elements XS company by ID.
 */
export class GetCompany implements IActivityHandler {
    async execute(inputs: GetCompanyInputs): Promise<GetCompanyOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (inputs.companyId === undefined) {
            throw new Error("companyId is required");
        }

        const response = await get(inputs.service, "company", {
            companyId: inputs.companyId,
        });

        return {
            result: response,
        };
    }
}
