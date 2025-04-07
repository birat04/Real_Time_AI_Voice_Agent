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

export async function signUp(params: SignUpParams){
  const {uid, name, email} = params;
}
export async function signIn(params: SignUpParams){
}
export async function signOut(params: SignUpParams){
  const {uid, name, email} = params;
}
