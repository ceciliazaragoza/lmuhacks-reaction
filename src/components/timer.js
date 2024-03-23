// import React, { useState, useEffect } from "react";

// function () {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTime(new Date());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <h1>Current Time:</h1>
//       <p>{time.toLocaleTimeString()}</p>
//     </div>
//   );
// }

// export default Timer;
