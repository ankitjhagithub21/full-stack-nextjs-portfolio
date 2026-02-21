import mongoose, { Schema, Document, Model } from "mongoose"

export interface IEducation extends Document {
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: Date
  endDate?: Date
  description?: string
  createdAt: Date
  updatedAt: Date
}

const EducationSchema: Schema<IEducation> = new Schema(
  {
    institution: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey:false
  }
)

const Education: Model<IEducation> =
  mongoose.models.Education ||
  mongoose.model<IEducation>("Education", EducationSchema)

export default Education
