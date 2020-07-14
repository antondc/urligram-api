interface byUserId {
  userId: string;
}

interface byEmailAndName {
  email: string;
  name: string;
}

export type IUserGetOneRequest = byUserId | byEmailAndName;
