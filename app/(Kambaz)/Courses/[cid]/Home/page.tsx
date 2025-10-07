import Modules from "../Modules/page";
import CourseStatus from "./Status";

export default function Home({
                                 params,
                             }: {
    params: Promise<{ cid: string }>;
}) {
    return (
        <div id="wd-home">
            <div className="d-flex" id="wd-home">
                <div className="flex-fill me-3">
                    <Modules params={params}/>
                </div>
                <div className="d-none d-lg-block">
                    <CourseStatus params={params}/>
                </div>
            </div>
        </div>
    );
}
