"use client"
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse} from "../Courses/reducer";
import { enrollUser, unenrollUser } from "../Courses/enrollmentsReducer";
import { RootState } from "../store";
import {useState} from "react";
import Link from "next/link";
import {Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl} from "react-bootstrap";
import * as db from "../Database";

export default function Dashboard() {
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
    const dispatch = useDispatch();
    const [showAllCourses, setShowAllCourses] = useState(false);
    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    });

    const isUserEnrolled = (courseId: string) => {
        if (!currentUser?._id) return false;
        return enrollments.some(
            (enrollment: any) => 
                enrollment.user === currentUser._id && enrollment.course === courseId
        );
    };

    const handleEnrollment = (courseId: string) => {
        if (!currentUser?._id) return;
        
        if (isUserEnrolled(courseId)) {
            dispatch(unenrollUser({ userId: currentUser._id, courseId }));
        } else {
            dispatch(enrollUser({ userId: currentUser._id, courseId }));
        }
    };

    const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
    
    const coursesToShow = showAllCourses 
        ? courses 
        : courses.filter((course) => isUserEnrolled(course._id));

    return (
        <div id="wd-dashboard">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 id="wd-dashboard-title">Dashboard</h1>
                <Button 
                    variant="primary" 
                    onClick={() => setShowAllCourses(!showAllCourses)}
                    id="wd-enrollments-btn"
                >
                    {showAllCourses ? "Enrollments" : "All Courses"}
                </Button>
            </div>

            {isFaculty && (
                <>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                                id="wd-add-new-course-click"
                                onClick={() => dispatch(addNewCourse(course))}> Add </button>
                        <button className="btn btn-warning float-end me-2"
                                onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click"> Update </button>
                    </h5>
                    <br/>
                    <FormControl
                        value={course.name}
                        className="mb-2"
                        onChange={(e) => setCourse({...course, name: e.target.value})}/>
                    <FormControl
                        as="textarea"
                        value={course.description}
                        rows={3}
                        onChange={(e) => setCourse({...course, description: e.target.value})}/>
                    <hr/>
                </>
            )}
            <hr/>
            <h2 id="wd-dashboard-published">
                {showAllCourses ? "All Courses" : "My Courses"} ({coursesToShow.length})
            </h2>
            <hr/>
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {coursesToShow
                        .map((course) => (
                        <Col key={course._id} className="wd-dashboard-course" style={{width: "300px"}}>
                            <Card className="h-100">
                                <CardImg
                                    src="/images/reactjs.jpg"
                                    variant="top"
                                    width="100%"
                                    height={160}
                                    style={{objectFit: 'cover'}}
                                />
                                <CardBody className="card-body">
                                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        {course.name}
                                    </CardTitle>
                                    <CardText
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{height: "100px"}}
                                    >
                                        {course.description}
                                    </CardText>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Button 
                                            variant="primary"
                                            onClick={() => {
                                                window.location.href = `/Courses/${course._id}/Home`;
                                            }}
                                        >
                                            Go
                                        </Button>
                                        
                                        <div className="d-flex gap-1">
                                            {showAllCourses ? (
                                                <Button
                                                    variant={isUserEnrolled(course._id) ? "danger" : "success"}
                                                    size="sm"
                                                    onClick={() => handleEnrollment(course._id)}
                                                >
                                                    {isUserEnrolled(course._id) ? "Unenroll" : "Enroll"}
                                                </Button>
                                            ) : (
                                                <>
                                                    {!isFaculty && (
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleEnrollment(course._id)}
                                                        >
                                                            Unenroll
                                                        </Button>
                                                    )}
                                                    {isFaculty && (
                                                        <>
                                                            <button onClick={() => dispatch(deleteCourse(course._id))} 
                                                                    className="btn btn-danger btn-sm"
                                                                    id="wd-delete-course-click">
                                                                Delete
                                                            </button>
                                                            <button id="wd-edit-course-click"
                                                                    onClick={() => setCourse(course)}
                                                                    className="btn btn-warning btn-sm">
                                                                Edit
                                                            </button>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}
