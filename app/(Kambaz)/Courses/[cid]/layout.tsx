"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";
import {FaAlignJustify} from "react-icons/fa";
export default function CoursesLayout({ 
    children, 
    params 
}: { 
    children: ReactNode;
    params: Promise<{ cid: string }>;
}) {
    const { cid } = useParams();
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const course = courses.find((course: any) => course._id === cid);
    const [isNavigationVisible, setIsNavigationVisible] = useState(true);

    const toggleNavigation = () => {
        setIsNavigationVisible(!isNavigationVisible);
    };

    return (
        <div id="wd-courses">
            <h2>
                <FaAlignJustify 
                    className="me-4 fs-4 mb-1" 
                    onClick={toggleNavigation}
                    style={{ cursor: 'pointer' }}
                    title="Toggle navigation"
                />
                {course?.name}
            </h2>
            <hr />
            <div className="d-flex">
                {isNavigationVisible && (
                    <div>
                        <CourseNavigation params={params} />
                    </div>
                )}
                <div className="flex-fill">{children}</div>
            </div>
        </div>
    );
}
