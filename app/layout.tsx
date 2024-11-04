import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ProfileHeader from "@/utils/header/page";
import { Layout } from "antd";
import NavigationMenu from "@/utils/slider/page";
import NarrowFooter from "@/utils/footer/page";
import Wrapper from "@/utils/content/page";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};


const menuItems = [
    {
        key: "1",
        label: "Accounts",
        link: "/accounts",
    },
    {
        key: "yashraj-singh",
        label: "Yashraj Singh",
        children: [
            { key: "yashraj-singh-manage", label: "Manage", link: "/option5/settings" },
            { key: "yashraj-singh-list", label: "List", link: "/option6/articles" },
            { key: "yashraj-singh-logs", label: "Logs", link: "/option7/logs" },
        ],
    },
    {
        key: "aman-singh",
        label: "Aman Singh",
        children: [
            { key: "aman-singh-manage", label: "Manage", link: "/option5/settings" },
            { key: "aman-singh-list", label: "List", link: "/option6/articles" },
            { key: "aman-singh-logs", label: "Logs", link: "/option7/logs" },
        ],
    },
];

const logoSrc = "/images/logo/NexPost.png";
const logoAlt = "NexPost";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const APP_NAME: string =
        process.env.NEXT_PUBLIC_APP_NAME || "Default App Name";

    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                    style={{ margin: 0, height: '100vh' }}
                >
                    <Layout style={{ height: '100vh' }}>
                        <NavigationMenu menuItems={menuItems} logoSrc={logoSrc} logoAlt={logoAlt} />
                        <Layout style={{ overflow: 'hidden' }}>
                            <ProfileHeader appName={APP_NAME} />
                                <Wrapper>{children}</Wrapper>
                            <NarrowFooter />
                        </Layout>
                    </Layout>
                </body>
            </html>
        </ClerkProvider>
    );
}