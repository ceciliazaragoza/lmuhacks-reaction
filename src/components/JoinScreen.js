import React, { useEffect, useRef, useState } from "react";
import { MeetingDetailsScreen } from "./MeetingDetailsScreen.js";
import { createMeeting, getToken, validateMeeting } from "../apis/videoAPI.js";

export default function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
    console.log("join meeting button clicked");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <button onClick={onClick}>Join</button>
      {" or "}
      <button onClick={onClick}>Create Meeting</button>
    </div>
  );
}

// export default function JoinScreen({
//   participantName,
//   setParticipantName,
//   setMeetingId,
//   setToken,
//   onClickStartMeeting,
//   micOn,
//   webcamOn,
//   setWebcamOn,
//   setMicOn,
//   customAudioStream,
//   setCustomAudioStream,
//   setCustomVideoStream,
// }) {

// export default function JoinScreen({ getMeetingAndToken }) {
//   return (
//     <div>Hello</div>
// <MeetingDetailsScreen
//   participantName={participantName}
//   setParticipantName={setParticipantName}
//   videoTrack={videoTrack}
//   setVideoTrack={setVideoTrack}
//   onClickStartMeeting={onClickStartMeeting}
//   onClickJoin={async (id) => {
//     const token = await getToken();
//     const { meetingId, err } = await validateMeeting({
//       roomId: id,
//       token,
//     });
//     if (meetingId === id) {
//       setToken(token);
//       setMeetingId(id);
//       onClickStartMeeting();
//     } else {
//       toast(`${err}`, {
//         position: "bottom-left",
//         autoClose: 4000,
//         hideProgressBar: true,
//         closeButton: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   }}
//   _handleOnCreateMeeting={async () => {
//     const token = await getToken();
//     const { meetingId, err } = await createMeeting({ token });

//     if (meetingId) {
//       setToken(token);
//       setMeetingId(meetingId);
//     }
//     return { meetingId: meetingId, err: err };
//   }}
// />
// );
// }
