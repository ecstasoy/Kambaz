"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Tabs, Tab } from 'react-bootstrap';
import * as client from '../../client';
import QuizDetailsEditor from './QuizDetailsEditor';
import QuizQuestionsEditor from './QuizQuestionsEditor';

export default function QuizEditorPage() {
    const { cid, qid } = useParams();
    const router = useRouter();
    const [quiz, setQuiz] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("details");

    useEffect(() => {
        const fetchQuiz = async () => {
            const q = await client.findQuizById(qid as string);
            setQuiz(q);
        };
        fetchQuiz();
    }, [qid]);

    const handleSaveQuiz = async (updatedQuiz: any) => {
        await client.updateQuiz(updatedQuiz);
        router.push(`/Courses/${cid}/Quizzes/${qid}`);
    };
    
    const handleSaveAndPublish = async (updatedQuiz: any) => {
        await client.updateQuiz({ ...updatedQuiz, published: true });
        router.push(`/Courses/${cid}/Quizzes`);
    };

    const handleCancel = () => {
        router.push(`/Courses/${cid}/Quizzes`);
    };

    if (!quiz) return <div>Loading...</div>;

    return (
        <div id="wd-quiz-editor">
            <div className="d-flex justify-content-end mb-2 align-items-center">
                 <div className="me-3">Points {quiz.points}</div>
                 <div className="text-muted">{quiz.published ? "Published" : "Not Published"}</div>
            </div>
            
            <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k || "details")}
                className="mb-3"
            >
                <Tab eventKey="details" title="Details">
                    <QuizDetailsEditor 
                        quiz={quiz} 
                        onSave={handleSaveQuiz} 
                        onCancel={handleCancel}
                    />
                </Tab>
                <Tab eventKey="questions" title="Questions">
                    <QuizQuestionsEditor quizId={qid as string} />
                </Tab>
            </Tabs>
        </div>
    );
}

