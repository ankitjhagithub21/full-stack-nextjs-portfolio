import { Schema, models, model } from "mongoose"

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      url: { type: String },
      public_id: { type: String },
    },
    githubUrl: { type: String },
    liveUrl: { type: String },
  },
  { timestamps: true, versionKey: false }
)

const Project =
  models.Project || model("Project", ProjectSchema)

export default Project
