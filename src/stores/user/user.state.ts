import { User, UserProfile } from "../../interfaces/types";

export type UserState = {
  user?: User;
  profile?:UserProfile;
};
