interface byId {
  email: string;
  name: string;
}
interface byUserId {
  userId: string;
}
export type IUserGetOneRequest = byId | byUserId;
