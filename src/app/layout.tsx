import './vars.css'
import './globals.css'
import 'polyfills'
import { Metadata } from 'next';
import {UserProvider} from "@auth0/nextjs-auth0/client";


export const metadata: Metadata = {
    title: 'Coliv\'app',
    description: 'Welcome to Coliv\'app!',
};

export default function RootLayout({
                                       // Layouts must accept a children prop.
                                       // This will be populated with nested layouts or pages
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body><UserProvider>{children}</UserProvider></body>
        </html>
    );
}
