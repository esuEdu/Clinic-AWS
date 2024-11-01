import dynamoose from "dynamoose";

const patientSchema = new dynamoose.Schema(
  {
    PK: {
      type: String,
      hashKey: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    healthCardNumber: {
      type: String,
      required: true,
    },
    taxId: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      schema: {
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        zip: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);
const stage = process.env.STAGE;
const tableName = `${stage}-PatientTable`;
const PatientModel = dynamoose.model(tableName, patientSchema, {
    create: false,
    update: false,
});

export default PatientModel;
