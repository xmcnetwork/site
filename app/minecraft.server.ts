/**
 * Borrowed and modified for `fetch` from this gist by Plagiatus:
 * https://gist.github.com/Plagiatus/ce5f18bc010395fc45d8553905e10f55
 * Linked by wiki.vg:
 * https://wiki.vg/Microsoft_Authentication_Scheme
 */
export default class MinecraftAuthenticationHandler {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor(clientID: string, clientSecret: string, redirectUri: string) {
    if (!clientID) throw new Error("clientID is required");
    this.clientId = clientID;
    if (!clientSecret) throw new Error("clientSecret is required");
    this.clientSecret = clientSecret;
    if (!redirectUri) throw new Error("redirectUri is required");
    this.redirectUri = redirectUri;
  }

  public get forwardUrl(): string {
    return `https://login.live.com/oauth20_authorize.srf?${new URLSearchParams({
      client_id: this.clientId,
      response_type: "code",
      redirect_uri: this.redirectUri,
      scope: "XboxLive.signin offline_access",
    })}`;
  }

  public async getAuthCodes(code: string, refresh = false): Promise<AuthInfo> {
    if (!code) throw Error("No Code provided.");
    const authToken = await this.authCodeToAuthToken(code, refresh);
    const xbl = await this.authTokenToXBL(authToken);
    const xsts = await this.xblToXsts(xbl);
    const mcToken = await this.xstsToMc(xsts);
    const mcInfo = await this.getMcInfo(mcToken);

    return {
      auth_token: authToken,
      mc_info: mcInfo,
      mc_token: mcToken,
      xbox_token: xbl,
      xsts_token: xsts,
    };
  }

  private async authCodeToAuthToken(
    code: string,
    refresh: boolean,
  ): Promise<AuthorizationTokenResponse> {
    const body = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
    });
    if (refresh) {
      body.set("refresh_token", code);
      body.set("grant_type", "refresh_token");
    } else {
      body.set("code", code);
      body.set("grant_type", "authorization_code");
    }

    const response = await fetch("https://login.live.com/oauth20_token.srf", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return await this.resolveBody(response);
  }

  private async authTokenToXBL(
    authToken: AuthorizationTokenResponse,
  ): Promise<XboxServiceTokenResponse> {
    const response = await fetch(
      "https://user.auth.xboxlive.com/user/authenticate",
      {
        method: "POST",
        body: JSON.stringify({
          Properties: {
            AuthMethod: "RPS",
            SiteName: "user.auth.xboxlive.com",
            RpsTicket: `d=${authToken.access_token}`,
          },
          RelyingParty: "http://auth.xboxlive.com",
          TokenType: "JWT",
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return await this.resolveBody(response);
  }

  private async xblToXsts(
    token: XboxServiceTokenResponse,
  ): Promise<XboxServiceTokenResponse> {
    const response = await fetch(
      "https://xsts.auth.xboxlive.com/xsts/authorize",
      {
        method: "POST",
        body: JSON.stringify({
          Properties: {
            SandboxId: "RETAIL",
            UserTokens: [token.Token],
          },
          RelyingParty: "rp://api.minecraftservices.com/",
          TokenType: "JWT",
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return await this.resolveBody(response);
  }

  private async xstsToMc(
    token: XboxServiceTokenResponse,
  ): Promise<MCTokenResponse> {
    const response = await fetch(
      "https://api.minecraftservices.com/authentication/login_with_xbox",
      {
        method: "POST",
        body: JSON.stringify({
          identityToken: `XBL3.0 x=${token.DisplayClaims.xui[0].uhs};${token.Token}`,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return await this.resolveBody(response);
  }

  private async getMcInfo(mc_token: MCTokenResponse): Promise<MCUserInfo> {
    const response = await fetch(
      "https://api.minecraftservices.com/minecraft/profile",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${mc_token.access_token}`,
        },
      },
    );
    return await this.resolveBody(response);
  }

  // biome-ignore lint/suspicious/noExplicitAny: JSON.parse
  private async resolveBody<T = any>(response: Response): Promise<T> {
    return new Promise((resolve, reject) => {
      response.text().then((raw) => {
        if (response.ok) {
          resolve(JSON.parse(raw) as T);
        } else {
          console.error(response.status, response.statusText);
          reject();
        }
      });
    });
  }
}
