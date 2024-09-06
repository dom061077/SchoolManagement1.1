import { createEntityAdapter } from "@ngrx/entity";
import { UserModel, Users } from "../user.model";
import { UserProfile } from "../user.profile";

export const UserAdapter = createEntityAdapter<UserProfile>();

export const UserState = UserAdapter.getInitialState();