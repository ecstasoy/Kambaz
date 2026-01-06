import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux";
import TodoList from "./todos/TodoList";

export default function ReduxExamples() {
    const {message} = useSelector((state: RootState) => state.helloReducer);
    return (
        <div id="wd-redux-examples">
            <h2>Redux Examples</h2>
            <h3>Hello Redux</h3>
            <h4>{message}</h4>
            <hr/>
            <CounterRedux/>
            <AddRedux/>
            <TodoList/>
        </div>
    );
}
