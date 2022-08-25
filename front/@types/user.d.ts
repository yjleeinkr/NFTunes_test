declare interface IUserInfo {
  _id: string | undefined;
  account: string;
  nickname: string;
  email: string;
}

declare interface UserState {
  userInfo: IUserInfo;
  isNew: boolean;
  isLogin: boolean;
  isLoading: boolean;
}
