"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { BsGripVertical } from 'react-icons/bs';
import { IoEllipsisVertical } from 'react-icons/io5';
import * as db from "../../../Database";

export default function Assignments() {
    const { cid } = useParams();
    const assignments = db.assignments;
    const course = db.courses.find((course: any) => course._id === cid);
    
    // Group assignments by type
    const assignmentsByType = assignments
        .filter((assignment: any) => assignment.course === cid)
        .reduce((acc: any, assignment: any) => {
            const type = assignment.type || 'assignment';
            if (!acc[type]) acc[type] = [];
            acc[type].push(assignment);
            return acc;
        }, {});

    const renderSection = (sectionTitle: string, items: any[], percentage: string) => {
        if (!items || items.length === 0) return null;
        
        return (
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
                    {items.map((item: any, index: number) => (
                        <div key={index} className="wd-assignment-list-item border-start border-success border-3 p-3 border-bottom">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <BsGripVertical className="me-2 text-muted" />
                                    <Link
                                        href={`/Courses/${cid}/Assignments/${item._id}`}
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
    };

    if (!course) {
        return <div>Course not found</div>;
    }

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
            
            {renderSection("Assignments", assignmentsByType.assignment || [], "40%")}
            {renderSection("Quizzes", assignmentsByType.quiz || [], "10%")}
            {renderSection("Exams", assignmentsByType.exam || [], "30%")}
            {renderSection("Projects", assignmentsByType.project || [], "20%")}
        </div>
    );
}