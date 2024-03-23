import React, { useEffect, useRef, useState } from 'react'
import { MeetingProvider } from '@videosdk.live/react-sdk'
import MeetingView from './MeetingView'
import { createMeeting, getToken, validateMeeting } from '../apis/videoAPI.js'
// import JoinScreen from "./JoinScreen.js";
import Controls from './Controls'

// TODO: replace token with video token when add more members
const VIDEOSDK_TOKEN = process.env.REACT_APP_VIDEOSDK_TOKEN

function JoinScreen(props) {
  const { getMeetingAndToken: setVidCallMeetingId } = props

  const [meetingId, setMeetingId] = useState(null)
  const getMeetingAndToken = async id => {
    const meetingId = id == null ? await createMeeting({ token: VIDEOSDK_TOKEN }) : id
    setMeetingId(meetingId)
    setVidCallMeetingId(meetingId)
  }

  const onClick = async () => {
    await getMeetingAndToken(meetingId)
    console.log('join meeting button clicked')
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={e => {
          setMeetingId(e.target.value)
        }}
      />
      <button onClick={onClick}>Join</button>
      {' or '}
      <button onClick={onClick}>Create Meeting</button>
    </div>
  )
}

const VideoCall = () => {
  const [meetingId, setVidCallMeetingId] = useState(null)

  //This will set Meeting Id to null when meeting is left or ended
  const onMeetingLeave = () => {
    setVidCallMeetingId(null)
  }

  return VIDEOSDK_TOKEN && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: 'C.V. Raman',
      }}
      token={VIDEOSDK_TOKEN}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={setVidCallMeetingId} />
  )
}

export default VideoCall
