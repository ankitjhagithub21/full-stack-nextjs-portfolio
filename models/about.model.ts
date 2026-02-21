import mongoose, { Schema, Document, Model } from "mongoose"

export interface IAbout extends Document {
  title: string
  subtitle: string
  description: string
  profileImage?: {
    url: string
    public_id: string
  }
  resumeUrl?: string
  yearsExperience: number
  projectsCompleted: number
  skills: string[]
  createdAt: Date
  updatedAt: Date
}

const AboutSchema: Schema<IAbout> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    profileImage: {
      type: {
        url: { type: String },
        public_id: { type: String }
      },
      default: undefined
    },
    resumeUrl: {
      type: String,
    },
    yearsExperience: {
      type: Number,
      required: true,
      default: 0,
    },
    projectsCompleted: {
      type: Number,
      required: true,
      default: 0,
    },
    skills: [{
      type: String,
    }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const About: Model<IAbout> =
  mongoose.models.About ||
  mongoose.model<IAbout>("About", AboutSchema)

export default About
