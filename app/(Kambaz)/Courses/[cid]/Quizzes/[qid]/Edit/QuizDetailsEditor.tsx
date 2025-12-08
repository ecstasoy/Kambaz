import { Form, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function QuizDetailsEditor({ quiz, onSave, onCancel }: { quiz: any, onSave: (q: any) => void, onCancel: () => void }) {
    const [localQuiz, setLocalQuiz] = useState(quiz);

    useEffect(() => {
        setLocalQuiz(quiz);
    }, [quiz]);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setLocalQuiz({
            ...localQuiz,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleDateChange = (e: any) => {
        const { name, value } = e.target;
        setLocalQuiz({ ...localQuiz, [name]: value });
    };

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Control 
                    type="text" 
                    name="title" 
                    value={localQuiz.title} 
                    onChange={handleChange} 
                    placeholder="Quiz Title"
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Quiz Instructions</Form.Label>
                {/* Placeholder for WYSIWYG editor */}
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    name="description" 
                    value={localQuiz.description} 
                    onChange={handleChange} 
                />
            </Form.Group>

            <Row className="mb-3 align-items-center">
                <Col md={3}>Points</Col>
                <Col md={9}>
                    <Form.Control 
                        type="number" 
                        name="points" 
                        value={localQuiz.points} 
                        onChange={handleChange}
                    />
                </Col>
            </Row>

            <Form.Group className="mb-3" controlId="shuffleAnswers">
                 <Form.Check 
                    type="checkbox" 
                    label="Shuffle Answers"
                    name="shuffleAnswers"
                    checked={localQuiz.shuffleAnswers}
                    onChange={handleChange}
                />
            </Form.Group>

             <Form.Group className="mb-3">
                <Form.Label>Time Limit (Minutes)</Form.Label>
                <Form.Control 
                    type="number" 
                    name="timeLimit" 
                    value={localQuiz.timeLimit} 
                    onChange={handleChange}
                    disabled={false} 
                />
            </Form.Group>

            <Form.Group className="mb-3 border p-3">
                <Form.Label>Assign</Form.Label>
                <Form.Group className="mb-2">
                    <Form.Label>Due</Form.Label>
                    <Form.Control 
                        type="date" 
                        name="dueDate" 
                        value={localQuiz.dueDate ? localQuiz.dueDate.split('T')[0] : ''} 
                        onChange={handleDateChange} 
                    />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-2">
                            <Form.Label>Available From</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="availableDate" 
                                value={localQuiz.availableDate ? localQuiz.availableDate.split('T')[0] : ''} 
                                onChange={handleDateChange} 
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-2">
                            <Form.Label>Until</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="untilDate" 
                                value={localQuiz.untilDate ? localQuiz.untilDate.split('T')[0] : ''} 
                                onChange={handleDateChange} 
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form.Group>
            
            <hr/>
            
            <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button variant="danger" onClick={() => onSave(localQuiz)}>Save</Button>
            </div>
        </Form>
    );
}

