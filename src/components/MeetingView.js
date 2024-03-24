import React, { useState } from 'react'
import { useMeeting } from '@videosdk.live/react-sdk'
import Controls from './Controls'
import ParticipantView from './ParticipantView'

export default function MeetingView(props) {
  let meetingId = props.meetingId
  let onMeetingLeave = props.onMeetingLeave
  // <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} displayName={displayName} />

  const [joined, setJoined] = useState(null)
  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants

  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined('JOINED')
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      onMeetingLeave()
    }
  })
  const joinMeeting = () => {
    setJoined('JOINING')
    join()
  }

  return (
    <div className="container">
      <h3 className="meeting-id-meeting-view">Meeting Id: {meetingId}</h3>
      {joined && joined == 'JOINED' ? (
        <div>
          <div className="participant-grid">
            {[...participants.keys()].map(participantId => (
              <ParticipantView participantId={participantId} key={participantId} />
            ))}
          </div>
        </div>
      ) : joined && joined == 'JOINING' ? (
        <p className="joining-meeting">Joining the meeting...</p>
      ) : (
        <button className="button is-primary" onClick={joinMeeting}>
          Join
        </button>
      )}
    </div>
  )
}
