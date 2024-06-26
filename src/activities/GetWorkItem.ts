import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { ApiService } from "../ApiService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetWorkItemInputs {
    /**
     * @description The Elements XS API Service.
     * @required
     */
    service: ApiService;
    /**
     * @displayName ID
     * @description The ID of the work item.
     */
    id: number;
}

/** An interface that defines the outputs of the activity. */
export interface GetWorkItemOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        archive_AssetDescription: any;
        archive_AssetNo: any;
        archive_GISAssetDescription: any;
        archive_GISAssetNo: any;
        archive_GISFileID: any;
        archive_GISLayer: any;
        archive_MeterDescription: any;
        archive_MeterID: any;
        archive_MeterNo: any;
        asseT_AssetTag: any;
        assetNo: any;
        completed: boolean;
        createdBy: string;
        createdByID: number;
        cusT_Address: any;
        cusT_City: any;
        cusT_Email: any;
        cusT_Name: any;
        cusT_Phone1: any;
        cusT_Phone2: any;
        cusT_State: any;
        cusT_Zip: any;
        customer: any;
        customerID: any;
        customerNo: any;
        dateCreated: string;
        divisionID: number;
        facility: any;
        facilityID: any;
        facility_Full_Location: any;
        feeAmount: number;
        feePosted: any;
        feePostedByUserID: any;
        feePostingAccountNo: any;
        feePostingCode: any;
        feePostingDate: any;
        feePostingLocationNo: any;
        feePostingMessage: any;
        feePostingServiceName: any;
        feePostingServiceOrderCode: any;
        feePostingStatus: any;
        giS_AssetTag: string;
        gisAssetNo: string;
        gisFileID: number;
        gisLayer: any;
        isArchiveAsset: any;
        isArchiveGISAsset: any;
        isArchiveMeter: any;
        isAsset: boolean;
        isCustomer: boolean;
        isFacility: boolean;
        isGISAsset: boolean;
        isLocation: boolean;
        isMeter: boolean;
        isService: boolean;
        isUtilityBillingServiceOrder: boolean;
        loC_Address: any;
        loC_CYCLE: any;
        loC_City: any;
        loC_ParcelID: any;
        loC_ROUTE: any;
        loC_SEQUENCE: any;
        loC_State: any;
        loC_Zip: any;
        location: any;
        locationID: any;
        locationNo: any;
        meterID: any;
        meterNo: any;
        rowVersion: string;
        service: any;
        serviceID: any;
        serviceOrderDetailID: number;
        serviceOrderDetailType: string;
        serviceOrderDetailTypeID: number;
        serviceOrderID: number;
        serviceType: any;
        statusID: any;
        syncAction: number;
        taxAmount: any;
        totalTasks: number;
        totalTasksCompleted: number;
        utilityBillingServiceCodeTypeID: any;
        wM_ServiceOrders: any;
        wM_ServiceOrders_WorkItems_Tasks: [];
        wM_ServiceOrders_WorkItems_Types: any;
    };
}

/**
 * @category Elements XS
 * @description Gets an Elements XS work item by ID.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class GetWorkItem implements IActivityHandler {
    async execute(inputs: GetWorkItemInputs): Promise<GetWorkItemOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (inputs.id === undefined) {
            throw new Error("id is required");
        }

        const response = await get(
            inputs.service,
            "workmanagement/workitem",
            {
                id: inputs.id,
            }
        );

        return {
            result: response,
        };
    }
}
