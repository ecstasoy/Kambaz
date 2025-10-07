import Link from "next/link";

export default function KambazNavigation() {
    return (
        <nav id="wd-kambaz-navigation" className="nav nav-pills flex-column">
            <a
                href="https://www.northeastern.edu/"
                id="wd-neu-link"
                target="_blank"
                className="nav-link"
            >
                NORTHEASTERN UNIVERSITY
            </a>

            <Link href="/Account" className="nav-link" id="wd-account-link">
                Account
            </Link>
            <Link href="/Dashboard" className="nav-link" id="wd-dashboard-link">
                Dashboard
            </Link>
            <Link href="/Dashboard" className="nav-link" id="wd-course-link">
                Courses
            </Link>
            <Link href="/Calendar" className="nav-link" id="wd-calendar-link">
                Calendar
            </Link>
            <Link href="/Inbox" className="nav-link" id="wd-inbox-link">
                Inbox
            </Link>
            <Link href="/Labs" className="nav-link" id="wd-labs-link">
                Labs
            </Link>
        </nav>
    );
}
