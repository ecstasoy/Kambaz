import { use } from 'react';
import Link from 'next/link';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { BsGripVertical } from 'react-icons/bs';
import { IoEllipsisVertical } from 'react-icons/io5';

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
        <div key={sectionTitle} className="wd-assignment-section mb-4">
            <div className="d-flex justify-content-between align-items-center p-3 bg-secondary">
                <h5 className="mb-0" id={`wd-${sectionTitle.toLowerCase()}-title`}>
                    <BsGripVertical className="me-2" />
                    {sectionTitle.toUpperCase()} {percentage} of Total
                </h5>
                <div>
                    <Button variant="outline-dark" size="sm" className="me-2">
                        <FaPlus />
                    </Button>
                    <IoEllipsisVertical className="fs-5" />
                </div>
            </div>
            <div className="border border-gray">
                {items.map((item, index) => (
                    <div key={index} className="wd-assignment-list-item border-start border-success border-3 p-3 border-bottom">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <BsGripVertical className="me-2 text-muted" />
                                <Link
                                    href={`/Courses/${cid}/Assignments/${item.id}`}
                                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                                >
                                    {item.title}
                                </Link>
                                <br />
                                <small className="text-muted ms-4">
                                    Due: {item.dueDate} | {item.points} pts
                                </small>
                            </div>
                            <IoEllipsisVertical className="fs-5 text-muted" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div id="wd-assignments">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="position-relative" style={{ width: "300px" }}>
                    <Form.Control 
                        placeholder="Search for Assignments" 
                        id="wd-search-assignment"
                        className="ps-5"
                    />
                    <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                </div>
                
                <div>
                    <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
                        <FaPlus className="me-1" /> Group
                    </Button>
                    <Button variant="danger" id="wd-add-assignment">
                        <FaPlus className="me-1" /> Assignment
                    </Button>
                </div>
            </div>
            
            {renderSection("Assignments", course.sections.assignments, "40%")}
            {renderSection("Quizzes", course.sections.quizzes, "10%")}
            {renderSection("Exams", course.sections.exams, "30%")}
            {renderSection("Project", course.sections.project, "20%")}
        </div>
    );
}
