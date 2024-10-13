import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// Define the props type for the Header component
interface HeaderProps {
    appName: string;
}

export default function Header({ appName }: HeaderProps) {
    return (
        <header
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 20,
            }}
        >
            <h1>{appName}</h1>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton />
            </SignedOut>
        </header>
    );
}
