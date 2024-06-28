interface AuthorizationTokenResponse {
  token_type: string;
  expires_in: number;
  scope: string;
  access_token: string;
  refresh_token: string;
  user_id: string;
  foci: string;
}

interface XboxServiceTokenResponse {
  IssueInstant: string;
  NotAfter: string;
  Token: string;
  DisplayClaims: DisplayClaim;
}

interface MCTokenResponse {
  username: string;
  roles: unknown[];
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface MCUserInfo {
  id: string;
  name: string;
  skins: MCSkinInfo[];
  capes: MCCapeInfo[];
}

interface MCInfo {
  id: string;
  state: "ACTIVE" | "INACTIVE";
  url: string;
}
interface MCSkinInfo extends MCInfo {
  variant: string;
}
interface MCCapeInfo extends MCInfo {
  alias: string;
}

interface AuthInfo {
  auth_token: AuthorizationTokenResponse;
  xbox_token: XboxServiceTokenResponse;
  xsts_token: XboxServiceTokenResponse;
  mc_token: MCTokenResponse;
  mc_info: MCUserInfo;
}

interface DisplayClaim {
  xui: {
    uhs: string;
  }[];
}
