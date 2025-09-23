import { use } from 'react';

const courseInfo = {
    "5610": {
        title: "CS5610 Web Development",
        status: "Published",
        enrollment: "45 students"
    },
    "5700": {
        title: "CS5700 Computer Networks", 
        status: "Published",
        enrollment: "38 students"
    },
    "5800": {
        title: "CS5800 Algorithms",
        status: "Published", 
        enrollment: "52 students"
    }
};

export default function CourseStatus({
    params,
}: {
    params: Promise<{ cid: string }>;
}) {
    const { cid } = use(params);
    const course = courseInfo[cid as keyof typeof courseInfo];

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div id="wd-course-status">
            <h2>{course.title}</h2>
            <p>Status: {course.status}</p>
            <p>Enrollment: {course.enrollment}</p>
            <button>Unpublish</button>
            <button>Publish</button>
            <button>View Course Notifications</button>
        </div>
    );
}
