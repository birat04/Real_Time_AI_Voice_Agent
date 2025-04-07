"use server";

import {auth, db} from "@/firebase/admin";
import { Cookies } from "next/headers";
import path from "path";

const SESSION_DURATION = 60 * 60 * 24 * 7; 

export async function setSessionCookie(idToken: string) {
  const cookies = Cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000,
  });

  cookies.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists)
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };
    await db.collection("users").doc(uid).set({
      name,
      email
    });
    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error("Error creating user:", error);
    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use",
      };
    }
    return{
      success: false,
      message: "An error occurred while creating the account.",
    }
  }

    
}
export async function signIn(params: SignUpParams){

}
export async function signOut(params: SignUpParams){
  const {uid, name, email} = params;
}
