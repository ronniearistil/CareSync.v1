import React, { useEffect, useState } from "react";
// import * as patientApi from "../../../utils/patientApi"; 
import PatientCard from "./PatientCard"; 
const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await patientApi.fetchPatients(); // Fetch data from API
        console.log("Fetched patients:", response); // Debugging log
        setPatients(response);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError("Failed to load patients."); // Set error message
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    getPatients();
  }, []);

  if (isLoading) {
    return <p>Loading patients...</p>; // Render loading message
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>; // Render error message
  }

  return (
    <div>
      <h2>Patients</h2>
      {patients.length === 0 ? ( // Handle empty patient list
        <p>No patients found.</p>
      ) : (
        <div>
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Patients;

