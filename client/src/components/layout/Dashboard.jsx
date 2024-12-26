import React from "react";
import { Box, Typography } from "@mui/material";
import Analytics from "../dashboard/Analytics";
import AppointmentCalendar from "../dashboard/AppointmentCalendar";

const Dashboard = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        padding: 4,
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" gutterBottom>
        Dashboard
      </Typography>
      <Analytics />
      <AppointmentCalendar />
    </Box>
  );
};

export default Dashboard;



// Option with recommendations

// import React from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import Analytics from "../dashboard/Analytics";
// import AppointmentCalendar from "../dashboard/AppointmentCalendar";
// import RecommendationsPanel from "../recommendations/UserRecommendationList"; // Confirm import path
// 
// const Dashboard = () => {
//   return (
//     <Box
//       sx={{
//         backgroundColor: "background.default",
//         padding: 4,
//         color: "text.primary",
//         minHeight: "100vh",
//       }}
//     >
//       <Typography variant="h1" gutterBottom>
//         Dashboard
//       </Typography>
//       <Grid container spacing={4}>
//         {/* Left Section */}
//         <Grid item xs={12} md={8}>
//           <Analytics />
//           <AppointmentCalendar />
//         </Grid>
// 
//         {/* Right Section */}
//         <Grid item xs={12} md={4}>
//           <Box sx={{ padding: 2, backgroundColor: "white", boxShadow: 2 }}>
//             <Typography variant="h5" gutterBottom>
//               Recommendations
//             </Typography>
//             <RecommendationsPanel /> {/* Display recommendations here */}
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };
// 
// export default Dashboard;
