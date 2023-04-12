import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    allDay: Boolean,
    backgroundColor: String,
    end: Date,

    start: {
      type: Date,
      unique: true,
      validate: {

        validator: async function (v) {
          const existingEvent = await mongoose.model('events').findOne({ start: v });
          return !existingEvent;
        },
        message: props => `Start time at ${props.value} already have a event`,
      },
    },
    textColor: String,
    title: {
      type: String,
      unique: true,
      validate: {
        validator: async function (v) {
          const existEvent = await mongoose.model('events').findOne({ title: v });
          return !existEvent;
        },
        message: props => `title: ${props.value} already exists`,
      },
    },

    desc: String,
    status: {
      type: String,
      enum: ["init", "done", "miss"],
      default: "init",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


let Event = mongoose.models.events || mongoose.model("events", eventSchema);
export default Event;