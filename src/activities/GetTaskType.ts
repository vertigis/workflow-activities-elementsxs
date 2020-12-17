import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetTaskTypeInputs {
    /**
     * @description The Elements XS API Service.
     * @required
     */
    service: ApiService;
    /**
     * @displayName ID
     * @description The ID of the task type.
     */
    id: number;
}

/** An interface that defines the outputs of the activity. */
export interface GetTaskTypeOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        company_Divisions: any;
        defaultDuration: number;
        divisionID: number;
        entrySchemaGuid: any;
        entrySchemaID: any;
        hasDynamicDocument: boolean;
        includeBackflowDetails: boolean;
        includeMeterDetails: boolean;
        includeMeterReadDetails: boolean;
        includeTransmitterDetails: boolean;
        isUBMeterInstall: boolean;
        isUBMeterRead: boolean;
        isUBMeterRemove: boolean;
        isUBMeterReplace: boolean;
        maintenanceID: any;
        meterLayoutID: any;
        officeWS_RecordLayoutID: any;
        pnL_Assignments_Minimized: boolean;
        pnL_Assignments_Visible: boolean;
        pnL_Attachments_Minimized: boolean;
        pnL_Attachments_Visible: boolean;
        pnL_Contacts_Minimized: boolean;
        pnL_Contacts_Visible: boolean;
        pnL_Contractor_Minimized: boolean;
        pnL_Contractor_Visible: boolean;
        pnL_Details_Minimized: boolean;
        pnL_Details_Visible: boolean;
        pnL_Devices_Minimized: boolean;
        pnL_Devices_Visible: boolean;
        pnL_Documents_Minimized: boolean;
        pnL_Documents_Visible: boolean;
        pnL_DynamicData_Minimized: boolean;
        pnL_DynamicData_Visible: boolean;
        pnL_Equipment_Minimized: boolean;
        pnL_Equipment_Visible: boolean;
        pnL_Fees_Minimized: boolean;
        pnL_Fees_Visible: boolean;
        pnL_IntervalReads_Minimized: any;
        pnL_IntervalReads_Visible: any;
        pnL_Inventory_Minimized: boolean;
        pnL_Inventory_Visible: boolean;
        pnL_Labor_Minimized: boolean;
        pnL_Labor_Visible: boolean;
        pnL_Map_Minimized: boolean;
        pnL_Map_Visible: boolean;
        pnL_Notes_Minimized: boolean;
        pnL_Notes_Visible: boolean;
        pnL_Relationships_Minimized: boolean;
        pnL_Relationships_Visible: boolean;
        pnL_Requisitions_Minimized: any;
        pnL_Requisitions_Visible: boolean;
        pnL_Resources_Minimized: boolean;
        pnL_Resources_Visible: boolean;
        processMaintenance: boolean;
        processWorkflowOnAdd: boolean;
        processWorkflowOnDelete: boolean;
        processWorkflowOnEdit: boolean;
        remoteLayoutID: any;
        taskType: string;
        taskTypeID: number;
        transmitterLayoutID: any;
        viewerID: any;
        wM_DynamicData_RecordLayouts: any;
        wM_DynamicData_Schemas: any;
        wM_ServiceOrders_WorkItems_Tasks: [];
        wM_ServiceOrders_WorkItems_Tasks_Types_Actions: [];
        wM_ServiceOrders_WorkItems_Tasks_Types_ContractorKits: [];
        wM_ServiceOrders_WorkItems_Tasks_Types_EquipmentKits: [];
        wM_ServiceOrders_WorkItems_Tasks_Types_LaborKits: [];
        wM_ServiceOrders_WorkItems_Tasks_Types_MaterialKits: [];
        wM_ServiceOrders_WorkItems_Tasks_Types_MobileLayouts: [];
        wM_ServiceOrders_WorkItems_Tasks_Types_Relationships: [];
        wM_ServiceOrders_WorkItems_Tasks_Types_Reports: [];
        workflowAdd: string;
        workflowDelete: string;
        workflowEdit: string;
    };
}

/**
 * @category Elements XS
 * @description Gets an Elements XS task type by ID.
 */
export class GetTaskType implements IActivityHandler {
    async execute(inputs: GetTaskTypeInputs): Promise<GetTaskTypeOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (inputs.id === undefined) {
            throw new Error("id is required");
        }

        const response = await get(
            inputs.service,
            "workmanagement/tasktype",
            {
                id: inputs.id,
            }
        );

        return {
            result: response,
        };
    }
}
