import { User } from "firebase/auth";

export const convertUserToAuthProps = async (user: User) => {
  const { email, displayName, uid } = user
  const token = await user.getIdToken()
  return {
    email: email || '',
    uid,
    username: displayName || '',
    token
  }
}