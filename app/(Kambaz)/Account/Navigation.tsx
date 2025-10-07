"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
    const pathname = usePathname();
    
    const isActive = (path: string) => {
        return pathname.includes(path);
    };
    
    return (
        <div id="wd-account-navigation" className="list-group">
            <Link 
                href="/Account/Signin" 
                id="wd-signin-link"
                className={`list-group-item list-group-item-action border-0 ${
                    isActive("Signin") ? "text-black border-start border-dark border-3" : "text-danger"
                }`}
            >
                Signin
            </Link>
            <Link 
                href="/Account/Signup" 
                id="wd-signup-link"
                className={`list-group-item list-group-item-action border-0 ${
                    isActive("Signup") ? "text-black border-start border-dark border-3" : "text-danger"
                }`}
            >
                Signup
            </Link>
            <Link 
                href="/Account/Profile" 
                id="wd-profile-link"
                className={`list-group-item list-group-item-action border-0 ${
                    isActive("Profile") ? "text-black border-start border-dark border-3" : "text-danger"
                }`}
            >
                Profile
            </Link>
        </div>
    );
}
