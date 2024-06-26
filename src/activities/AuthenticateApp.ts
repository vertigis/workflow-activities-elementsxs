import type { IActivityHandler } from "@vertigis/workflow/IActivityHandler";
import { ApiService } from "../ApiService";

/** An interface that defines the inputs of the activity. */
export interface AuthenticateAppInputs {
    /**
     * @displayName URL
     * @description The URL of the Elements XS REST API.
     * @required
     */
    url: string;
    /**
     * @description The company account ID.
     * @required
     */
    companyAccount: string;
    /**
     * @description The name of the application.
     * @required
     */
    appName: string;
    /**
     * @description The application's secret. Do not hard code secrets into a workflow.
     * @required
     */
    secret: string;
}

/** An interface that defines the outputs of the activity. */
export interface AuthenticateAppOutputs {
    /**
     * @description The Elements XS service that can be supplied to other Elements XS activities.
     */
    service: ApiService;
}

/**
 * @category Elements XS
 * @defaultName xsService
 * @description Authenticates an application with the Elements XS REST API.
 * @clientOnly
 * @unsupportedApps GMV
 */
export class AuthenticateApp implements IActivityHandler {
    async execute(
        inputs: AuthenticateAppInputs
    ): Promise<AuthenticateAppOutputs> {
        if (!inputs.url) {
            throw new Error("url is required");
        }
        if (!inputs.companyAccount) {
            throw new Error("companyAccount is required");
        }
        if (!inputs.appName) {
            throw new Error("appName is required");
        }
        if (!inputs.secret) {
            throw new Error("secret is required");
        }

        const url = `${inputs.url}/api/token/app`;
        const request = await fetch(url, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                appName: inputs.appName,
                companyAccount: inputs.companyAccount,
                secret: inputs.secret,
            }),
        });
        const response = await request.json();

        return {
            service: {
                url: inputs.url,
                ...response,
            },
        };
    }
}
