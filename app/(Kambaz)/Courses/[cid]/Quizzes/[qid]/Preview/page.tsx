"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button, Card, Form, Row, Col, Alert } from 'react-bootstrap';
import { FaExclamationCircle } from 'react-icons/fa';
import * as client from '../../client';

export default function QuizPreview() {
    const { cid, qid } = useParams();
    const [questions, setQuestions] = useState<any[]>([]);
    const [quiz, setQuiz] = useState<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [startTime] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            const q = await client.findQuizById(qid as string);
            setQuiz(q);
            const qs = await client.findQuestionsForQuiz(qid as string);
            setQuestions(qs);
        };
        fetchData();
    }, [qid]);

    const handleAnswerChange = (questionId: string, answer: any) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    if (!quiz || questions.length === 0) return <div className="p-4">Loading Quiz or No Questions...</div>;

    const currentQuestion = questions[currentIndex];

    return (
        <div id="wd-quiz-preview" className="p-4">
            <Alert variant="info" className="d-flex align-items-center">
                <FaExclamationCircle className="me-2" />
                This is a preview of the published version of the quiz
            </Alert>

            <h2 className="mb-2">{quiz.title}</h2>
            <div className="mb-4 text-muted">
                Started: {startTime.toLocaleString()}
                <br />
                <h3>Quiz Instructions</h3>
                <p>{quiz.description}</p>
            </div>
            <hr />

            <Row>
                <Col md={9}>
                    <Card className="mb-3">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">{currentQuestion.title}</h5>
                            <span className="badge bg-secondary">{currentQuestion.points} pts</span>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
                            
                            <div className="mt-3">
                                {currentQuestion.type === "MULTIPLE_CHOICE" && (
                                    <Form>
                                        {currentQuestion.choices?.map((choice: any, idx: number) => (
                                            <Form.Check
                                                key={idx}
                                                type="radio"
                                                name={`question-${currentQuestion._id}`}
                                                id={`choice-${currentQuestion._id}-${idx}`}
                                                label={choice.text}
                                                checked={answers[currentQuestion._id] === choice.text}
                                                onChange={() => handleAnswerChange(currentQuestion._id, choice.text)}
                                                className="mb-2"
                                            />
                                        ))}
                                    </Form>
                                )}

                                {currentQuestion.type === "TRUE_FALSE" && (
                                    <Form>
                                        <Form.Check
                                            type="radio"
                                            name={`question-${currentQuestion._id}`}
                                            label="True"
                                            checked={answers[currentQuestion._id] === "True"}
                                            onChange={() => handleAnswerChange(currentQuestion._id, "True")}
                                            className="mb-2"
                                        />
                                        <Form.Check
                                            type="radio"
                                            name={`question-${currentQuestion._id}`}
                                            label="False"
                                            checked={answers[currentQuestion._id] === "False"}
                                            onChange={() => handleAnswerChange(currentQuestion._id, "False")}
                                            className="mb-2"
                                        />
                                    </Form>
                                )}

                                {currentQuestion.type === "FILL_IN_BLANK" && (
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your answer"
                                        value={answers[currentQuestion._id] || ""}
                                        onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                                    />
                                )}
                            </div>
                        </Card.Body>
                    </Card>

                    <div className="d-flex justify-content-between mt-3">
                        <Button 
                            variant="secondary" 
                            onClick={() => setCurrentIndex(currentIndex - 1)}
                            disabled={currentIndex === 0}
                        >
                            Previous
                        </Button>
                        <Button 
                            variant="secondary" 
                            onClick={() => setCurrentIndex(currentIndex + 1)}
                            disabled={currentIndex === questions.length - 1}
                        >
                            Next
                        </Button>
                    </div>

                    <div className="text-end mt-4">
                        <Button variant="primary">Submit Quiz</Button>
                    </div>
                </Col>

                <Col md={3}>
                    <Card>
                        <Card.Header>Questions</Card.Header>
                        <Card.Body>
                            <div className="d-flex flex-wrap gap-2">
                                {questions.map((q, idx) => (
                                    <Button
                                        key={q._id}
                                        variant={answers[q._id] ? "success" : (currentIndex === idx ? "primary" : "outline-secondary")}
                                        className="rounded-circle"
                                        style={{ width: "35px", height: "35px", padding: 0 }}
                                        onClick={() => setCurrentIndex(idx)}
                                    >
                                        {idx + 1}
                                    </Button>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

