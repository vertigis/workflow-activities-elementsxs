import { AuthenticateUser, AuthenticateUserInputs } from "../AuthenticateUser";

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
    mockFetch.mockImplementationOnce((input: RequestInfo, init: RequestInit) => {
        callback?.(input, init);
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(response),
            status: 200,
            statusText: "OK",
        });
    });
}

describe("AuthenticateUser", () => {
    describe("execute", () => {
        it("requires url input", async () => {
            const activity = new AuthenticateUser();
            const inputs: AuthenticateUserInputs = {
                url: "",
                username: "u",
                password: "p",
            };

            await expect(() => activity.execute(inputs)).rejects.toThrow("url is required");
        });
        it("requires username input", async () => {
            const activity = new AuthenticateUser();
            const inputs: AuthenticateUserInputs = {
                url: "https://test",
                username: "",
                password: "p",
            };

            await expect(() => activity.execute(inputs)).rejects.toThrow("username is required");
        });
        it("requires password input", async () => {
            const activity = new AuthenticateUser();
            const inputs: AuthenticateUserInputs = {
                url: "https://test",
                username: "u",
                password: "",
            };

            await expect(() => activity.execute(inputs)).rejects.toThrow("password is required");
        });
        it("calls the API using POST", async () => {
            const activity = new AuthenticateUser();
            const inputs: AuthenticateUserInputs = {
                url: "https://test",
                username: "u",
                password: "p",
            };
            const authResponse = { foo: "bar" };

            mockResponseOnce(authResponse, (input, init) => {
                expect(input).toBe(`https://test/api/token/user`);
                expect(init.method).toBe("post");
                expect(init.headers?.["content-type"]).toBe("application/json");
                if (typeof init.body === "string") {
                    expect(JSON.parse(init.body)).toStrictEqual({
                        username: "u",
                        password: "p",
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