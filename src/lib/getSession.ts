"use server";

import { ISessionData } from "./definitions";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserSession(): Promise<ISessionData>{
  const token = cookies().get('token')?.value as string;

  const decode: ISessionData = jwtDecode(token)
  return  decode
}

export async function logOut(){
  if (cookies().has("token")){
    cookies().delete("token");
  }
  redirect('/');
}

export async function getAuthState(): Promise<boolean>{
  if (cookies().has("token")){
    return true;
  }
  return false;
}
