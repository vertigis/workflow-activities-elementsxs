import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { ApiService } from "../ApiService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetDepartmentsInputs {
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
export interface GetDepartmentsOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        billingServiceAPIReturnType: any;
        companyID: number;
        company_Companies: any;
        company_Divisions: [];
        customer_Search_Layout: string;
        department: string;
        departmentID: number;
        locations_Grid_Layout: any;
        map_GISAssets_Relationship_ViewerID: number;
        map_Location_Detail_Layout: any;
        map_Location_LayerID: number;
        map_Location_Search_GeocodeFormat: string;
        map_Location_Search_Layout: string;
        map_Location_Search_ViewerID: number;
        map_Location_ZoomTo_ViewerID: number;
        map_Tasks_SpatialReference: string;
        meterLayout: string;
        remoteLayout: string;
        rowVersion: string;
        serviceOrderCategoryAPI: any;
        syncAction: number;
        transmitterLayout: string;
        ubCompanyID: number;
        ubServiceURL: string;
        useAddressOneAlternateGrids: any;
    }[];
}

/**
 * @category Elements XS
 * @description Get an Elements XS department by company ID.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class GetDepartments implements IActivityHandler {
    async execute(
        inputs: GetDepartmentsInputs
    ): Promise<GetDepartmentsOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (inputs.companyId === undefined) {
            throw new Error("companyId is required");
        }

        const response = await get(inputs.service, "company/departments", {
            companyId: inputs.companyId,
        });

        return {
            result: response,
        };
    }
}
