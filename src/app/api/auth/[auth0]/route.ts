import {handleAuth, handleCallback, handleLogin} from '@auth0/nextjs-auth0';
import {AfterCallbackAppRoute} from "@auth0/nextjs-auth0/src/handlers/callback";
import {PrismaClient} from "@prisma/client";
import {ObjectId} from "mongodb";
const prisma = new PrismaClient()

const afterCallback : AfterCallbackAppRoute = async (req, session, state) => {
    const user_id = session.user.sub as string
    const user = await prisma.user2.findFirstOrThrow({
        where: {
            id: user_id,
        },
    })
    //session.user.customProperty = 'foo';
    //delete session.refreshToken;
    return session;
};

export const GET = handleAuth({
    callback: handleCallback({afterCallback}),
    signup: handleLogin
});
