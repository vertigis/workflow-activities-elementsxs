import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { ApiService } from "../ApiService";
import { get } from "../request";

/** An interface that defines the inputs of the activity. */
export interface GetUsersByCrewInputs {
    /**
     * @description The Elements XS API Service.
     * @required
     */
    service: ApiService;
    /**
     * @displayName Crew ID
     * @description The ID of the crew to find.
     * @required
     */
    crewId: number;
}

/** An interface that defines the outputs of the activity. */
export interface GetUsersByCrewOutputs {
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
 * @description Get an Elements XS list of users by crew ID.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class GetUsersByCrew implements IActivityHandler {
    async execute(
        inputs: GetUsersByCrewInputs
    ): Promise<GetUsersByCrewOutputs> {
        if (!inputs.service) {
            throw new Error("service is required");
        }
        if (typeof inputs.crewId !== "number") {
            throw new Error("crewId is required");
        }

        const response = await get(inputs.service, "people/users/bycrew", {
            crewId: inputs.crewId,
        });

        return {
            result: response,
        };
    }
}
