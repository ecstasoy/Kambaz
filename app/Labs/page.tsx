import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>CS5610 Web Development Labs</h1>
      
      {/* Student Information */}
      <div id="wd-student-info">
        <h2>Student Information</h2>
        <p><strong>Full Name:</strong> [Your Full Name]</p>
        <p><strong>Section:</strong> [Your Section Number]</p>
      </div>
      
      <hr />
      
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
        </ul>
      </div>
      
      <hr />
      
      {/* Kambaz Application */}
      <div id="wd-kambaz-app">
        <h2>Kambaz Application</h2>
        <ul>
          <li>
            <Link href="/" id="wd-kambaz-link">
              Kambaz Learning Management System
            </Link>
          </li>
          <li>
            <Link href="/Dashboard" id="wd-dashboard-link">
              Dashboard - Course Overview
            </Link>
          </li>
          <li>
            <Link href="/Courses/5610" id="wd-course-5610-link">
              CS5610 Web Development Course
            </Link>
          </li>
          <li>
            <Link href="/Courses/5700" id="wd-course-5700-link">
              CS5700 Computer Networks Course  
            </Link>
          </li>
          <li>
            <Link href="/Courses/5800" id="wd-course-5800-link">
              CS5800 Algorithms Course
            </Link>
          </li>
        </ul>
      </div>
      
      <hr />
      
      {/* Source Code Repositories */}
      <div id="wd-source-code">
        <h2>Source Code Repositories</h2>
        <ul>
          <li>
            <a 
              href="https://github.com/[YourUsername]/kambaz-next-js" 
              target="_blank" 
              rel="noopener noreferrer"
              id="wd-github-frontend"
            >
              Frontend Repository (Next.js)
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/[YourUsername]/kambaz-backend" 
              target="_blank" 
              rel="noopener noreferrer"
              id="wd-github-backend"
            >
              Backend Repository (Node.js/Express)
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/[YourUsername]/kambaz-react" 
              target="_blank" 
              rel="noopener noreferrer"
              id="wd-github-react"
            >
              React Version Repository
            </a>
          </li>
        </ul>
      </div>
      
      <hr />
      
      {/* Deployment Links */}
      <div id="wd-deployment">
        <h2>Live Deployments</h2>
        <ul>
          <li>
            <a 
              href="https://kambaz-next-js.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              id="wd-vercel-deployment"
            >
              Vercel Deployment (Next.js)
            </a>
          </li>
          <li>
            <a 
              href="https://[your-app].netlify.app" 
              target="_blank" 
              rel="noopener noreferrer"
              id="wd-netlify-deployment"
            >
              Netlify Deployment (React)
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
