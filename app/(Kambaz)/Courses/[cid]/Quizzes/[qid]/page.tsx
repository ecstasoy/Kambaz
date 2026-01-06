"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Row, Col, Table } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';
import * as client from '../client';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const router = useRouter();
    const [quiz, setQuiz] = useState<any>(null);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";


    const fetchQuiz = async () => {
        const q = await client.findQuizById(qid as string);
        setQuiz(q);
    };

    useEffect(() => {
        fetchQuiz();
    }, [qid]);

    const handlePublishToggle = async () => {
        const updatedQuiz = { ...quiz, published: !quiz.published };
        await client.updateQuiz(updatedQuiz);
        setQuiz(updatedQuiz);
    };

    if (!quiz) return <div>Loading...</div>;

    return (
        <div id="wd-quiz-details">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex gap-2">
                    {isFaculty ? (
                        <>
                            <Button 
                                variant={quiz.published ? "success" : "secondary"}
                                onClick={handlePublishToggle}
                                id="wd-quiz-publish-btn"
                            >
                                {quiz.published ? "Published" : "Unpublished"}
                            </Button>
                            <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)}>
                                Preview
                            </Button>
                            <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Edit`)}>
                                <FaPencilAlt className="me-1" /> Edit
                            </Button>
                        </>
                    ) : (
                        <Button variant="primary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)}>
                            Start Quiz
                        </Button>
                    )}
                </div>
            </div>

            <hr />

            <h2 className="mb-4">{quiz.title}</h2>

            <Row>
                <Col md={8} className="mx-auto">
                    <div className="d-flex justify-content-between gap-5">
                    <div className="d-flex flex-column align-items-end fw-bold text-nowrap">
                        <p>Quiz Type</p>
                        <p>Points</p>
                        <p>Assignment Group</p>
                        <p>Shuffle Answers</p>
                        <p>Time Limit</p>
                        <p>Multiple Attempts</p>
                        <p>Show Correct Answers</p>
                        <p>Access Code</p>
                        <p>One Question at a Time</p>
                        <p>Webcam Required</p>
                        <p>Lock Questions After Answering</p>
                    </div>
                    <div className="d-flex flex-column align-items-start text-muted">
                        <p>Graded Quiz</p>
                        <p>{quiz.points}</p>
                        <p>Quizzes</p>
                        <p>{quiz.shuffleAnswers ? "Yes" : "No"}</p>
                        <p>{quiz.timeLimit} Minutes</p>
                        <p>No</p>
                        <p>{quiz.showCorrectAnswers ? "Immediately" : "No"}</p>
                        <p>{quiz.accessCode || "None"}</p>
                        <p>{quiz.oneQuestionAtATime ? "Yes" : "No"}</p>
                        <p>{quiz.webcamRequired ? "Yes" : "No"}</p>
                        <p>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</p>
                    </div>
                    </div>
                    
                    <Table bordered className="mt-4">
                        <thead>
                            <tr>
                                <th>Due</th>
                                <th>For</th>
                                <th>Available from</th>
                                <th>Until</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{new Date(quiz.dueDate).toLocaleDateString()}</td>
                                <td>Everyone</td>
                                <td>{new Date(quiz.availableDate).toLocaleDateString()}</td>
                                <td>{new Date(quiz.untilDate).toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    );
}

