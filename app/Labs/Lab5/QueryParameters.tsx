"use client"
import {FormControl} from "react-bootstrap";
import { HTTP_SERVER } from "./EnvironmentVariables";
import {useState} from "react";
export default function QueryParameters() {
    const [a, setA] = useState("34");
    const [b, setB] = useState("23");
    return (
        <div id="wd-query-parameters">
            <h3>Query Parameters</h3>
            <FormControl id="wd-query-parameter-a"
                         className="mb-2"
                         defaultValue={a} type="number"
                         onChange={(e) => setA(e.target.value)}/>
            <FormControl id="wd-query-parameter-b"
                         className="mb-2"
                         defaultValue={b} type="number"
                         onChange={(e) => setB(e.target.value)}/>
            <a className="btn btn-primary mt-2 me-2" id="wd-query-parameter-add"
               href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}>
                Add {a} + {b}
            </a>
            <a className="btn btn-danger mt-2 me-2" id="wd-query-parameter-subtract"
               href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}>
                Subtract {a} - {b}
            </a>
            <a className="btn btn-success mt-2 me-2" id="wd-query-parameter-multiply"
               href={`${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}>
                Multiply {a} * {b}
            </a>
            <a className="btn btn-warning mt-2" id="wd-query-parameter-divide"
               href={`${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}>
                Divide {a} / {b}
            </a>
            <hr/>
        </div>

    )
}