import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserProfileState } from "./user-profile.state";

export const selectUserProfileState = createFeatureSelector<UserProfileState>('profile');

  export const selectProfile = createSelector(
    selectUserProfileState,
    (state) => state?.profile
  );
  
  export const selectProfileLoading = createSelector(
    selectUserProfileState,
    (state) => state?.loading
  );
  
  export const selectProfileError = createSelector(
    selectUserProfileState,
    (state) => state?.error
  );