import {ObjectId} from "mongodb";

interface User {
    //_id == Auth0 id
    display_name: string
    user_invitation_id: ObjectId
    user_info: BasicUserInfo
}

interface UserInvitation {
    display_name: string
    ttl: Date,
}

interface BasicUserInfo {
    gender: string
    first_name: string
    last_name: string
}
