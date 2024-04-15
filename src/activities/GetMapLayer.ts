import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { ApiService } from "../ApiService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetMapLayerInputs {
    /**
     * @description The Elements XS API Service.
     * @required
     */
    service: ApiService;
    /**
     * @displayName Layer ID
     * @description The ID of the layer.
     * @required
     */
    layerId: number;
}

/** An interface that defines the outputs of the activity. */
export interface GetMapLayerOutputs {
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
    };
}

/**
 * @category Elements XS
 * @description Gets an Elements XS map layer by ID.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class GetMapLayer implements IActivityHandler {
    async execute(inputs: GetMapLayerInputs): Promise<GetMapLayerOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (inputs.layerId === undefined) {
            throw new Error("layerId is required");
        }

        const response = await get(inputs.service, "map/layer", {
            layerId: inputs.layerId,
        });

        return {
            result: response,
        };
    }
}
