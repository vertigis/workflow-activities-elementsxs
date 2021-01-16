import { AuthenticateApp, AuthenticateAppInputs } from "../AuthenticateApp";

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

describe("AuthenticateApp", () => {
    describe("execute", () => {
        it("requires url input", async () => {
            const activity = new AuthenticateApp();
            const inputs: AuthenticateAppInputs = {
                url: "",
                companyAccount: "c",
                appName: "a",
                secret: "s"
            };

            await expect(() => activity.execute(inputs)).rejects.toThrow("url is required");
        });
        it("requires companyAccount input", async () => {
            const activity = new AuthenticateApp();
            const inputs: AuthenticateAppInputs = {
                url: "https://test",
                companyAccount: "",
                appName: "a",
                secret: "s"
            };

            await expect(() => activity.execute(inputs)).rejects.toThrow("companyAccount is required");
        });
        it("requires appName input", async () => {
            const activity = new AuthenticateApp();
            const inputs: AuthenticateAppInputs = {
                url: "https://test",
                companyAccount: "a",
                appName: "",
                secret: "s"
            };

            await expect(() => activity.execute(inputs)).rejects.toThrow("appName is required");
        });
        it("requires secret input", async () => {
            const activity = new AuthenticateApp();
            const inputs: AuthenticateAppInputs = {
                url: "https://test",
                companyAccount: "c",
                appName: "a",
                secret: ""
            };

            await expect(() => activity.execute(inputs)).rejects.toThrow("secret is required");
        });
        it("calls the API using POST", async () => {
            const activity = new AuthenticateApp();
            const inputs: AuthenticateAppInputs = {
                url: "https://test",
                companyAccount: "c",
                appName: "a",
                secret: "s"
            };
            const authResponse = { foo: "bar" };

            mockResponseOnce(authResponse, (input, init) => {
                expect(input).toBe(`https://test/api/token/app`);
                expect(init.method).toBe("post");
                expect(init.headers?.["content-type"]).toBe("application/json");
                if (typeof init.body === "string") {
                    expect(JSON.parse(init.body)).toStrictEqual({
                        appName: "a",
                        companyAccount: "c",
                        secret: "s"
                    });
                } else {
                    fail("body was not a string")
                }
            });

            const result = await activity.execute(inputs);
            expect(result).toStrictEqual({
                service: {
                    url: inputs.url,
                    ...authResponse,
                }
            })
        });
    });
});