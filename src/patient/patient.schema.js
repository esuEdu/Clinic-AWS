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
      type: [Date, String],
      required: true,
      onGet: (value) => new Date(value),
      onSet: (value) => (value instanceof Date ? value : new Date(value)),
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
