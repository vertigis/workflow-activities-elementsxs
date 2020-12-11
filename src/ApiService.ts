export interface ApiService {
    url: string;
    accessToken: string;
    expiresOn: string;
    tokenType: "bearer";
    userId: number;
}
