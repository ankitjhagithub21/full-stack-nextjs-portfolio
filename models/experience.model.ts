import mongoose, { Schema, models, model } from "mongoose"

export interface IExperience extends mongoose.Document {
  company: string
  position: string
  description: string
  startDate: Date
  endDate?: Date
  currentlyWorking: boolean
  location?: string
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
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
    currentlyWorking: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
)

// Optional index for sorting latest experience
ExperienceSchema.index({ createdAt: -1 })

const Experience =
  models.Experience || model<IExperience>("Experience", ExperienceSchema)

export default Experience
