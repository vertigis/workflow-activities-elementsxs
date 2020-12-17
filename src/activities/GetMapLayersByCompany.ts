import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetMapLayersByCompanyInputs {
    /**
     * @description The Elements XS API Service.
     * @required
     */
    service: ApiService;
    /**
     * @displayName Company ID
     * @description The ID of the company whose layers to find.
     * @required
     */
    companyId: number;
}

/** An interface that defines the outputs of the activity. */
export interface GetMapLayersByCompanyOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        alternateRestURL: string;
        companyID: number;
        connectRestURL: string;
        departmentID: number;
        gisLayerName: string;
        headerFormatHTML: string;
        labelColumnName: string;
        layerID: number;
        layerTitle: string;
        mapServiceID: string;
        maps_Enterprise_MobilePackages_Layers: [];
        maps_Enterprise_Scenes_Categories_Layers: [];
        restURL: string;
        rowVersion: string;
        syncAction: number;
        token: any;
        uniqueIDColumnFormat: string;
        uniqueIDColumnName: string;
        useProxy: false;
        useProxyValue: false;
        useToken: false;
        zoomToViewerID: number;
    }[];
}

/**
 * @category Elements XS
 * @description Gets Elements XS map layers by company ID.
 */
export class GetMapLayersByCompany implements IActivityHandler {
    async execute(
        inputs: GetMapLayersByCompanyInputs
    ): Promise<GetMapLayersByCompanyOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (inputs.companyId === undefined) {
            throw new Error("companyId is required");
        }

        const response = await get(inputs.service, "map/layers/bycompany", {
            companyId: inputs.companyId,
        });

        return {
            result: response,
        };
    }
}
