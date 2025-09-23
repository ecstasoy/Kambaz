import { use } from 'react';
import Link from 'next/link';

const courseAssignments = {
    "5610": {
        title: "CS5610 Web Development",
        sections: {
            assignments: [
                {
                    id: "A1",
                    title: "A1 - Environment Setup + HTML",
                    dueDate: "Sep 22 at 11:59pm",
                    points: 100
                }
            ],
            quizzes: [
                {
                    id: "Q1",
                    title: "Q1",
                    dueDate: "Sep 28 at 11:59pm",
                    points: 50
                }
            ],
            exams: [
                {
                    id: "E1",
                    title: "Midterm Exam",
                    dueDate: "Oct 27 at 11:59pm",
                    points: 200
                },
                {
                    id: "E2",
                    title: "Final Exam",
                    dueDate: "Dec 8 at 11:59pm",
                    points: 200
                }
            ],
            project: [
                {
                    id: "P1",
                    title: "Final Project",
                    dueDate: "Dec 10 at 11:59pm",
                    points: 300
                }
            ]
        }
    },
    "5700": {
        title: "CS5700 Computer Networks",
        sections: {
            assignments: [
                {
                    id: "A1",
                    title: "A1",
                    dueDate: "Sep 20 at 11:59pm",
                    points: 100
                }
            ],
            quizzes: [
                {
                    id: "Q1",
                    title: "Q1",
                    dueDate: "Sep 25 at 11:59pm",
                    points: 75
                }
            ],
            exams: [
                {
                    id: "E1",
                    title: "Final Exam",
                    dueDate: "Dec 17 at 11:59pm",
                    points: 250
                }
            ],
            project: [
                {
                    id: "P1",
                    title: "Final Project",
                    dueDate: "Dec 8 at 11:59pm",
                    points: 400
                }
            ]
        }
    },
    "5800": {
        title: "CS5800 Algorithms",
        sections: {
            assignments: [
                {
                    id: "A1",
                    title: "A1",
                    dueDate: "Sep 18 at 11:59pm",
                    points: 100
                }
            ],
            quizzes: [
                {
                    id: "Q1",
                    title: "Q1",
                    dueDate: "Sep 22 at 11:59pm",
                    points: 60
                }
            ],
            exams: [
                {
                    id: "E1",
                    title: "Final Exam",
                    dueDate: "Dec 20 at 11:59pm",
                    points: 300
                }
            ],
            project: [
                {
                    id: "P1",
                    title: "Final Project",
                    dueDate: "Dec 12 at 11:59pm",
                    points: 500
                }
            ]
        }
    }
};

export default function Assignments({
    params,
}: {
    params: Promise<{ cid: string }>;
}) {
    const { cid } = use(params);
    const course = courseAssignments[cid as keyof typeof courseAssignments];

    if (!course) {
        return <div>Course not found</div>;
    }

    const renderSection = (sectionTitle: string, items: any[], percentage: string) => (
        <div key={sectionTitle} className="wd-assignment-section">
            <h3 id={`wd-${sectionTitle.toLowerCase()}-title`}>
                {sectionTitle.toUpperCase()} {percentage} of Total <button>+</button>
            </h3>
            <ul className="wd-assignment-list">
                {items.map((item, index) => (
                    <li key={index} className="wd-assignment-list-item">
                        <Link
                            href={`/Courses/${cid}/Assignments/${item.id}`}
                            className="wd-assignment-link"
                        >
                            <div>
                                <strong>{item.title}</strong>
                                <br />
                                <small>Due: {item.dueDate} | Points: {item.points}</small>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <hr />
        </div>
    );

    return (
        <div id="wd-assignments">
            <input placeholder="Search for Assignments" id="wd-search-assignment"/>
            <button id="wd-add-assignment-group">+ Group</button>
            <button id="wd-add-assignment">+ Assignment</button>
            
            <h2>{course.title}</h2>
            
            {renderSection("Assignments", course.sections.assignments, "40%")}
            {renderSection("Quizzes", course.sections.quizzes, "10%")}
            {renderSection("Exams", course.sections.exams, "30%")}
            {renderSection("Project", course.sections.project, "20%")}
        </div>
    );
}
