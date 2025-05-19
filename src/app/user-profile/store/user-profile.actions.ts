import { createAction, props } from '@ngrx/store';
import { UserProfile } from '../user-profile.model';

export const LOAD_PROFILE = '[Profile] Load Profile';
export const LOAD_PROFILE_SUCCESS = '[Profile] Load Success';
export const LOAD_PROFILE_FAILURE = '[Profile] Load Profile Failure';


export const loadProfile = createAction(LOAD_PROFILE);

export const loadProfileSuccess = createAction(LOAD_PROFILE_SUCCESS, props<{profile: UserProfile}>());

export const loadProfileFailure = createAction(LOAD_PROFILE_FAILURE, props<{error: string}>());


