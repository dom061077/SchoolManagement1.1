import {createReducer, on} from '@ngrx/store';
import  * as UserProfileActions from './user-profile.actions';
import { UserProfile } from '../user-profile.model';
import { initialPdfReportState } from '../../common/store/pdfreport.state';
import { initialUserProfileState } from './user-profile.state';


export const _userProfileReducer = createReducer(
    initialUserProfileState,
    
    on(UserProfileActions.loadProfile, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserProfileActions.loadProfileSuccess, (state, {profile}) =>{
            console.log('Reducer received profile: ', profile);
            return ({
            ...state,
            loading:false,
            profile
            });
        }
    ),
    on(UserProfileActions.loadProfileFailure,(state,{error})=>({
        ...state,
        loading: false,
        error
    }))
);

export function USER_PROFILEreducer(state: any, action: any){
    return _userProfileReducer(state, action);
}
