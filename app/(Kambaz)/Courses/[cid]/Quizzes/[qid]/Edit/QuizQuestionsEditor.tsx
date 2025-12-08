import { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { FaPlus, FaTrash, FaPencilAlt } from "react-icons/fa";
import * as client from "../../client";

export default function QuizQuestionsEditor({ quizId }: { quizId: string }) {
    const [questions, setQuestions] = useState<any[]>([]);
    const [editingQuestion, setEditingQuestion] = useState<any>(null);
    const [isNewQuestion, setIsNewQuestion] = useState(false);

    const fetchQuestions = async () => {
        const q = await client.findQuestionsForQuiz(quizId);
        setQuestions(q);
    };

    useEffect(() => {
        if (quizId) fetchQuestions();
    }, [quizId]);

    const handleNewQuestion = () => {
        setEditingQuestion({
            title: "New Question",
            points: 0,
            type: "MULTIPLE_CHOICE",
            question: "Question text",
            choices: [],
            correctAnswers: []
        });
        setIsNewQuestion(true);
    };

    const handleEditQuestion = (question: any) => {
        setEditingQuestion(question);
        setIsNewQuestion(false);
    };

    const handleCancelEdit = () => {
        setEditingQuestion(null);
    };

    const handleSaveQuestion = async () => {
        if (isNewQuestion) {
            await client.createQuestion(quizId, editingQuestion);
        } else {
            await client.updateQuestion(editingQuestion);
        }
        setEditingQuestion(null);
        fetchQuestions();
    };

    const handleDeleteQuestion = async (questionId: string) => {
        await client.deleteQuestion(questionId);
        fetchQuestions();
    };
    
    // Helper to update editing question state
    const updateEditingQuestion = (field: string, value: any) => {
        setEditingQuestion({ ...editingQuestion, [field]: value });
    };

    if (editingQuestion) {
        return (
            <div className="border p-3 rounded">
                <div className="d-flex justify-content-between mb-3">
                    <Form.Control
                        type="text"
                        value={editingQuestion.title}
                        onChange={(e) => updateEditingQuestion("title", e.target.value)}
                        placeholder="Question Title"
                        style={{ width: "200px" }}
                    />
                    <Form.Select
                        value={editingQuestion.type}
                        onChange={(e) => updateEditingQuestion("type", e.target.value)}
                        style={{ width: "200px" }}
                    >
                        <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                        <option value="TRUE_FALSE">True/False</option>
                        <option value="FILL_IN_BLANK">Fill in the Blank</option>
                    </Form.Select>
                    <div className="d-flex align-items-center">
                        <span className="me-2">pts:</span>
                        <Form.Control
                            type="number"
                            value={editingQuestion.points}
                            onChange={(e) => updateEditingQuestion("points", parseInt(e.target.value))}
                            style={{ width: "70px" }}
                        />
                    </div>
                </div>
                <hr />
                <div className="mb-3">
                    <p>Enter your question and multiple answers, then select the one correct answer.</p>
                    <Form.Label>Question:</Form.Label>
                     <Form.Control
                        as="textarea"
                        rows={3}
                        value={editingQuestion.question}
                        onChange={(e) => updateEditingQuestion("question", e.target.value)}
                    />
                </div>
                
                <div className="mb-3">
                    <Form.Label>Answers:</Form.Label>
                    {editingQuestion.type === "MULTIPLE_CHOICE" && (
                        <div>
                            {editingQuestion.choices?.map((choice: any, index: number) => (
                                <div key={index} className="d-flex align-items-center mb-2">
                                    <Form.Check 
                                        type="radio" 
                                        name="correctChoice"
                                        checked={choice.isCorrect}
                                        onChange={() => {
                                            const newChoices = editingQuestion.choices.map((c: any, i: number) => ({
                                                ...c,
                                                isCorrect: i === index
                                            }));
                                            updateEditingQuestion("choices", newChoices);
                                        }}
                                        className="me-2"
                                    />
                                    <Form.Control
                                        as="textarea"
                                        value={choice.text}
                                        onChange={(e) => {
                                            const newChoices = [...editingQuestion.choices];
                                            newChoices[index].text = e.target.value;
                                            updateEditingQuestion("choices", newChoices);
                                        }}
                                        className="me-2"
                                    />
                                    <Button variant="outline-danger" size="sm" onClick={() => {
                                         const newChoices = editingQuestion.choices.filter((_: any, i: number) => i !== index);
                                         updateEditingQuestion("choices", newChoices);
                                    }}>
                                        <FaTrash />
                                    </Button>
                                </div>
                            ))}
                            <div className="text-end">
                                <Button variant="link" onClick={() => {
                                    const newChoices = [...(editingQuestion.choices || []), { text: "", isCorrect: false }];
                                    updateEditingQuestion("choices", newChoices);
                                }}>
                                    + Add Another Answer
                                </Button>
                            </div>
                        </div>
                    )}
                    
                    {editingQuestion.type === "TRUE_FALSE" && (
                         <div>
                            {/* Typically True/False is just two fixed options */}
                            {["True", "False"].map((opt) => (
                                <div key={opt} className="d-flex align-items-center mb-2">
                                    <Form.Check 
                                        type="radio"
                                        name="tfAnswer"
                                        label={opt}
                                        checked={editingQuestion.choices?.find((c: any) => c.text === opt)?.isCorrect}
                                        onChange={() => {
                                             const newChoices = [
                                                 { text: "True", isCorrect: opt === "True" },
                                                 { text: "False", isCorrect: opt === "False" }
                                             ];
                                             updateEditingQuestion("choices", newChoices);
                                        }}
                                    />
                                </div>
                            ))}
                         </div>
                    )}

                    {editingQuestion.type === "FILL_IN_BLANK" && (
                        <div>
                             {editingQuestion.correctAnswers?.map((ans: string, index: number) => (
                                <div key={index} className="d-flex align-items-center mb-2">
                                    <Form.Label className="me-2 mb-0">Possible Answer:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={ans}
                                        onChange={(e) => {
                                            const newAns = [...editingQuestion.correctAnswers];
                                            newAns[index] = e.target.value;
                                            updateEditingQuestion("correctAnswers", newAns);
                                        }}
                                        className="me-2"
                                    />
                                    <Button variant="outline-danger" size="sm" onClick={() => {
                                         const newAns = editingQuestion.correctAnswers.filter((_: any, i: number) => i !== index);
                                         updateEditingQuestion("correctAnswers", newAns);
                                    }}>
                                        <FaTrash />
                                    </Button>
                                </div>
                            ))}
                             <div className="text-end">
                                <Button variant="link" onClick={() => {
                                    const newAns = [...(editingQuestion.correctAnswers || []), ""];
                                    updateEditingQuestion("correctAnswers", newAns);
                                }}>
                                    + Add Another Answer
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="d-flex gap-2">
                    <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                    <Button variant="danger" onClick={handleSaveQuestion}>Update Question</Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-center mb-4">
                <Button variant="secondary" onClick={handleNewQuestion}>
                    <FaPlus className="me-1" /> New Question
                </Button>
            </div>
            {questions.length === 0 && <div className="text-center text-muted">No questions yet.</div>}
            {questions.map((q) => (
                <div key={q._id} className="border p-3 mb-3 bg-light">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                            <span className="fw-bold">{q.title}</span>
                            <span className="badge bg-secondary">{q.type}</span>
                            <span className="text-muted">{q.points} pts</span>
                        </div>
                        <div>
                            <Button variant="link" onClick={() => handleEditQuestion(q)} className="me-2">
                                <FaPencilAlt />
                            </Button>
                            <Button variant="link" className="text-danger" onClick={() => handleDeleteQuestion(q._id)}>
                                <FaTrash />
                            </Button>
                        </div>
                    </div>
                    <div className="mt-2">
                        {q.question}
                    </div>
                </div>
            ))}
        </div>
    );
}

