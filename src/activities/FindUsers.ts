import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface FindUsersInputs {
    /**
     * @description The Elements XS API Service.
     * @required
     */
    service: ApiService;
    /**
     * @description The search where expression.
     * @required
     */
    where: string;
    page?: number;
    count?: number;
    sort?: string;
}

/** An interface that defines the outputs of the activity. */
export interface FindUsersOutputs {
    /**
     * @description The result of the activity.
     */
    result: {
        alternateHomePageID: any;
        alternateHomePageURL: any;
        assetGridLayout: string;
        assignWork: boolean;
        avatar: any;
        calendarColor: any;
        companyID: number;
        defaultCost: any;
        defaultDepartmentID: any;
        defaultHome_ShowInventory: any;
        defaultHome_ShowPersonalFilters: any;
        defaultHome_ShowSharedFilters: any;
        defaultHome_ShowSummary: any;
        defaultRate: any;
        dispatch_CalendarTaskTemplate: string;
        dispatch_ColumnWidth: number;
        dispatch_DefaultFilterID: number;
        dispatch_EndTime: string;
        dispatch_FlyoutTemplate: string;
        dispatch_Inverval: number;
        dispatch_LeftTOCTaskTemplate: string;
        dispatch_StartTime: string;
        dispatch_TaskDetailTemplate: string;
        emailAddress: string;
        enableNotifications: boolean;
        esriAuthUser: boolean;
        firstName: string;
        fullName: string;
        fullNameWithUserID: string;
        glExpenseAccount: any;
        glIncomeAccount: any;
        inventoryWSDashboard: any;
        inventory_AuditWorksheets: [];
        inventory_Locations_Users_Relationships: [];
        inventory_Purchasing_PurchaseOrders: [];
        inventory_Receiving_ItemReceipts: [];
        inventory_Sales_Invoices: [];
        isActive: boolean;
        laborCode: any;
        lastName: string;
        ldapEngineID: any;
        ldapGroup: any;
        ldapUser: any;
        mainWSMapViewerID: any;
        managedOrderPriority: any;
        mobileWSMapViewerID: any;
        mobileWSTaskGridSortOrder: any;
        mobileWSTheme: any;
        mobileWSZoomToMapViewerID: any;
        navigationID: number;
        notes: any;
        officeWSDashLayout: any;
        password: string;
        person_UserCrewRelationships: [];
        person_Users_Company_Divisions_Relationships: [];
        person_Users_Company_Relationships: [];
        person_Users_TimeOff: [];
        phonePrimary: string;
        phoneSecondary: string;
        primaryExtension: string;
        projects_Members: [];
        requestsGridLayout: any;
        resetCode: any;
        resetCodeExpires: any;
        secondaryEmailAddress: string;
        secondaryExtension: string;
        sellLabor: boolean;
        soTasksBaseFilterGridLayout: string;
        topMenuID: number;
        useAdminWS: boolean;
        useAlternateHomePage: boolean;
        useAnalyticsWS: boolean;
        useDispatchWS: boolean;
        useInventoryWS: boolean;
        useLDAPAuthentication: boolean;
        useMainWS: boolean;
        useMaintenanceWS: boolean;
        useMobileWS: boolean;
        userGuid: string;
        userID: number;
        username: string;
        view_Audit_ServiceOrders_ServiceOrder_WorkItems_Tasks_Assignment_History: [

        ];
        viewers_Desktop_Nav_Collapsed: any;
        wM_DynamicData_Document_User_Permissions: [];
        wM_DynamicData_Entry_Assignments_Users: [];
        wM_ServiceOrders_Notes: [];
        wM_ServiceOrders_Users_WorkQueue: [];
        wM_ServiceOrders_WorkItems_Tasks_Assignments_Users: [];
        wikis_Sections: [];
    }[];
}

/**
 * @category Elements XS
 * @description Searches for Elements XS users.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class FindUsers implements IActivityHandler {
    async execute(inputs: FindUsersInputs): Promise<FindUsersOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (!inputs.where) {
            throw new Error("where is required");
        }

        const response = await get(inputs.service, "people/users/lookup", {
            where: inputs.where,
            page: inputs.page,
            count: inputs.count,
            sort: inputs.sort,
        });

        return {
            result: response,
        };
    }
}
