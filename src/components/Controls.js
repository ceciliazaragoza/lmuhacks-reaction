import { useMeeting } from '@videosdk.live/react-sdk'

export default function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting()
  return (
    <div className="control-buttons">
      <button className="button is-primary" onClick={() => toggleMic()}>
        toggleMic
      </button>
      <button className="button is-success" onClick={() => toggleWebcam()}>
        toggleWebcam
      </button>
      <button className="button is-primary" onClick={() => leave()}>
        Leave
      </button>
    </div>
  )
}
