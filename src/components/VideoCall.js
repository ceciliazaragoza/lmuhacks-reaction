import React, { useState } from 'react'
import { MeetingProvider } from '@videosdk.live/react-sdk'
import MeetingView from './MeetingView'
import JoinScreen from './JoinScreen.js'
import './VideoCall.css'
const VIDEOSDK_TOKEN = process.env.REACT_APP_VIDEOSDK_TOKEN

// Thank you to VideoSDK docs!: https://docs.videosdk.live/react/guide/video-and-audio-calling-api-sdk/concept-and-architecture
const VideoCall = props => {
  const { googleDisplayName } = props
  const [meetingId, setVidCallMeetingId] = useState(null)

  //This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setVidCallMeetingId(null)
  }

  return VIDEOSDK_TOKEN && meetingId ? (
    <div className="video-call">
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: googleDisplayName
        }}
        token={VIDEOSDK_TOKEN}
      >
        <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
      </MeetingProvider>
    </div>
  ) : (
    <div className="video-call">
      <JoinScreen getMeetingAndToken={setVidCallMeetingId} />
    </div>
  )
}

export default VideoCall
