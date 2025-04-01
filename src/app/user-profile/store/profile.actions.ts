import { createAction, props } from '@ngrx/store';
import { UserProfile } from '../user-profile.model';

export const LOAD_PROFILE = '[Profile] Load Profile';

export const loadProfile = createAction(LOAD_PROFILE,
    props<{profile: UserProfile}>()
);


