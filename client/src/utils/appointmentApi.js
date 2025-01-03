import api from './apiConfig';

// Fetch all appointments
export const fetchAppointments = async () => {
    try {
        const { data } = await api.get('/appointments');
        return data;
    } catch (error) {
        console.error('Failed to fetch appointments:', error?.response?.data || error.message);
        throw error;
    }
};

// Fetch an appointment by ID
export const fetchAppointmentById = async (id) => {
    try {
        const { data } = await api.get(`/appointments/${id}`);
        return data;
    } catch (error) {
        console.error(`Failed to fetch appointment with ID ${id}:`, error?.response?.data || error.message);
        throw error;
    }
};

// Create a new appointment
export const createAppointment = async (appointment) => {
    console.log("Payload for new appointment:", appointment); // Debugging payload
    try {
        const { data } = await api.post('/appointments', appointment);
        return data;
    } catch (error) {
        console.error('Failed to create appointment:', error?.response?.data || error.message);
        throw error;
    }
};

// Update an appointment (Partial Update)
export const updateAppointment = async (id, appointment) => {
    try {
        const payload = {};
        // Include only updated fields in payload
        Object.keys(appointment).forEach((key) => {
            if (appointment[key] !== null && appointment[key] !== "") {
                payload[key] = appointment[key];
            }
        });

        const { data } = await api.patch(`/appointments/${id}`, payload);
        return data;
    } catch (error) {
        console.error(`Failed to update appointment with ID ${id}:`, error?.response?.data || error.message);
        throw error;
    }
};

// Delete an appointment
export const deleteAppointment = async (id) => {
    try {
        await api.delete(`/appointments/${id}`);
        return { message: `Appointment with ID ${id} deleted successfully.` };
    } catch (error) {
        console.error(`Failed to delete appointment with ID ${id}:`, error?.response?.data || error.message);
        throw error;
    }
};
