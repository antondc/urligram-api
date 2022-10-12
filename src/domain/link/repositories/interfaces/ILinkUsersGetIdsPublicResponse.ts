export type ILinkUsersGetIdsPublicResponse = {
  meta: {
    totalItems: number;
    offset: number;
    size: number;
    sort: string;
  };
  usersData: Array<string>;
};
