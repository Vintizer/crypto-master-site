import { CurrentUserResponseInterface } from './currentUserResponse.interface';

export interface AuthResponseInterface {
  accessToken: string;
  refreshToken: string;
  user: CurrentUserResponseInterface;
}
