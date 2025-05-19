import { createEntityAdapter } from "@ngrx/entity";

import { UserProfile } from "../user.profile";

export const UserAdapter = createEntityAdapter<UserProfile>();

export const UserState = UserAdapter.getInitialState();