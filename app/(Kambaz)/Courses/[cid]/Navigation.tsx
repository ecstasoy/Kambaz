"use client";

import Link from "next/link";
import { use } from 'react';
import { usePathname } from "next/navigation";

export default function CourseNavigation({
    params,
}: {
    params: Promise<{ cid: string }>;
}) {
    const { cid } = use(params);
    const pathname = usePathname();
    
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
    
    const isActive = (linkName: string) => {
        if (linkName === "People") {
            return pathname.includes("/People");
        }
        return pathname.includes(`/${linkName}`);
    };
    
    const getLinkHref = (linkName: string) => {
        if (linkName === "People") {
            return `/Courses/${cid}/People/Table`;
        }
        return `/Courses/${cid}/${linkName}`;
    };
    
    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((linkName) => (
                <Link 
                    key={linkName}
                    href={getLinkHref(linkName)} 
                    id={`wd-course-${linkName.toLowerCase()}-link`}
                    className={`list-group-item list-group-item-action border-0 ${
                        isActive(linkName) ? "text-black border-start border-dark border-3" : "text-danger"
                    }`}
                >
                    {linkName}
                </Link>
            ))}
        </div>
    );
}
