import { createReducer, on } from "@ngrx/store";
import { UserAdapter, UserState } from "./user.state";
import { fetchmenusuccess, getrolesuccess} from "./user.actions";

const _userReducer = createReducer(UserState,
    /*
    on(duplicateUserSuccess, (state, action) => {
        return { ...state, isDuplicate: action.isduplicate }
    }),
    on(fetchmenusuccess, (state, action) => {
        return { ...state}
    }),
    on(getuserssuccess, (state, action) => {
        return UserAdapter.setAll(action.userlist, state)
    }),
    on(getrolesuccess, (state, action) => {
        return { ...state }
    }),
    on(getuserbycodesuccess, (state, action) => {
        return { ...state, userinfo: action.userinfo }
    })
    */
)

export function UserReducer(state: any, action: any) {
    return _userReducer(state, action);
}