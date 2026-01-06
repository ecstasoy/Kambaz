"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

import { HTTP_SERVER } from "./EnvironmentVariables";

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with working endpoints",
        due: "2021-10-10",
        completed: false,
        score: 0,
    });
    const [module, setModule] = useState({
        id: "CS101",
        name: "Introduction to Computer Science",
        description: "Basic concepts of programming and computer science fundamentals",
        course: "CS"
    });

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-module" className="btn btn-primary me-2"
               href={`${HTTP_SERVER}/lab5/module`}>
                Get Module
            </a>
            <hr />
            
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-module-name" className="btn btn-primary me-2"
               href={`${HTTP_SERVER}/lab5/module/name`}>
                Get Module Name
            </a>
            <hr />
            
            <h4>Modifying Properties</h4>
            <FormControl id="wd-module-name"
                         className="mb-2"
                         onChange={(e) => setModule({ ...module, name: e.target.value })}
                         value={module.name} />
            <a id="wd-update-module-name" className="btn btn-success me-2"
               href={`${HTTP_SERVER}/lab5/module/name/${module.name}`}>
                Update Module Name
            </a>
            <br /><br />
            
            <FormControl id="wd-module-description"
                         className="mb-2"
                         onChange={(e) => setModule({ ...module, description: e.target.value })}
                         value={module.description} />
            <a id="wd-update-module-description" className="btn btn-success me-2"
               href={`${HTTP_SERVER}/lab5/module/description/${module.description}`}>
                Update Module Description
            </a>
            <hr />
            
            <h4>Assignment Object</h4>
            <a id="wd-retrieve-assignment" className="btn btn-primary me-2"
               href={`${HTTP_SERVER}/lab5/assignment`}>
                Get Assignment
            </a>
            <hr />
            
            <h4>Assignment Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary me-2"
               href={`${HTTP_SERVER}/lab5/assignment/title`}>
                Get Assignment Title
            </a>
            <br /><br />
            
            <FormControl id="wd-assignment-title"
                         className="mb-2"
                         onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                         value={assignment.title} />
            <a id="wd-update-assignment-title" className="btn btn-success me-2"
               href={`${HTTP_SERVER}/lab5/assignment/title/${assignment.title}`}>
                Update Assignment Title
            </a>
            <br /><br />
            
            <FormControl id="wd-assignment-score"
                         className="mb-2"
                         type="number"
                         onChange={(e) => setAssignment({ 
                             ...assignment, 
                             score: parseInt(e.target.value) || 0 
                         })}
                         value={assignment.score} />
            <a id="wd-update-assignment-score" className="btn btn-success me-2"
               href={`${HTTP_SERVER}/lab5/assignment/score/${assignment.score}`}>
                Update Assignment Score
            </a>
            <br /><br />
            
            <div className="form-check mb-2">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id="wd-assignment-completed"
                    checked={assignment.completed}
                    onChange={(e) => setAssignment({ 
                        ...assignment, 
                        completed: e.target.checked 
                    })} />
                <label className="form-check-label" htmlFor="wd-assignment-completed">
                    Assignment Completed
                </label>
            </div>
            <a id="wd-update-assignment-completed" className="btn btn-success me-2"
               href={`${HTTP_SERVER}/lab5/assignment/completed/${assignment.completed}`}>
                Update Assignment Completed
            </a>
            <hr />
        </div>
    );
}