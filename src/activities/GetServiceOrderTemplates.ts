import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { post } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetServiceOrderTemplatesInputs {
    /**
     * @displayName API Service
     * @description The Elements XS API Service.
     * @required
     */
    apiService: ApiService;
    /**
     * @displayName Department ID
     * @description The ID of the department.
     */
    departmentId: number;
    relationships?: {
        coreObjectKey: number;
        coreObjectParentKey?: number;
        coreObjectType?: number;
    }[];
}

/** An interface that defines the outputs of the activity. */
export interface GetServiceOrderTemplatesOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        categories: {
            categoryId: number;
            categoryTitle: string;
            divisionID: number;
            parentCategoryId: number;
            templates: {
                categoryId: number;
                divisionId: number;
                templateId: number;
                templateTitle: string;
            }[];
        }[];
        division: string;
        divisionId: number;
    }[];
}

/**
 * @category Elements XS
 * @description Gets Elements XS service order templates.
 */
export class GetServiceOrderTemplates implements IActivityHandler {
    async execute(
        inputs: GetServiceOrderTemplatesInputs
    ): Promise<GetServiceOrderTemplatesOutputs> {
        if (!inputs.apiService) {
            throw new Error("apiService is required");
        }
        if (inputs.departmentId === undefined) {
            throw new Error("departmentId is required");
        }

        const response = await post(
            inputs.apiService,
            "workmanagement/serviceorders/templates/list",
            {
                departmentId: inputs.departmentId,
                relationships: inputs.relationships || [],
            }
        );

        return {
            result: response,
        };
    }
}
