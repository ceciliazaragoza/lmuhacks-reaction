import React, { useEffect, useRef, useState } from "react";
import { MeetingDetailsScreen } from "./MeetingDetailsScreen";
import { createMeeting, getToken, validateMeeting } from "../videoAPI.js";


export function JoiningScreen({
  participantName,
  setParticipantName,
  setMeetingId,
  setToken,
  onClickStartMeeting,
  micOn,
  webcamOn,
  setWebcamOn,
  setMicOn,
  customAudioStream,
  setCustomAudioStream,
  setCustomVideoStream
}) {

    return (
    <MeetingDetailsScreen
                    participantName={participantName}
                    setParticipantName={setParticipantName}
                    videoTrack={videoTrack}
                    setVideoTrack={setVideoTrack}
                    onClickStartMeeting={onClickStartMeeting}
                    onClickJoin={async (id) => {
                      const token = await getToken();
                      const { meetingId, err } = await validateMeeting({
                        roomId: id,
                        token,
                      });
                      if (meetingId === id) {
                        setToken(token);
                        setMeetingId(id);
                        onClickStartMeeting();
                      } else {
                        toast(
                          `${err}`,
                          {
                            position: "bottom-left",
                            autoClose: 4000,
                            hideProgressBar: true,
                            closeButton: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          }
                        );
                      }
                    }}
                    _handleOnCreateMeeting={async () => {
                      const token = await getToken();
                      const { meetingId, err } = await createMeeting({ token });

                      if (meetingId) {
                        setToken(token);
                        setMeetingId(meetingId);
                      }
                      return { meetingId: meetingId, err: err }
                    }}
                  />)
}