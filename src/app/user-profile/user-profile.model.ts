import { UserMenuProfile } from "./usermenu-profile.model"

export interface UserProfile {
    name: string,
    email: string,
    preferred_username: string,
    menus:UserMenuProfile[],
    sid: string
}