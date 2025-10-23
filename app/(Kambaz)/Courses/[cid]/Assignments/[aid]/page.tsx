"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Form, Row, Col } from 'react-bootstrap';
import * as db from "../../../../Database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const course = db.courses.find((course: any) => course._id === cid);
    const assignment = db.assignments.find((assignment: any) => assignment._id === aid);

    if (!assignment || !course) {
        return <div>Assignment not found</div>;
    }

    return (
        <div id="wd-assignments-editor">
            <div className="mb-4">
                <h5 className="text-muted">{course.name} &gt; Assignments &gt; {aid}</h5>
            </div>
            <Form>
                <div className="mb-3">
                    <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
                    <Form.Control id="wd-name" defaultValue={assignment.title} />
                </div>

                <div className="mb-3">
                    <Form.Label htmlFor="wd-description">Description</Form.Label>
                    <Form.Control 
                        as="textarea"
                        id="wd-description" 
                        rows={6}
                        defaultValue={assignment.description}
                    />
                </div>

                <Row>
                    <Col md={6}>
                        <div className="mb-3">
                            <Form.Label htmlFor="wd-points">Points</Form.Label>
                            <Form.Control 
                                id="wd-points" 
                                type="number" 
                                defaultValue={assignment.points} 
                            />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <Form.Label htmlFor="wd-assignment-group">Assignment Group</Form.Label>
                            <Form.Select id="wd-assignment-group" defaultValue="ASSIGNMENTS">
                                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                                <option value="QUIZZES">QUIZZES</option>
                                <option value="EXAMS">EXAMS</option>
                                <option value="PROJECT">PROJECT</option>
                            </Form.Select>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <div className="mb-3">
                            <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
                            <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
                                <option value="Percentage">Percentage</option>
                                <option value="Points">Points</option>
                                <option value="Letter Grade">Letter Grade</option>
                            </Form.Select>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
                            <Form.Select id="wd-submission-type" defaultValue="Online">
                                <option value="Online">Online</option>
                                <option value="Paper">Paper</option>
                                <option value="External Tool">External Tool</option>
                            </Form.Select>
                        </div>
                    </Col>
                </Row>

                <div className="mb-3">
                    <Form.Label htmlFor="wd-assign">Assign</Form.Label>
                    <div className="border p-3">
                        <Form.Control 
                            id="wd-assign" 
                            defaultValue="Everyone" 
                            className="mb-2"
                        />
                        <Row>
                            <Col md={4}>
                                <Form.Label htmlFor="wd-due-date">Due</Form.Label>
                                <Form.Control 
                                    id="wd-due-date" 
                                    type="date" 
                                    defaultValue={assignment.dueDate}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
                                <Form.Control 
                                    id="wd-available-from" 
                                    type="date" 
                                    defaultValue="2024-01-01"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                                <Form.Control 
                                    id="wd-available-until" 
                                    type="date" 
                                    defaultValue="2024-05-20"
                                />
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className="d-flex gap-2">
                    <Link 
                        href={`/Courses/${cid}/Assignments`}
                        className="btn btn-success"
                        id="wd-save-assignment-btn"
                    >
                        Save
                    </Link>
                    <Link 
                        href={`/Courses/${cid}/Assignments`}
                        className="btn btn-secondary"
                        id="wd-cancel-assignment-btn"
                    >
                        Cancel
                    </Link>
                </div>
            </Form>
        </div>
    );
}