import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";

export default function Dashboard() {
    const courses = [
        {
            id: "5610",
            title: "CS5610 Web Development",
            description: "Full Stack software developer using React, Node.js, and MongoDB. Learn modern web development technologies and frameworks.",
            image: "/images/reactjs.jpg"
        },
        {
            id: "5700", 
            title: "CS5700 Computer Networks",
            description: "Network protocols, distributed systems, and network programming. Understand how the internet works.",
            image: "/images/reactjs.jpg"
        },
        {
            id: "5800",
            title: "CS5800 Algorithms",
            description: "Data structures and algorithms analysis. Master computational problem solving and optimization techniques.",
            image: "/images/reactjs.jpg"
        },
        {
            id: "5200",
            title: "CS5200 Database Design",
            description: "Database systems, SQL, and data modeling. Learn to design and implement efficient database solutions.",
            image: "/images/reactjs.jpg"
        },
        {
            id: "5004",
            title: "CS5004 Object Oriented Design", 
            description: "Object-oriented programming principles and design patterns. Build maintainable and scalable software.",
            image: "/images/reactjs.jpg"
        },
        {
            id: "5500",
            title: "CS5500 Software Engineering",
            description: "Software development lifecycle, testing, and project management. Learn professional development practices.",
            image: "/images/reactjs.jpg"
        },
        {
            id: "5600",
            title: "CS5600 Computer Systems",
            description: "Operating systems, system programming, and computer architecture. Understand how computers work.",
            image: "/images/reactjs.jpg"
        },
        {
            id: "5001",
            title: "CS5001 Intensive Foundations",
            description: "Programming fundamentals and computational thinking. Build a strong foundation in computer science.",
            image: "/images/reactjs.jpg"
        }
    ];

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {courses.map((course) => (
                        <Col key={course.id} className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card className="h-100">
                                <Link 
                                    href={`/Courses/${course.id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark"
                                >
                                    <CardImg 
                                        variant="top" 
                                        src={course.image} 
                                        width="100%" 
                                        height={160}
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <CardBody>
                                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                            {course.title}
                                        </CardTitle>
                                        <CardText 
                                            className="wd-dashboard-course-description overflow-hidden" 
                                            style={{ height: "100px" }}
                                        >
                                            {course.description}
                                        </CardText>
                                        <Button variant="primary">Go</Button>
                                    </CardBody>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}
