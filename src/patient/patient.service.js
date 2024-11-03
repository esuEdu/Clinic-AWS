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

async function getPatients() {
  try {
    const data = await PatientModel.scan().exec();
    return data.map(({ PK, ...result }) => result);
  } catch (error) {
    throw error;
  }
}

async function getPatient(payload) {
  try {
    const data = await PatientModel.query("PK")
      .eq(`PATIENT#${payload.id}`)
      .exec();

    const { PK, ...result } = data[0];

    return result;
  } catch (error) {
    throw error;
  }
}

async function updatePatient(payload) {
  try {
    const data = await PatientModel.update({ PK: `PATIENT#${payload.id}` }, payload);
    const { PK, ...result } = data;
    return result;
  } catch (error) {
    throw error;
  }
}

export default {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
};
