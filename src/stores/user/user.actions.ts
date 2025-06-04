import { User, UserProfile } from "../../interfaces/types";

export type UserActions = {
  setUser: (user: User) => void;
  setProfile: (profile: UserProfile) => void;
};
