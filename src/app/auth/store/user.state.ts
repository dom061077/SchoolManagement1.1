import { createEntityAdapter } from "@ngrx/entity";
import { UserModel, Users } from "../user.model";

export const UserAdapter = createEntityAdapter<Users>();

export const UserState: UserModel = UserAdapter.getInitialState({
    isDuplicate: false,
    menulist:[],
    roles:[],
    userinfo:{
        id:0,
        username: '',
        email: '',
        name: '',
        role: '',
        access_token: '',
        status: false,
        menu_list: []
    }
});