import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

function MeetingView() {
  const [joined, setJoined] = useState(null);
  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="container">
      {joined && joined == "JOINED" ? (
        <div>
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
        </div>
      ) : joined && joined == "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join the meeting</button>
      )}
    </div>
  );
}

const videoCall = () => {
  return (
    <MeetingProvider
      config={{
        meetingId: "qx9y-aczv-qqla",
        micEnabled: true,
        webcamEnabled: true,
        name: "Cecilia's Org",
      }}
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2ZTQzMThiYi1hZTBlLTQxNWMtOThhMi1lMzI0NTlkMjY3MWQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMTIxNzE4MCwiZXhwIjoxNzExMzAzNTgwfQ.xFHtZhXKAg8_YI9eUKjm8hjxdiwUGdbBspAhbsitR0k"
    >
      <MeetingView />
    </MeetingProvider>
  );
};

export default videoCall;