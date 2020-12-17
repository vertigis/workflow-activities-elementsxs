import { ApiService } from "./ApiService";

export async function get(
    service: ApiService,
    path: string,
    params?: { [key: string]: any }
) {
    if (!service.url) {
        throw new Error("url is required");
    }
    const qs = objectToQueryString(params);
    const url = `${service.url}/api/${path}${qs ? "?" + qs : ""}`;
    const authHeader = `Bearer ${service.accessToken}`;
    const request = await fetch(url, {
        headers: {
            Authorization: authHeader,
        },
    });
    const response = await request.json();
    return response;
}

export async function post(
    service: ApiService,
    path: string,
    data?: { [key: string]: any }
) {
    if (!service.url) {
        throw new Error("url is required");
    }
    const url = `${service.url}/api/${path}`;
    const authHeader = `Bearer ${service.accessToken}`;
    const request = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const response = await request.json();
    return response;
}

function objectToQueryString(data?: {}): string {
    if (!data) {
        return "";
    }
    return Object.keys(data)
        .map((k) => {
            const value = data[k];
            const valueToEncode =
                value === undefined || value === null ? "" : value;
            return `${encodeURIComponent(k)}=${encodeURIComponent(
                valueToEncode
            )}`;
        })
        .join("&");
}
