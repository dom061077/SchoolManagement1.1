import { UserProfile } from "../user-profile.model";

export interface UserProfileState{
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
}

export const initialUserProfileState: UserProfileState = {
    profile: null,
    loading: false,
    error: null
}