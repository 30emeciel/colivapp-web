import "server-only";
import LayoutClient from "./layout_client";




export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <LayoutClient>
                {children}
        </LayoutClient>
    )
}
