import {ReactNode} from "react";
import CourseNavigation from "./Navigation";

export default function CoursesLayout({
                                                children,
                                                params,
                                            }: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
    return (
        <div id="wd-courses">
            <table>
                <tbody>
                <tr>
                    <td valign="top" width="200">
                        <CourseNavigation params={params}/>
                    </td>
                    <td valign="top" width="100%">
                        {children}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
