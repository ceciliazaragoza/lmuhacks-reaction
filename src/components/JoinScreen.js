import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { createMeeting, validateMeeting } from '../apis/videoAPI.js'

export default function JoinScreen(props) {
  const { getMeetingAndToken: setVidCallMeetingId } = props

  const [meetingId, setMeetingId] = useState(null)
  const [inputMeetingIdErr, setInputMeetingIdErr] = useState(false)
  const getMeetingAndToken = async id => {
    console.log('meetingId', meetingId)
    const newMeetingId = await createMeeting()
    setMeetingId(newMeetingId)
    setVidCallMeetingId(newMeetingId)
  }

  // const onClick = async () => {
  //   await getMeetingAndToken(meetingId)
  //   console.log('join meeting button clicked')
  // }

  const joinMeetingToken = async () => {
    if (meetingId != null) {
      setInputMeetingIdErr(false)
      await getMeetingAndToken(meetingId)
    } else {
      setInputMeetingIdErr(true)
    }
  }

  const createMeetingToken = async () => {
    await getMeetingAndToken(meetingId)
    console.log('join meeting button clicked')
  }

  return (
    <div className="card">
      <div className="card-content">
        <div
          className="content"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{ marginBottom: '10px' }}>
            <input
              className="input is-normal"
              type="text"
              placeholder="Enter Meeting ID"
              onChange={e => setMeetingId(e.target.value)}
              style={{ marginRight: '10px', marginBottom: '10px', width: '10vw' }}
            />
            <button
              className="button is-primary"
              onClick={joinMeetingToken}
              style={{ marginRight: '10px', marginBottom: '10px' }}
            >
              Join
            </button>
          </div>
          <div style={{ marginTop: '-10px' }}>
            {inputMeetingIdErr && <div>Input a Meeting ID Please</div>}
            <span style={{ marginBottom: '10px' }}>or</span>
            <div style={{ marginBottom: '10px' }}></div> {/* Added empty div for spacing */}
            <button className="button is-success" onClick={createMeetingToken} style={{ marginBottom: '10px' }}>
              Create Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
