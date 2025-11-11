import Link from "next/link";

export default function Labs() {
    return (
        <div id="wd-labs">
            <h1>CS5610 Web Development Labs</h1>

            {/* Student Information */}
            <div id="wd-student-info">
                <h2>Student Information</h2>
                <p><strong>Full Name:</strong> Kunhua Huang </p>
                <p><strong>Section:</strong> Monday </p>
            </div>

            <hr/>

            {/* Lab Assignments */}
            <div id="wd-lab-assignments">
                <h2>Lab Assignments</h2>
                <ul>
                    <li>
                        <Link href="/Labs/Lab1" id="wd-lab1-link">
                            Lab 1: HTML Examples
                        </Link>
                    </li>
                    <li>
                        <Link href="/Labs/Lab2" id="wd-lab2-link">
                            Lab 2: CSS Basics
                        </Link>
                    </li>
                    <li>
                        <Link href="/Labs/Lab3" id="wd-lab3-link">
                            Lab 3: JavaScript Fundamentals
                        </Link>
                    </li>
                    <li>
                        <Link href="/Labs/Lab4" id="wd-lab4-link">
                            Lab 4: React Basics
                        </Link>
                    </li>
                </ul>
            </div>

            <hr/>

            <div id="wd-source-code">
                <h2>Source Code Repositories</h2>
                <ul>
                    <li>
                        <a
                            href="https://github.com/ecstasoy/kambaz"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="wd-github-repo"
                        >
                            Project Repository
                        </a>
                    </li>
                </ul>
            </div>
            <hr/>
        </div>
    );
}
