import { use } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const assignmentDetails = {
  "5610": {
    "A1": {
      title: "A1",
      description: "example",
      points: 100,
      dueDate: "2024-09-15T23:59:00"
    },
    "Q1": {
      title: "Q1",
      description: "example",
      points: 50,
      dueDate: "2024-09-18T23:59:00"
    },
    "E1": {
      title: "Midterm Exam",
      description: "example",
      points: 200,
      dueDate: "2024-10-20T23:59:00"
    },
    "E2": {
      title: "Final Exam",
      description: "example",
      points: 200,
      dueDate: "2024-12-15T23:59:00"
    },
    // Project
    "P1": {
      title: "Final Project",
      description: "example",
      points: 300,
      dueDate: "2024-12-10T23:59:00"
    }
  },
  "5700": {
    "A1": {
      title: "A1",
      description: "example",
      points: 100,
      dueDate: "2024-09-20T23:59:00"
    },
    "Q1": {
      title: "Q1",
      description: "example",
      points: 75,
      dueDate: "2024-09-25T23:59:00"
    },
    "E1": {
      title: "Final Exam",
      description: "example",
      points: 250,
      dueDate: "2024-12-17T23:59:00"
    },
    "P1": {
      title: "Final Project",
      description: "example",
      points: 400,
      dueDate: "2024-12-08T23:59:00"
    }
  },
  "5800": {
    "A1": {
      title: "A1",
      description: "example",
      points: 100,
      dueDate: "2024-09-18T23:59:00"
    },
    "Q1": {
      title: "Q1",
      description: "example",
      points: 60,
      dueDate: "2024-09-22T23:59:00"
    },
    "E1": {
      title: "Final Exam",
      description: "Final examination covering all course material including graphs, dynamic programming, and advanced algorithms.",
      points: 300,
      dueDate: "2024-12-20T23:59:00"
    },
    "P1": {
      title: "Final Project",
      description: "example",
      points: 500,
      dueDate: "2024-12-12T23:59:00"
    }
  }
};

export default function AssignmentEditor({
  params,
}: {
  params: Promise<{ cid: string; aid: string }>;
}) {
  const { cid, aid } = use(params);
  const courseAssignments = assignmentDetails[cid as keyof typeof assignmentDetails];
  const assignment = courseAssignments?.[aid as keyof typeof courseAssignments];

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div id="wd-assignments-editor">
      <div className="mb-4">
        <h5 className="text-muted">{courseAssignments.title} &gt; Assignments &gt; {aid}</h5>
      </div>
      <Form>
        <div className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control id="wd-name" defaultValue={assignment.title} />
        </div>

        <div className="mb-3">
          <Form.Label htmlFor="wd-description">Description</Form.Label>
          <Form.Control 
            as="textarea"
            id="wd-description" 
            rows={6}
            defaultValue={assignment.description}
          />
        </div>

        <Row>
          <Col md={6}>
            <div className="mb-3">
              <Form.Label htmlFor="wd-points">Points</Form.Label>
              <Form.Control 
                id="wd-points" 
                type="number" 
                defaultValue={assignment.points} 
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-3">
              <Form.Label htmlFor="wd-assignment-group">Assignment Group</Form.Label>
              <Form.Select id="wd-assignment-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECT">PROJECT</option>
              </Form.Select>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <div className="mb-3">
              <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
              <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
                <option value="Percentage">Percentage</option>
                <option value="Points">Points</option>
                <option value="Letter Grade">Letter Grade</option>
              </Form.Select>
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-3">
              <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
              <Form.Select id="wd-submission-type" defaultValue="Online">
                <option value="Online">Online</option>
                <option value="Paper">Paper</option>
                <option value="External Tool">External Tool</option>
              </Form.Select>
            </div>
          </Col>
        </Row>

        <div className="mb-3">
          <Form.Label htmlFor="wd-assign">Assign</Form.Label>
          <div className="border p-3">
            <Form.Control 
              id="wd-assign" 
              defaultValue="Everyone" 
              className="mb-2"
            />
            <Row>
              <Col md={4}>
                <Form.Label htmlFor="wd-due-date">Due</Form.Label>
                <Form.Control 
                  id="wd-due-date" 
                  type="date" 
                  defaultValue="2024-05-13"
                />
              </Col>
              <Col md={4}>
                <Form.Label htmlFor="wd-available-from">Available from</Form.Label>
                <Form.Control 
                  id="wd-available-from" 
                  type="date" 
                  defaultValue="2024-05-06"
                />
              </Col>
              <Col md={4}>
                <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                <Form.Control 
                  id="wd-available-until" 
                  type="date" 
                  defaultValue="2024-05-20"
                />
              </Col>
            </Row>
          </div>
        </div>

        <div className="d-flex gap-2">
          <Button variant="success">Save</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </Form>
    </div>
  );
}

