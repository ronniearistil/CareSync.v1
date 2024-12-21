import api from "./apiConfig";

// Fetch all health records for a specific patient
export const fetchHealthRecordsForPatient = async (patientId) => {
  const { data } = await api.get(`/health_records?patient_id=${patientId}`);
  return data;
};

// Create a new health record
export const createHealthRecord = async (recordData) => {
  const { data } = await api.post(`/health_records`, recordData);
  return data;
};

// Update a specific health record
export const updateHealthRecord = async (recordId, recordData) => {
  const { data } = await api.patch(`/health_records/${recordId}`, recordData);
  return data;
};

// Delete a specific health record
export const deleteHealthRecord = async (recordId) => {
  const { data } = await api.delete(`/health_records/${recordId}`);
  return data;
};
