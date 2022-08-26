import httpService from "@/features/shared/data/http.service";
import { AxiosResponse } from "axios";
import { AccessToken } from "@/features/auth/models/access-token.model";
import { AccountResponse } from "@/features/account/data/account.response";

class AuthGateway {
	async login(username: string, password: string): Promise<AccessToken> {
		return httpService
			.post("auth/login", {
				username,
				password
			})
			.then(
				(res: AxiosResponse) =>
					({ token: res.data.token } as AccessToken)
			)
			.catch((error: any) => {
				console.log("auth error", error);
				throw error;
			});
	}

	async verify(token: string): Promise<AccountResponse> {
		return httpService
			.get("auth", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((res: AxiosResponse) => res.data.account as AccountResponse);
	}
}

export default new AuthGateway();