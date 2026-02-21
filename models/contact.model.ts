import mongoose, { Schema, models, model } from "mongoose";

export interface IContact extends mongoose.Document {
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: "new" | "read" | "replied";
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },
  { timestamps: true, versionKey: false },
);

// Optional index for sorting latest messages
ContactSchema.index({ createdAt: -1 });

const Contact = models.Contact || model<IContact>("Contact", ContactSchema);

export default Contact;
