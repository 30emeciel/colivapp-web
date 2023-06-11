'use client';
// pages/_app.js
import React from 'react';
import {useUser} from '@auth0/nextjs-auth0/client';
import Link from "next/link";

export default function App() {

    const user = useUser()

    return <>
        <h1>Hello World! {user.user?.name} </h1>
        <ul>
            <li><b>user.isLoading: </b>{user.isLoading}</li>
            <li><b>user.error?.message: </b>{user.error?.message}</li>
        </ul>
        <a href="/api/auth/login">Login</a>
    </>
}