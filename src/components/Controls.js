import { useMeeting } from "@videosdk.live/react-sdk";

export default function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div>
      <button onClick={() => toggleMic()}>toggleMic</button>
      <button onClick={() => toggleWebcam()}>toggleWebcam</button>
      <button onClick={() => leave()}>Leave</button>
    </div>
  )
}