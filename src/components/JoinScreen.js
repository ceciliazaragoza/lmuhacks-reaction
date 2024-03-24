import React, { useState } from 'react'
import { createMeeting } from '../apis/videoAPI.js'
const VIDEOSDK_TOKEN = process.env.REACT_APP_VIDEOSDK_TOKEN

export default function JoinScreen(props) {
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
    <div className="join-screen">
      <div className="input-join">
        <input
          type="text"
          placeholder="Enter Meeting Id"
          onChange={e => {
            setMeetingId(e.target.value)
          }}
        />
        <button onClick={onClick}>Join</button>
      </div>
      <div>{' or '}</div>
      <div>
        <button onClick={onClick}>Create Meeting</button>
      </div>
    </div>
  )
}
