"use server";

import { ISessionData } from "./definitions";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserSession(){
  const token = cookies().get('token')?.value as string;
  if (!token){
    return null;
  }
  const decode: ISessionData = await jwtDecode(token)
  return  decode
}

export async function logOut(){
  if (cookies().has("token")){
    cookies().delete("token");    
  }

}

export async function getAuthState(): Promise<boolean>{
  if (cookies().has("token")){
    return true;
  }
  return false;
}
