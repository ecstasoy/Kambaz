
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

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

export default async function Modules({
                                    params,
                                }: {
    params: Promise<{ cid: string }>;
}) {
    const {cid} = await params;
    const course = courseContent[cid as keyof typeof courseContent];

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div>
            <ModulesControls />
            <br /><br /><br /><br />
            <ListGroup className="rounded-0" id="wd-modules">
                {course.modules.map((module, moduleIndex) => (
                    <ListGroupItem key={moduleIndex} className="wd-module p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
                            {module.title}
                            <ModuleControlButtons />
                        </div>
                        <ListGroup className="wd-lessons rounded-0">
                            {module.lessons.map((lesson, lessonIndex) => (
                                <ListGroupItem key={lessonIndex} className="wd-lesson p-3 ps-1">
                                    <BsGripVertical className="me-2 fs-3" />
                                    {lesson.title}
                                    <LessonControlButtons />
                                </ListGroupItem>
                            ))}
                            {module.lessons.map((lesson, lessonIndex) => 
                                lesson.content.map((item, itemIndex) => (
                                    <ListGroupItem key={`${lessonIndex}-${itemIndex}`} className="wd-lesson p-3 ps-1">
                                        <BsGripVertical className="me-2 fs-3" />
                                        {item}
                                        <LessonControlButtons />
                                    </ListGroupItem>
                                ))
                            )}
                        </ListGroup>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}
