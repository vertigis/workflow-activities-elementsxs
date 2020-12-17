import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { get, post } from "../request";

/** An interface that defines the inputs of the activity. */
export interface UseElementsXsServiceInputs {
    /**
     * @description The Elements XS API Service.
     * @required
     */
    service: ApiService;
    /**
     * @description The Elements XS service operation.
     * @required
     */
    path:
        | "company"
        | "company/departments"
        | "company/department"
        | "company/department/divisions"
        | "company/department/lookup"
        | "company/department/division"
        | "company/department/divisions/lookup"
        | "map/layers/bycompany"
        | "map/layer"
        | "token/user"
        | "token/app"
        | "authorization"
        | "token/validate"
        | "people/users/lookup"
        | "people/users"
        | "people/users/bydivision"
        | "people/users/bycrew"
        | "people/users/mycompanies"
        | "people/crews/bydivision"
        | "people/contacts/bydivision"
        | "Sync/companies/{userId}"
        | "Sync/departments/{userId}"
        | "Sync/divisions/{userId}"
        | "Sync/taskpriorities/{userId}"
        | "Sync/taskstatuses/{userId}"
        | "Sync/taskfilters/{userId}"
        | "Sync/notecategories/{userId}"
        | "Sync/notes"
        | "Sync/maplayers/{userId}"
        | "Sync/tpkfiles/{userId}"
        | "Sync/dynamicdata/schemas/{userId}"
        | "Sync/dynamicdata/fields/{userId}"
        | "Sync/tasktype/layouts/{userId}"
        | "Sync/tasktype/layoutfields/{userId}"
        | "Sync/tasks/byfilter/{filterId}/{userId}"
        | "Sync/attachments"
        | "Sync/inventory/labor/{divisionId}"
        | "Sync/upload/{taskId}/{companyGuid}/{departmentId}/{divisionId}"
        | "Sync/tasks/{userId}"
        | "WebHooks/Listener"
        | "workmanagement/serviceorder"
        | "workmanagement/workitem"
        | "workmanagement/task"
        | "workmanagement/tasks/list"
        | "workmanagement/tasktype"
        | "workmanagement/serviceorders/templates/list"
        | "workmanagement/tasks/statuses/bydivision"
        | "workmanagement/serviceorders/templates/generate"
        | string;
    /**
     * @description The HTTP method to use to make the request. The default is GET.
     */
    method?: "GET" | "POST";
    /**
     * @description The data object to pass to the service operation.
     */
    data?: {
        [key: string]: any;
    };
}

/** An interface that defines the outputs of the activity. */
export interface UseElementsXsServiceOutputs {
    /**
     * @description The result of the service operation.
     */
    result: any;
}

/**
 * @displayName Use Elements XS Service
 * @category Elements XS
 * @description Utility activity to generically access any Elements XS REST API operation.
 */
export class UseElementsXsService implements IActivityHandler {
    async execute(
        inputs: UseElementsXsServiceInputs
    ): Promise<UseElementsXsServiceOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (!inputs.path) {
            throw new Error("path is required");
        }

        if (inputs.method && inputs.method.toLowerCase() === "post") {
            const response = await post(
                inputs.service,
                inputs.path,
                inputs.data
            );
            return {
                result: response,
            };
        } else {
            const response = await get(
                inputs.service,
                inputs.path,
                inputs.data
            );
            return {
                result: response,
            };
        }
    }
}
