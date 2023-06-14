export interface Auth {
  nick: string;
  pass: string;
}

export interface UserInfo {
  authId: string;
  nick: string;
  roleId: string;
  roleName: string;
  userId: string;
}
