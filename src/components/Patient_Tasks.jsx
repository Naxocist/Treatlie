import Header from "./Patient_Tasks_components/Header.jsx"
import NumTaskDone from "./Patient_Tasks_components/NumTaskDone.jsx"
import TaskList from "./Patient_Tasks_components/TaskList.jsx"

function Patient_Tasks() {
  return(
    <div className="patient_tasks_background">
      <Header/>
      <NumTaskDone complete={0} all={3}/>
      <TaskList/>
    </div>
  );
}

export default Patient_Tasks;