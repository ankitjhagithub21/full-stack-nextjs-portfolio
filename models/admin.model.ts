import mongoose, { Schema, models, model } from "mongoose"

export interface IAdmin extends mongoose.Document {
  email: string
  password: string
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
)

const Admin = models.Admin || model<IAdmin>("Admin", AdminSchema)

export default Admin
