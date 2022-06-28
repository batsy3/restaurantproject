import { fetchUser } from "../utils/fetchLocalstoragedata"

const userinfo = fetchUser()


export const initialState = {
    user:userinfo  
}