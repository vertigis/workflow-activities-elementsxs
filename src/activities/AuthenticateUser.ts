import type { IActivityHandler } from "@geocortex/workflow/runtime/IActivityHandler";
import { ApiService } from "../ApiService";

/** An interface that defines the inputs of the activity. */
export interface AuthenticateUserInputs {
    /**
     * @displayName URL
     * @description The URL of the Elements XS REST API.
     * @required
     */
    url: string;
    /**
     * @description The username.
     * @required
     */
    username: string;
    /**
     * @description The password. Do not hard code passwords into a workflow.
     * @required
     */
    password: string;
}

/** An interface that defines the outputs of the activity. */
export interface AuthenticateUserOutputs {
    /**
     * @description The result of the activity.
     */
    result: ApiService;
}

/**
 * @category Elements XS
 * @description Authenticates a user with the Elements XS REST API using a username and password.
 */
export class AuthenticateUser implements IActivityHandler {
    async execute(
        inputs: AuthenticateUserInputs
    ): Promise<AuthenticateUserOutputs> {
        if (!inputs.url) {
            throw new Error("url is required");
        }
        if (!inputs.username) {
            throw new Error("username is required");
        }
        if (!inputs.password) {
            throw new Error("password is required");
        }

        const url = `${inputs.url}/api/token/user`;
        const request = await fetch(url, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                username: inputs.username,
                password: inputs.password,
            }),
        });
        const response = await request.json();
        return {
            result: {
                url: inputs.url,
                ...response,
            },
        };
    }
}
