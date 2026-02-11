import { SignupForm } from "../components/signup-form";
import HeaderLogo from "../components/header-logo";

export default function SignUpPage() {
    return (
        <div className="bg-white flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <HeaderLogo />
                <SignupForm />
            </div>
        </div>
    );
}
