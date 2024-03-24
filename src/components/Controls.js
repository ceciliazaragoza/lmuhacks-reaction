import { useMeeting } from '@videosdk.live/react-sdk'

export default function Controls(props) {
  const { leave, toggleMic, toggleWebcam } = useMeeting()
  const { webCamOn, micOn } = props
  return (
    <div className="control-buttons">
      <button className={`button ${micOn ? 'is-primary' : 'is-danger'}`} onClick={() => toggleMic()}>
        {micOn ? 'Mic On' : 'Mic Off'}
      </button>
      <button className={`button ${webCamOn ? 'is-primary' : 'is-danger'}`} onClick={() => toggleWebcam()}>
        {webCamOn ? 'Camera On' : 'Camera Off'}
      </button>
      <button className="button is-danger" onClick={() => leave()}>
        Leave
      </button>
    </div>
  )
}
