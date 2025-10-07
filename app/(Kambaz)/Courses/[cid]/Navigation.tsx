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
    
    const isActive = (path: string) => {
        return pathname.includes(path);
    };
    
    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            <Link 
                href={`/Courses/${cid}/Home`} 
                id="wd-course-home-link" 
                className={`list-group-item list-group-item-action border-0 ${
                    isActive("/Home") ? "text-black border-start border-dark border-3" : "text-danger"
                }`}
            >
                Home
            </Link>
            <Link 
                href={`/Courses/${cid}/Modules`} 
                id="wd-course-modules-link" 
                className={`list-group-item list-group-item-action border-0 ${
                    isActive("/Modules") ? "text-black border-start border-dark border-3" : "text-danger"
                }`}
            >
                Modules
            </Link>
            <Link 
                href={`/Courses/${cid}/Piazza`} 
                id="wd-course-piazza-link" 
                className={`list-group-item list-group-item-action border-0 ${
                    isActive("/Piazza") ? "text-black border-start border-dark border-3" : "text-danger"
                }`}
            >
                Piazza
            </Link>
            <Link 
                href={`/Courses/${cid}/Zoom`} 
                id="wd-course-zoom-link" 
                className={`list-group-item list-group-item-action border-0 ${
                    isActive("/Zoom") ? "text-black border-start border-dark border-3" : "text-danger"
                }`}
            >
                Zoom
            </Link>
            <Link 
                href={`/Courses/${cid}/Assignments`} 
                id="wd-course-assignments-link" 
                className={`list-group-item list-group-item-action border-0 ${
                    isActive("/Assignments") ? "text-black border-start border-dark border-3" : "text-danger"
                }`}
            >
                Assignments
            </Link>
            <Link 
                href={`/Courses/${cid}/Quizzes`} 
                id="wd-course-quizzes-link" 
                className={`list-group-item list-group-item-action border-0 ${
                    isActive("/Quizzes") ? "text-black border-start border-dark border-3" : "text-danger"
                }`}
            >
                Quizzes
            </Link>
            <Link 
                href={`/Courses/${cid}/Grades`} 
                id="wd-course-grades-link" 
                className={`list-group-item list-group-item-action border-0 ${
                    isActive("/Grades") ? "text-black border-start border-dark border-3" : "text-danger"
                }`}
            >
                Grades
            </Link>
            <Link 
                href={`/Courses/${cid}/People/Table`} 
                id="wd-course-people-link" 
                className={`list-group-item list-group-item-action border-0 ${
                    isActive("/People") ? "text-black border-start border-dark border-3" : "text-danger"
                }`}
            >
                People
            </Link>
            <br/>
        </div>
    );
}
