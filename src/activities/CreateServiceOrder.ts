import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { ApiService } from "../ApiService";
import { post } from "../request";

/** An interface that defines the inputs of the activity. */
export interface CreateServiceOrderInputs {
    /**
     * @description The Elements XS API Service.
     * @required
     */
    service: ApiService;
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
 * @clientOnly
 * @unsupportedApps GMV
 */
export class CreateServiceOrder implements IActivityHandler {
    async execute(
        inputs: CreateServiceOrderInputs
    ): Promise<CreateServiceOrderOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (inputs.templateId === undefined) {
            throw new Error("templateId is required");
        }

        const response = await post(
            inputs.service,
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
