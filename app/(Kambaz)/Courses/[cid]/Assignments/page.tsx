"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Form, Modal } from 'react-bootstrap';
import { FaPlus, FaSearch, FaTrash, FaEdit } from 'react-icons/fa';
import { BsGripVertical } from 'react-icons/bs';
import { IoEllipsisVertical } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { deleteAssignment, setAssignments } from './reducer';
import AssignmentEditor from './AssignmentEditor';
import * as client from './client';

export default function Assignments() {
    const { cid } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    
    const fetchAssignments = async () => {
        const assignments = await client.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };
    
    useEffect(() => {
        fetchAssignments();
    }, []);
    
    const [showEditor, setShowEditor] = useState(false);
    const [editingAssignment, setEditingAssignment] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);
    
    // Group assignments by type
    const assignmentsByType = assignments
        .filter((assignment: any) => assignment.course === cid)
        .reduce((acc: any, assignment: any) => {
            const type = assignment.type || 'assignment';
            if (!acc[type]) acc[type] = [];
            acc[type].push(assignment);
            return acc;
        }, {});

    const handleAddAssignment = () => {
        setEditingAssignment(null);
        setShowEditor(true);
    };

    const handleEditAssignment = (assignmentId: string) => {
        setEditingAssignment(assignmentId);
        setShowEditor(true);
    };
    
    const refreshAssignments = async () => {
        const assignments = await client.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
        setShowEditor(false);
    };

    const handleDeleteClick = (assignmentId: string) => {
        setAssignmentToDelete(assignmentId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (assignmentToDelete) {
            try {
                await client.deleteAssignment(assignmentToDelete);
                const assignments = await client.findAssignmentsForCourse(cid as string);
                dispatch(setAssignments(assignments));
            } catch (error) {
                console.error("Error deleting assignment:", error);
            }
        }
        setShowDeleteModal(false);
        setAssignmentToDelete(null);
    };

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
                                <div className="flex-grow-1">
                                    <BsGripVertical className="me-2 text-muted" />
                                    <span
                                        onClick={() => handleEditAssignment(item._id)}
                                        className="wd-assignment-link text-decoration-none text-dark fw-bold"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {item.title}
                                    </span>
                                    <br />
                                    <small className="text-muted ms-4">
                                        Due: {item.dueDate} | {item.points} pts
                                    </small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleEditAssignment(item._id)}
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleDeleteClick(item._id)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Remove course check since we're getting assignments from server

    if (showEditor) {
        return (
            <AssignmentEditor 
                assignmentId={editingAssignment || undefined}
                onClose={refreshAssignments}
            />
        );
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
                    <Button variant="danger" id="wd-add-assignment" onClick={handleAddAssignment}>
                        <FaPlus className="me-1" /> Assignment
                    </Button>
                </div>
            </div>
            
            {renderSection("Assignments", assignmentsByType.assignment || [], "40%")}
            {renderSection("Quizzes", assignmentsByType.quiz || [], "10%")}
            {renderSection("Exams", assignmentsByType.exam || [], "30%")}
            {renderSection("Projects", assignmentsByType.project || [], "20%")}

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove this assignment?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}