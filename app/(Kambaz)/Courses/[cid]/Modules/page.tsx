import {use} from 'react';

const courseContent = {
    "5610": {
        title: "CS5610 Web Development",
        modules: [
            {
                title: "Week 1 - HTML & CSS Basics",
                lessons: [
                    {
                        title: "LEARNING OBJECTIVES",
                        content: [
                            "Introduction to Web Development",
                            "HTML fundamentals",
                        ]
                    }
                ]
            },
            {
                title: "Week 2 - JavaScript Fundamentals",
                lessons: [
                    {
                        title: "LEARNING OBJECTIVES",
                        content: [
                            "JavaScript syntax and variables",
                            "JS Functions",
                        ]
                    }
                ]
            }
        ]
    },
    "5700": {
        title: "CS5700 Computer Networks",
        modules: [
            {
                title: "Week 1 - Network Fundamentals",
                lessons: [
                    {
                        title: "LEARNING OBJECTIVES",
                        content: [
                            "Introduction to Computer Networks",
                            "OSI Model"
                        ]
                    }
                ]
            },
            {
                title: "Week 2 - Physical & Data Link Layer",
                lessons: [
                    {
                        title: "LEARNING OBJECTIVES",
                        content: [
                            "Physical transmission media",
                            "Error detection"
                        ]
                    }
                ]
            }
        ]
    },
    "5800": {
        title: "CS5800 Algorithms",
        modules: [
            {
                title: "Week 1 - Algorithm Analysis",
                lessons: [
                    {
                        title: "LEARNING OBJECTIVES",
                        content: [
                            "Introduction to Algorithms",
                            "Big O notation"
                        ]
                    }
                ]
            },
            {
                title: "Week 2 - Sorting Algorithms",
                lessons: [
                    {
                        title: "LEARNING OBJECTIVES",
                        content: [
                            "Bubble sort, Selection sort",
                            "Merge sort, Quick sort",
                        ]
                    }
                ]
            }
        ]
    }
};

export default function Modules({
                                    params,
                                }: {
    params: Promise<{ cid: string }>;
}) {
    const {cid} = use(params);
    const course = courseContent[cid as keyof typeof courseContent];

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div>
            <h2>{course.title} - Modules</h2>
            <ul id="wd-modules">
                {course.modules.map((module, moduleIndex) => (
                    <li key={moduleIndex} className="wd-module">
                        <div className="wd-title">{module.title}</div>
                        <ul className="wd-lessons">
                            {module.lessons.map((lesson, lessonIndex) => (
                                <li key={lessonIndex} className="wd-lesson">
                                    <span className="wd-title">{lesson.title}</span>
                                    <ul className="wd-content">
                                        {lesson.content.map((item, itemIndex) => (
                                            <li key={itemIndex} className="wd-content-item">{item}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
