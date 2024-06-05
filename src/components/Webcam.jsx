import { useRef, useEffect, useState } from "react"
import {
  PoseLandmarker,
  FilesetResolver,
  DrawingUtils
} from "https://cdn.skypack.dev/@mediapipe/tasks-vision@0.10.0"
import { Posture1 } from "./Webcam_components/Posture1.jsx"
import { Posture2 } from "./Webcam_components/Posture2.jsx"
import { Posture3 } from "./Webcam_components/Posture3.jsx"
import { useParams, useNavigate } from 'react-router-dom'
import { db } from "./../js/firebase.js"
import { ref, onValue, update, increment } from "firebase/database"
import GoBackPatient from "./Patient_Packet_components/GoBackPatient.jsx"

let demosSection;
let poseLandmarker = undefined;
let runningMode = "IMAGE";
let enableWebcamButton;
let webcamRunning = false;
const videoHeight = "720px";
const videoWidth = "1280px";
let navigate;

let posture_name;
let packet_name;
let patient_id;
let done;
let setDone;
let goal;
let setGoal;
let status=-1;
let previous=-1;
let posture;

// function stopWebcam() {
//   if (video && video.srcObject) {
//     const tracks = video.srcObject.getTracks();
//     tracks.forEach(track => track.stop());
//   }
//   webcamRunning = false;
// }

const createPoseLandmarker = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  )
  poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
      delegate: "GPU"
    },
    runningMode: runningMode,
    numPoses: 2
  })
  demosSection.classList.remove("invisible")
}

////////////////////////
////////////////////////
////////////////////////
////////////////////////
////////////////////////

let canvasElement = null;
let canvasCtx = null;
let video;
let drawingUtils = null;

function enableCam(event) {
  video = document.getElementById("webcam")
  canvasElement = document.getElementById("output_canvas")
  canvasCtx = canvasElement.getContext("2d")
  drawingUtils = new DrawingUtils(canvasCtx)

  const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia

  if (hasGetUserMedia()) {
    // enableWebcamButton = document.getElementById("webcamButton")
    // enableWebcamButton.addEventListener("click", enableCam)
  } else {
    console.warn("getUserMedia() is not supported by your browser")
  }

  if (!poseLandmarker) {
    console.log("Wait! poseLandmaker not loaded yet.")
    return
  }

  if (webcamRunning === true) {
    webcamRunning = false
  } else {
    webcamRunning = true
  }

  // getUsermedia parameters.
  const constraints = {
    video: true
  }

  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    video.srcObject = stream
    video.addEventListener("loadeddata", predictWebcam)
  })
}

let lastVideoTime = -1
async function predictWebcam() {
  canvasElement.style.height = videoHeight
  video.style.height = videoHeight
  canvasElement.style.width = videoWidth
  video.style.width = videoWidth
  // Now let's start detecting the stream.
  if (runningMode === "IMAGE") {
    runningMode = "VIDEO"
    await poseLandmarker.setOptions({ runningMode: "VIDEO" })
  }
  let startTimeMs = performance.now()
  if (lastVideoTime !== video.currentTime) {
    lastVideoTime = video.currentTime
    poseLandmarker.detectForVideo(video, startTimeMs, result => {
      // posture options
      if(posture_name === "arms_raise") {
        
        posture = Posture1(result.landmarks);
        if(posture === 1 && previous === -1) {
          setDone(done+1);
        }else if((posture !== previous && posture !== 0) && previous !== -1) {
          setDone(done+1);
        }
      }else if(posture_name === "right_leg_raise") {
        posture = Posture2(result.landmarks);
        if(posture === 1 && previous === -1) {
          setDone(done+1);
        }else if((posture !== previous && posture !== 0) && previous !== -1) {
          setDone(done+1);
        }
      }else if(posture_name === "left_leg_raise") {
        posture = Posture3(result.landmarks);
        if(posture === 1 && previous === -1) {
          setDone(done+1);
        }else if((posture !== previous && posture !== 0) && previous !== -1) {
          setDone(done+1);
        }
      }

      canvasCtx.save()
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
      for (const landmark of result.landmarks) {
        drawingUtils.drawLandmarks(landmark, {
          radius: data => DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1)
        })
        drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS)
      }
      canvasCtx.restore()
    })
  }

  // Call this function again to keep predicting when the browser is ready.
  if (webcamRunning === true) {
    window.requestAnimationFrame(predictWebcam)
  }
}

function Webcam({name}) {
  navigate = useNavigate();
  [goal, setGoal] = useState(-1);
  posture_name = useParams().webcam_id;
  packet_name = useParams().packet_id;
  patient_id = useParams().patient_id;
  [done, setDone] = useState(-1);

  const videoRef = useRef(null);
  useEffect(() => {
    if(done == -1 && goal == -1) {
      onValue(ref(db, `patients/${patient_id}/packets/${packet_name}/exercises/${posture_name}`), res => {
        const datas = res.val();
        setDone(datas.done);
        setGoal(datas.goal);

        if(datas.done && datas.done >= datas.goal) {
          navigate(`/patient/${patient_id}`);
        }
      });
      onValue(ref(db, `patients/${patient_id}/packets/${packet_name}/status`), res => {
        const datas = res.val();
        status = datas.done;

        if(datas.done && datas.done >= datas.goal) {
          navigate(`/patient/${patient_id}`);
        }
      });

      createPoseLandmarker();
      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
      };
    }else {
      if(done === goal) {
        let updates = {};
        updates[`patients/${patient_id}/packets/${packet_name}/status/done`] = increment(1);
        update(ref(db), updates);
        console.log('done');
        navigate(`/patient/${patient_id}`);
      }
      
      previous = posture;
      let updates = {};
      updates[`patients/${patient_id}/packets/${packet_name}/exercises/${posture_name}/done`] = done;
      update(ref(db), updates);
    }

    // return () => {
    //   stopWebcam();
    // }
  }, [done]);

  return(
    <div className="patient_packets_background">
      <GoBackPatient who="patient"/>
      <section id="demos" className="invisible">
        <div id="liveView" className="videoView">
        <div className="bruh">
          <h1> count : {done}/{goal} </h1>
        </div>


          <div className="media" style={{ position: 'relative'}} onClick={enableCam}>
            <div className="clicktostart" style={{ width: "1280px", height: "720px", position: "absolute" }}>
              <h1>Click here to start</h1>
            </div>
            <div  className='video-wrap'>
              <video id="webcam" style={{ width: "1280px", height: "720px", position: "absolute" }} ref={videoRef} autoPlay playsInline/>
            </div>

            <canvas className="output_canvas" width="1280" height="720" style={{position: "absolute", left: "0px", top: "0px"}} id="output_canvas" />
          </div>
        </div>
      </section>
    </div>
  );
}
export default Webcam;