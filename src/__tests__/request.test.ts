import { ApiService } from "../ApiService";
import { get, post } from "../request";

// Restore global fetch
const originalFetch = global.fetch;
afterEach(() => {
    global.fetch = originalFetch;
});

const mockFetch = jest.fn();

function mockResponseOnce(
    response: Record<string, unknown>,
    callback?: (input: RequestInfo, init: RequestInit) => void
) {
    global.fetch = mockFetch;
    mockFetch.mockImplementationOnce((input, init) => {
        callback?.(input, init);
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(response),
            status: 200,
            statusText: "OK",
        });
    });
}

const mockService: ApiService = {
    accessToken: "secret",
    expiresOn: "",
    tokenType: "bearer",
    url: "http://test",
    userId: 1,
}

describe("request", () => {
    describe("get", () => {
        it("requires url", async () => {
            const service = {
                ...mockService,
                url: ""
            };

            await expect(() => get(service, "path")).rejects.toThrow("url is required");
        });
        it("combines url and path", async () => {
            mockResponseOnce({}, (input) => {
                expect(input).toBe(`http://test/api/path`);
            });

            await get(mockService, "path");
        });
        it("adds encoded parameters to the query string", async () => {
            mockResponseOnce({}, (input) => {
                expect(input).toBe(`http://test/api/path?foo=bar&b%20az=abc%20123`);
            });

            await get(mockService, "path", { foo: "bar", "b az": "abc 123" });
        });
        it("sets authorization header", async () => {
            mockResponseOnce({}, (input, init) => {
                expect(init.headers?.["Authorization"]).toBe("Bearer secret");
            });

            await get(mockService, "path");
        });
    });
    describe("post", () => {
        it("requires url", async () => {
            const service = {
                ...mockService,
                url: ""
            };

            await expect(() => post(service, "path")).rejects.toThrow("url is required");
        });
        it("combines url and path", async () => {
            mockResponseOnce({}, (input) => {
                expect(input).toBe(`http://test/api/path`);
            });

            await post(mockService, "path");
        });
        it("sets authorization header", async () => {
            mockResponseOnce({}, (input, init) => {
                expect(init.headers?.["Authorization"]).toBe("Bearer secret");
            });

            await post(mockService, "path");
        });
        it("sets content-type header", async () => {
            mockResponseOnce({}, (input, init) => {
                expect(init.headers?.["Content-Type"]).toBe("application/json");
            });

            await post(mockService, "path");
        });
        it("adds parameters to the body as JSON", async () => {
            const params = { foo: "bar", baz: "abc 123" };
            mockResponseOnce({}, (input, init) => {
                expect(init.body).toBe(JSON.stringify(params));
            });

            await post(mockService, "path", params);
        });
    });
});