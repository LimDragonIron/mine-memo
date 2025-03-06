'use server'

import { signIn, signOut, auth, update } from "@/auth"

export const signInWithGoogle = async () => {
    await signIn("google")
}

export const signOutWithForm = async () => {
    await signOut()
}

export {
    auth as getSession,
    update as updateSession
}