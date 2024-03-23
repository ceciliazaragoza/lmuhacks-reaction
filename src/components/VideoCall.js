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

  //Getting the meeting id by calling the api we just wrote
  // const getMeetingAndToken = async (id) => {
  //   const meetingId =
  //     id == null ? await createMeeting({ token: VIDEOSDK_TOKEN }) : id;
  //   setMeetingId(meetingId);
  // };

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
      <Controls />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={setVidCallMeetingId} />
  )

  // return (

  // TODO: this meetingProvider below works!
  // <MeetingProvider
  //   config={{
  //     meetingId: "qx9y-aczv-qqla",
  //     micEnabled: true,
  //     webcamEnabled: true,
  //     name: "Cecilia's Org",
  //   }}
  //   token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2ZTQzMThiYi1hZTBlLTQxNWMtOThhMi1lMzI0NTlkMjY3MWQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMTIxNzE4MCwiZXhwIjoxNzExMzAzNTgwfQ.xFHtZhXKAg8_YI9eUKjm8hjxdiwUGdbBspAhbsitR0k"
  // >
  //   <MeetingView />
  // </MeetingProvider>
  // );
}

export default VideoCall
