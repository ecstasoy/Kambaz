import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr/>
            <h2 id="wd-dashboard-published">Published Courses (3)</h2>
            <hr/>
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link href="/Courses/5610" className="wd-dashboard-course-link">
                        <div>
                            <h5> CS5610 Web Development </h5>
                            <p className="wd-dashboard-course-title">
                                Learn About Web Development
                            </p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/5700" className="wd-dashboard-course-link">
                        <div>
                            <h5> CS5700 Computer Network </h5>
                            <p className="wd-dashboard-course-title">
                                Learn About Computer Network
                            </p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/5800" className="wd-dashboard-course-link">
                        <div>
                            <h5> CS5800 Algorithms </h5>
                            <p className="wd-dashboard-course-title">
                                Learn About Algorithms
                            </p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
