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
import { ref, onValue, update } from "firebase/database"

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
let done;
let setDone;
let goal;
let setGoal;
let status;
let setStatus;
let previous=-1;

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
        let updates = {};
        let posture1 = Posture1(result.landmarks);
        if(posture1 === 1 && previous === -1) {
          setDone(done+1);
          previous = posture1;
        }else if((posture1 !== previous && posture1 !== 0) && previous !== -1) {
          setDone(done+1);
          previous = posture1;
        }
        updates[`patients/BgYwyjb9FUSl7hlICLWDnDOKu9J2/packets/${packet_name}/exercises/${posture_name}/done`] = done;
        update(ref(db), updates);
      }else if(posture_name === "right_leg_raise") {
        let updates = {};
        let posture2 = Posture2(result.landmarks);
        if(posture2 === 1 && previous === -1) {
          setDone(done+1);
          previous = posture2;
        }else if((posture2 !== previous && posture2 !== 0) && previous !== -1) {
          setDone(done+1);
          previous = posture2;
        }
        updates[`patients/BgYwyjb9FUSl7hlICLWDnDOKu9J2/packets/${packet_name}/exercises/${posture_name}/done`] = done;
        update(ref(db), updates);
      }else if(posture_name === "left_leg_raise") {
        let updates = {};
        let posture3 = Posture3(result.landmarks);
        if(posture3 === 1 && previous === -1) {
          setDone(done+1);
          previous = posture3;
        }else if((posture3 !== previous && posture3 !== 0) && previous !== -1) {
          setDone(done+1);
          previous = posture3;
        }
        updates[`patients/BgYwyjb9FUSl7hlICLWDnDOKu9J2/packets/${packet_name}/exercises/${posture_name}/done`] = done;
        update(ref(db), updates);
      }
 
      if(done == goal) {
        let updates = {};
        setStatus(status+1);
        updates[`patients/BgYwyjb9FUSl7hlICLWDnDOKu9J2/packets/${packet_name}/status/done`] = status;
        update(ref(db), updates);
      }

      if(done >= goal) {
        console.log('done');
        navigate(`/patient/tasks/${packet_name}/`);
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
  [done, setDone] = useState(0);
  [goal, setGoal] = useState(0);
  [status, setStatus] = useState(0);
  posture_name = useParams().webcam_id;
  packet_name = useParams().packet_id;

  const videoRef = useRef(null);
  useEffect(() => {
    onValue(ref(db, `patients/BgYwyjb9FUSl7hlICLWDnDOKu9J2/packets/${packet_name}/exercises/${posture_name}`), res => {
      const datas = res.val();
      setDone(datas.done);
      setGoal(datas.goal);
    });
    onValue(ref(db, `patients/BgYwyjb9FUSl7hlICLWDnDOKu9J2/packets/${packet_name}/status`), res => {
      const datas = res.val();
      setStatus(datas.done);
    });

    createPoseLandmarker();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return(
    <div className="patient_packets_background">
      <section id="demos" className="invisible">
        <div id="liveView" className="videoView">
          <div className="media" style={{ position: 'relative'}} onClick={enableCam}>
            <h1> count : {done}/{goal} </h1>
            <div className="clicktostart" style={{ width: "1280px", height: "720px", position: "absolute" }}>
              <h1>Click here to start</h1>
            </div>
            <video id="webcam" style={{ width: "1280px", height: "720px", position: "absolute" }} ref={videoRef} autoPlay playsInline/>
            <canvas className="output_canvas" width="1280" height="720" style={{position: "absolute", left: "0px", top: "0px"}} id="output_canvas" />
          </div>
        </div>
      </section>
    </div>
  );
}
export default Webcam;