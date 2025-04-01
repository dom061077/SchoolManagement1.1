import {createReducer, on} from '@ngrx/store';
import  * as UserProfileActions from './user-profile.actions';
import { UserProfile } from '../user-profile.model';
import { initialPdfReportState } from '../../common/store/pdfreport.state';
import { initialUserProfileState } from './user-profile.state';


export const profileReducer = createReducer(
    initialUserProfileState,
    
    on(UserProfileActions.loadProfile, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
);
