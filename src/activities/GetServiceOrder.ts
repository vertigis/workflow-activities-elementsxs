import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetServiceOrderInputs {
    /**
     * @description The Elements XS API Service.
     * @required
     */
    service: ApiService;
    /**
     * @displayName ID
     * @description The ID of the service order.
     */
    id: number;
}

/** An interface that defines the outputs of the activity. */
export interface GetServiceOrderOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        actualEndDate: any;
        actualStartDate: any;
        assetNo: any;
        audit_Inventory_Items_Interval_Maintenance_Batch: [];
        category: any;
        company_Divisions: any;
        completed: boolean;
        completedByID: any;
        createdBy: any;
        createdByID: number;
        customerNo: any;
        dateCreated: string;
        description: any;
        divisionID: number;
        facilityID: any;
        gisFileID: any;
        lastModified: string;
        lastModifiedByID: number;
        locationNo: any;
        meterID: any;
        priority: any;
        priorityID: any;
        project: any;
        projectID: any;
        rowVersion: string;
        scheduledEndDate: string;
        scheduledStartDate: string;
        serviceID: any;
        serviceOrderID: number;
        serviceOrderNumber: string;
        serviceOrderTypeID: number;
        serviceOrders_ServiceOrderAssignmentRelationships: [];
        status: any;
        statusID: any;
        syncAction: number;
        templateID: number;
        wM_ServiceOrders_BatchLog: [];
        wM_ServiceOrders_Notes: [];
        wM_ServiceOrders_Priorities: any;
        wM_ServiceOrders_Relationships: [];
        wM_ServiceOrders_Statuses: any;
        wM_ServiceOrders_Types: {
            company_Divisions: any;
            serviceOrderTypeID: number;
            type: string;
            wM_ServiceOrders: [];
        };
        wM_ServiceOrders_WorkItems: any[];
    };
}

/**
 * @category Elements XS
 * @description Gets an Elements XS service order by ID.
 */
export class GetServiceOrder implements IActivityHandler {
    async execute(
        inputs: GetServiceOrderInputs
    ): Promise<GetServiceOrderOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (inputs.id === undefined) {
            throw new Error("id is required");
        }

        const response = await get(
            inputs.service,
            "workmanagement/serviceorder",
            {
                id: inputs.id,
            }
        );

        return {
            result: response,
        };
    }
}
