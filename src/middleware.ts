import {getSession, withMiddlewareAuthRequired} from "@auth0/nextjs-auth0/edge";
import {NextResponse} from "next/server";

export default withMiddlewareAuthRequired(async function middleware(req) {
    const res = NextResponse.next();
    const auth_user = await getSession(req, res)
    const user_id = auth_user!.user.sub

    res.headers.set('user_id', user_id);
    return res;
});
export const config = {
    matcher: '/a/:path*'
};
