import PatientModel from "./patient.schema.js";

async function createPatient(payload) {
  payload.PK = `PATIENT#${payload.id}`;

  try {
    const { PK, ...result } = await PatientModel.create(payload);
    return result;
  } catch (error) {
    throw error;
  }
}

async function getPatients(params) {
  await new Promise((resolve) => setTimeout(resolve, 5));
  return "Go Serverless v4.0! Your function executed successfully!";
}

export default {
  createPatient,
  getPatients,
};
