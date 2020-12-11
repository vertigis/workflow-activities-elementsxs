import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { post } from "../request";

/** An interface that defines the inputs of the activity. */
export interface CreateServiceOrderInputs {
    /**
     * @displayName API Service
     * @description The Elements XS API Service.
     * @required
     */
    apiService: ApiService;
    /**
     * @displayName Template ID
     * @description The ID of the template.
     */
    templateId: number;
    divisionId: number;
    userId: number;
    coreObjectKey: string;
    coreObjectParentKey?: number;
    coreObjectType?: number;
    problem?: string;
    returnFullModel?: boolean;
}

/** An interface that defines the outputs of the activity. */
export interface CreateServiceOrderOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        result: number;
        message: string;
        reason: string | null;
        newItemKey: string;
        success: boolean;
        failed: boolean;
    };
}

/**
 * @category Elements XS
 * @description Create an Elements XS service order from a template.
 */
export class CreateServiceOrder implements IActivityHandler {
    async execute(
        inputs: CreateServiceOrderInputs
    ): Promise<CreateServiceOrderOutputs> {
        if (!inputs.apiService) {
            throw new Error("apiService is required");
        }
        if (inputs.templateId === undefined) {
            throw new Error("templateId is required");
        }

        const response = await post(
            inputs.apiService,
            "workmanagement/serviceorders/templates/generate",
            {
                divisionID: inputs.divisionId,
                coreObjectKey: inputs.coreObjectKey,
                coreObjectParentKey: inputs.coreObjectParentKey,
                coreObjectType: inputs.coreObjectType,
                problem: inputs.problem,
                returnFullModel: inputs.returnFullModel,
                templateID: inputs.templateId,
                userID: inputs.userId,
            }
        );

        return {
            result: response,
        };
    }
}
