"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { addAssignment, updateAssignment, setAssignments } from "./reducer";
import * as client from "./client";

interface AssignmentEditorProps {
    assignmentId?: string;
    onClose?: () => void;
}

export default function AssignmentEditor({ assignmentId, onClose }: AssignmentEditorProps) {
    const { cid } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    
    const [assignment, setAssignment] = useState({
        _id: "",
        title: "",
        description: "",
        points: 100,
        dueDate: "",
        availableFrom: "",
        availableUntil: "",
        course: cid as string,
        type: "assignment"
    });

    useEffect(() => {
        if (assignmentId) {
            const existingAssignment = assignments.find((a: any) => a._id === assignmentId);
            if (existingAssignment) {
                const existing = existingAssignment as any;
                setAssignment({
                    _id: existing._id,
                    title: existing.title,
                    description: existing.description,
                    points: existing.points,
                    dueDate: existing.dueDate,
                    availableFrom: existing.availableFrom || "",
                    availableUntil: existing.availableUntil || "",
                    course: existing.course,
                    type: existing.type || "assignment",
                });
            }
        }
    }, [assignmentId, assignments]);

    const handleSave = async () => {
        try {
            if (assignmentId) {
                await client.updateAssignment(assignment);
                const assignments = await client.findAssignmentsForCourse(cid as string);
                dispatch(setAssignments(assignments));
            } else {
                await client.createAssignmentForCourse(cid as string, assignment);
                const assignments = await client.findAssignmentsForCourse(cid as string);
                dispatch(setAssignments(assignments));
            }
            if (onClose) {
                onClose();
            } else {
                router.push(`/Courses/${cid}/Assignments`);
            }
        } catch (error) {
            console.error("Error saving assignment:", error);
        }
    };

    const handleCancel = () => {
        if (onClose) {
            onClose();
        } else {
            router.push(`/Courses/${cid}/Assignments`);
        }
    };

    return (
        <div id="wd-assignments-editor">
            <div className="mb-4">
                <h5 className="text-muted">
                    Assignment Editor
                </h5>
            </div>
            
            <Form>
                <div className="mb-3">
                    <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
                    <Form.Control 
                        id="wd-name" 
                        value={assignment.title}
                        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <Form.Label htmlFor="wd-description">Description</Form.Label>
                    <Form.Control 
                        as="textarea"
                        id="wd-description" 
                        rows={6}
                        value={assignment.description}
                        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
                    />
                </div>

                <Row>
                    <Col md={6}>
                        <div className="mb-3">
                            <Form.Label htmlFor="wd-points">Points</Form.Label>
                            <Form.Control 
                                id="wd-points" 
                                type="number"
                                value={assignment.points}
                                onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <Form.Label htmlFor="wd-due-date">Due Date</Form.Label>
                            <Form.Control 
                                id="wd-due-date" 
                                type="date"
                                value={assignment.dueDate}
                                onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                            />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <div className="mb-3">
                            <Form.Label htmlFor="wd-available-from">Available From</Form.Label>
                            <Form.Control 
                                id="wd-available-from" 
                                type="date"
                                value={assignment.availableFrom}
                                onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })}
                            />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <Form.Label htmlFor="wd-available-until">Available Until</Form.Label>
                            <Form.Control 
                                id="wd-available-until" 
                                type="date"
                                value={assignment.availableUntil}
                                onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
                            />
                        </div>
                    </Col>
                </Row>

                <div className="mb-3">
                    <Form.Label htmlFor="wd-assignment-type">Assignment Type</Form.Label>
                    <Form.Select 
                        id="wd-assignment-type"
                        value={assignment.type}
                        onChange={(e) => setAssignment({ ...assignment, type: e.target.value })}
                    >
                        <option value="assignment">Assignment</option>
                        <option value="quiz">Quiz</option>
                        <option value="exam">Exam</option>
                        <option value="project">Project</option>
                    </Form.Select>
                </div>

                <hr />
                
                <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </Form>
        </div>
    );
}
