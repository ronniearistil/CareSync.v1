// import React, { useEffect, useState } from 'react';
// import {
//     fetchUserRecommendations,
//     createUserRecommendation,
//     deleteUserRecommendation,
// } from '../../utils/UserRecommendationApi';
// 
// import { fetchRecommendations } from '../../utils/recommendationApi'; 
// import { fetchPatients } from '../../utils/patientApi'; 
// import {
//     Button,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Box,
//     CircularProgress
// } from '@mui/material';
// import toast from 'react-hot-toast';
// 
// const UserRecommendationList = () => {
//     const [recommendations, setRecommendations] = useState([]);
//     const [patients, setPatients] = useState([]);
//     const [userRecommendations, setUserRecommendations] = useState([]);
//     const [selectedPatient, setSelectedPatient] = useState('');
//     const [selectedRecommendation, setSelectedRecommendation] = useState('');
//     const [loading, setLoading] = useState(true);
// 
//     // Load initial data
//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 setLoading(true);
// 
//                 // Fetch patients, recommendations, and user recommendations
//                 const patientsData = await fetchPatients(); // Patients endpoint
//                 const recommendationsData = await fetchRecommendations(); // Recommendations endpoint
//                 const userRecommendationsData = await fetchUserRecommendations(); // User Recommendations endpoint
// 
//                 // Set states
//                 setPatients(patientsData);
//                 setRecommendations(recommendationsData);
//                 setUserRecommendations(userRecommendationsData);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error loading data:", error);
//                 toast.error('Failed to load data. Please try again.');
//                 setLoading(false);
//             }
//         };
//         loadData();
//     }, []);
// 
//     // Add Recommendation
//     const handleAddRecommendation = async () => {
//         if (!selectedPatient || !selectedRecommendation) {
//             toast.error('Please select both patient and recommendation.');
//             return;
//         }
// 
//         // Prevent duplicates
//         const exists = userRecommendations.some(
//             (ur) =>
//                 ur.patient_id === selectedPatient && ur.recommendation_id === selectedRecommendation
//         );
//         if (exists) {
//             toast.error('This recommendation already exists for the patient.');
//             return;
//         }
// 
//         try {
//             await createUserRecommendation(selectedPatient, selectedRecommendation); // Create recommendation
//             toast.success('Patient recommendation added successfully!');
//             
//             // Refresh recommendations
//             const updatedRecommendations = await fetchUserRecommendations();
//             setUserRecommendations(updatedRecommendations);
//         } catch (error) {
//             console.error("Error adding recommendation:", error);
//             toast.error('Failed to add patient recommendation.');
//         }
//     };
// 
//     // Delete Recommendation
//     const handleDeleteRecommendation = async (patientId, recommendationId) => {
//         try {
//             await deleteUserRecommendation(patientId, recommendationId); // Delete recommendation
//             toast.success('Patient recommendation deleted successfully!');
//             
//             // Refresh recommendations
//             const updatedRecommendations = await fetchUserRecommendations();
//             setUserRecommendations(updatedRecommendations);
//         } catch (error) {
//             console.error("Error deleting recommendation:", error);
//             toast.error('Failed to delete patient recommendation.');
//         }
//     };
// 
//     // Loading state
//     if (loading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }
// 
//     return (
//         <Box sx={{ padding: '1rem' }}>
//             <h2>Patient Recommendations</h2>
// 
//             {/* Dropdowns for selecting patient and recommendation */}
//             <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
//                 <InputLabel>Patient</InputLabel>
//                 <Select
//                     value={selectedPatient}
//                     onChange={(e) => setSelectedPatient(e.target.value)}
//                 >
//                     {patients.map((patient) => (
//                         <MenuItem key={patient.id} value={patient.id}>
//                             {patient.name}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
// 
//             <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
//                 <InputLabel>Recommendation</InputLabel>
//                 <Select
//                     value={selectedRecommendation}
//                     onChange={(e) => setSelectedRecommendation(e.target.value)}
//                 >
//                     {recommendations.map((rec) => (
//                         <MenuItem key={rec.id} value={rec.id}>
//                             {rec.text}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
// 
//             <Button variant="contained" onClick={handleAddRecommendation}>
//                 Add Recommendation
//             </Button>
// 
//             {/* Display patient recommendations */}
//             <ul style={{ marginTop: '1rem' }}>
//                 {userRecommendations.map((ur) => (
//                     <li key={`${ur.patient_id}-${ur.recommendation_id}`}>
//                         Patient {ur.patient_id} - Recommendation {ur.recommendation_id}
//                         <Button
//                             variant="outlined"
//                             color="error"
//                             sx={{ marginLeft: '1rem' }}
//                             onClick={() =>
//                                 handleDeleteRecommendation(ur.patient_id, ur.recommendation_id)
//                             }
//                         >
//                             Delete
//                         </Button>
//                     </li>
//                 ))}
//             </ul>
//         </Box>
//     );
// };
// 
// export default UserRecommendationList;



