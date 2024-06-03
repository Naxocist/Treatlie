import Header from "./Patient_Packet_components/Header.jsx"
import Profile from "./Patient_Packet_components/Profile.jsx"
import TasksList from "./Patient_Tasks_components/TasksList.jsx";

function Tasks() {
  return(
    <div className="patient_packets_background">
      <Header/>
      <Profile/>
      <TasksList/>
    </div>
  );
}
export default Tasks;