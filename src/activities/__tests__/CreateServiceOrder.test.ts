import { CreateServiceOrder, CreateServiceOrderInputs } from "../CreateServiceOrder";
import { ApiService } from "../../ApiService";
import { post } from "../../request";

jest.mock("../../request");
const mockPost = post as jest.MockedFunction<typeof post>;

describe("CreateServiceOrder", () => {
    describe("execute", () => {
        it("requires service input", async () => {
            const activity = new CreateServiceOrder();
            await expect(() => activity.execute({
                service: undefined as any,
                templateId: 1,
                userId: 1,
                divisionId: 1,
                coreObjectKey: "1"
            })).rejects.toThrow("service is required");
        });
        it("requires templateId input", async () => {
            const activity = new CreateServiceOrder();
            await expect(() => activity.execute({
                service: {} as any,
                templateId: undefined as any,
                userId: 1,
                divisionId: 1,
                coreObjectKey: "1"
            })).rejects.toThrow("templateId is required");
        });
        it("calls the API using POST", async () => {
            const inputs: CreateServiceOrderInputs = {
                service: {} as any,
                templateId: 1,
                userId: 1,
                divisionId: 1,
                coreObjectKey: "1"
            };
            const result = { foo: "bar" };
            mockPost.mockImplementationOnce((service: ApiService, path: string, data?: Record<string, any>) => {
                expect(service).toBe(inputs.service);
                expect(path).toBe("workmanagement/serviceorders/templates/generate");
                expect(data).toMatchObject({
                    coreObjectKey: inputs.coreObjectKey,
                    divisionID: inputs.divisionId,
                    templateID: inputs.templateId,
                    userID: inputs.userId,
                })
                return Promise.resolve(result);
            })
            const activity = new CreateServiceOrder();
            expect(await activity.execute(inputs)).toStrictEqual({ result });
        });
    });
});
