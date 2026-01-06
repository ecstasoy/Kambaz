"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Form, Modal, Dropdown } from 'react-bootstrap';
import { FaPlus, FaSearch, FaTrash, FaEdit, FaCheckCircle, FaBan } from 'react-icons/fa';
import { BsGripVertical } from 'react-icons/bs';
import { IoEllipsisVertical } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { setQuizzes } from './reducer';
import * as client from './client';

export default function Quizzes() {
    const { cid } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
    
    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    
    useEffect(() => {
        fetchQuizzes();
    }, []);
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState<string | null>(null);
    
    const handleAddQuiz = async () => {
        const newQuiz = {
            title: "New Quiz",
            course: cid,
            description: "New Quiz Description",
            points: 0,
            dueDate: new Date().toISOString().split('T')[0],
            availableDate: new Date().toISOString().split('T')[0],
            untilDate: new Date().toISOString().split('T')[0],
            published: false,
            questions: []
        };
        const quiz = await client.createQuiz(cid as string, newQuiz);
        router.push(`/Courses/${cid}/Quizzes/${quiz._id}`);
    };

    const handleEditQuiz = (quizId: string) => {
        router.push(`/Courses/${cid}/Quizzes/${quizId}`);
    };
    
    const handleDeleteClick = (quizId: string) => {
        setQuizToDelete(quizId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (quizToDelete) {
            try {
                await client.deleteQuiz(quizToDelete);
                fetchQuizzes();
            } catch (error) {
                console.error("Error deleting quiz:", error);
            }
        }
        setShowDeleteModal(false);
        setQuizToDelete(null);
    };

    const togglePublish = async (quiz: any) => {
        await client.updateQuiz({ ...quiz, published: !quiz.published });
        fetchQuizzes();
    };

    const sortedQuizzes = [...quizzes].sort((a: any, b: any) => {
        return new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime();
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getAvailabilityStatus = (quiz: any) => {
        const now = new Date();
        const available = new Date(quiz.availableDate);
        const until = new Date(quiz.untilDate);
        
        if (now < available) {
            return `Not available until ${formatDate(quiz.availableDate)}`;
        } else if (now > until) {
            return "Closed";
        } else {
            return "Available";
        }
    };

    return (
        <div id="wd-quizzes">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="position-relative" style={{ width: "300px" }}>
                    <Form.Control 
                        placeholder="Search for Quiz" 
                        id="wd-search-quiz"
                        className="ps-5"
                    />
                    <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                </div>
                
                <div>
                    {isFaculty && (
                        <Button variant="danger" id="wd-add-quiz" onClick={handleAddQuiz}>
                            <FaPlus className="me-1" /> Quiz
                        </Button>
                    )}
                </div>
            </div>
            
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center p-3 bg-secondary">
                    <h5 className="mb-0">
                        <BsGripVertical className="me-2" />
                        Assignment Quizzes
                    </h5>
                </div>
                <div className="border border-gray">
                    {sortedQuizzes.length === 0 && (
                        <div className="p-4 text-center text-muted">
                            No quizzes available. Click + Quiz to add one.
                        </div>
                    )}
                    {sortedQuizzes.map((quiz: any) => (
                        <div key={quiz._id} className="wd-quiz-list-item border-start border-success border-3 p-3 border-bottom">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center flex-grow-1">
                                    <BsGripVertical className="me-2 text-success fs-4" />
                                    <div className="ms-2">
                                        <Link
                                            href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                                            className="wd-quiz-link text-decoration-none text-dark fw-bold fs-5"
                                        >
                                            {quiz.title}
                                        </Link>
                                        <br />
                                        <small className="text-muted">
                                            {getAvailabilityStatus(quiz)} | 
                                            Due {formatDate(quiz.dueDate)} | 
                                            {quiz.points} pts | 
                                            {quiz.questions ? quiz.questions.length : 0} Questions
                                        </small>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    {isFaculty ? (
                                        <>
                                            {quiz.published ? (
                                                <FaCheckCircle className="text-success fs-4 me-3" title="Published" />
                                            ) : (
                                                <FaBan className="text-danger fs-4 me-3" title="Unpublished" />
                                            )}
                                            
                                            <Dropdown>
                                                <Dropdown.Toggle variant="link" className="text-dark p-0 border-0" id={`wd-quiz-menu-${quiz._id}`}>
                                                    <IoEllipsisVertical className="fs-4" />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleEditQuiz(quiz._id)}>
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleDeleteClick(quiz._id)}>
                                                        Delete
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => togglePublish(quiz)}>
                                                        {quiz.published ? "Unpublish" : "Publish"}
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </>
                                    ) : (
                                        <div className="text-muted">
                                            {quiz.published ? "Published" : "Closed"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove this quiz?
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
