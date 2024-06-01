import React, {useState} from 'react'

function TaskList() {
  const [tasks, setTasks] = useState([{
    name: "posture1",
    pic: "muscle.svg"
  },
  {
    name: "posture2",
    pic: "muscle.svg"
  },
  {
    name: "posture3",
    pic: "muscle.svg"
  }
  ]);

  const webcam_link = () => {
    window.location.href = "http://localhost:5173/webcam_posture1";
  }

  return(
    <div className="task">
      <div className="task_list">
        {tasks.map((task, index) => 
          <div key={index} className="each_task" onClick={webcam_link}>
            <img src={"/"+task.pic} className="pic"/>
            <span className="posture">{task.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;