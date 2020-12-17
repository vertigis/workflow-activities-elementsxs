import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetTaskInputs {
    /**
     * @description The Elements XS API Service.
     * @required
     */
    service: ApiService;
    /**
     * @displayName ID
     * @description The ID of the task.
     */
    id: number;
}

/** An interface that defines the outputs of the activity. */
export interface GetTaskOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        actualEndDate: any;
        actualStartDate: any;
        adminCompletedDate: any;
        billToID: number;
        citizenTicketGUID: any;
        citizenTicketLastDownload: any;
        citizenTicketLocalObjectID: any;
        company_Divisions: any;
        completed: boolean;
        completedBy: any;
        completedByID: any;
        createdBy: string;
        createdByID: number;
        dateCreated: string;
        deleted: boolean;
        divisionID: number;
        dynamicData: any;
        initialResponseDate: any;
        isCitizenTicket: boolean;
        isWorkItemType: boolean;
        lastModified: string;
        lastModifiedByID: number;
        priority: any;
        priorityID: number;
        problem: string;
        projectID: any;
        projects: any;
        resolution: string;
        rowVersion: string;
        scheduledEndDate: string;
        scheduledStartDate: string;
        schemaDocGuid: any;
        serviceOrderDetailID: number;
        status: any;
        statusID: number;
        syncAction: number;
        taskID: number;
        taskType: any;
        taskTypeID: number;
        ubPost: any;
        ubPostDate: any;
        ubPostResultCode: any;
        ubPostResultMessage: any;
        ubPostResultStatus: any;
        wM_ServiceOrders_WorkItems: any;
        wM_ServiceOrders_WorkItems_Tasks_Assignments_Contacts: [];
        wM_ServiceOrders_WorkItems_Tasks_Assignments_Crews: [];
        wM_ServiceOrders_WorkItems_Tasks_Assignments_Users: [];
        wM_ServiceOrders_WorkItems_Tasks_Contacts: [];
        wM_ServiceOrders_WorkItems_Tasks_DeviceDetails: [];
        wM_ServiceOrders_WorkItems_Tasks_ExternalFees: any;
        wM_ServiceOrders_WorkItems_Tasks_Priorities: any;
        wM_ServiceOrders_WorkItems_Tasks_Resources_Relationships: [];
        wM_ServiceOrders_WorkItems_Tasks_Statuses: any;
        wM_ServiceOrders_WorkItems_Tasks_Types: any;
        workCompletedDate: any;
    };
}

/**
 * @category Elements XS
 * @description Gets an Elements XS task by ID.
 */
export class GetTask implements IActivityHandler {
    async execute(inputs: GetTaskInputs): Promise<GetTaskOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (inputs.id === undefined) {
            throw new Error("id is required");
        }

        const response = await get(inputs.service, "workmanagement/task", {
            id: inputs.id,
        });

        return {
            result: response,
        };
    }
}
