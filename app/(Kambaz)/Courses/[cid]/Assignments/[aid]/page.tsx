import { use } from 'react';

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
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue={assignment.title} />
      <br />
      <br />
      <label htmlFor="wd-description">Description</label>
      <br />
      <textarea 
        id="wd-description" 
        rows={6} 
        cols={50}
        defaultValue={assignment.description}
      />
      <br />
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" type="number" defaultValue={assignment.points} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due Date</label>
            </td>
            <td>
              <input 
                id="wd-due-date" 
                type="datetime-local" 
                defaultValue={assignment.dueDate}
              />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available From</label>
            </td>
            <td>
              <input 
                id="wd-available-from" 
                type="datetime-local" 
                defaultValue="2024-09-01T00:00:00"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <button>Save</button>
      <button>Cancel</button>
    </div>
  );
}

