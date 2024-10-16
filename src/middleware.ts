
import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest){
    if (!request.cookies.has("token")){
        return NextResponse.redirect(new URL('/', request.url));
    }
}

export const config = {
    matcher: ["/account", "/account/activity/all_post", 
        "/account/activity/saved_post", "/account/form_post",
         "/account/activity/saved_search", "/edit-post"]
}