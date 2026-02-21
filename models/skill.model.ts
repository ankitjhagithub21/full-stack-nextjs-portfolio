import mongoose, { Schema, models, model } from "mongoose"

export interface ISkill extends mongoose.Document {
  name: string
  category: string
  level: number
  icon?: string
  order: number
}

const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    icon: {
      type: String, // optional icon URL or icon name
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey:false }
)

// Index for sorting
SkillSchema.index({ order: 1 })
SkillSchema.index({ category: 1 })

const Skill =
  models.Skill || model<ISkill>("Skill", SkillSchema)

export default Skill
