import mongoose, { Schema } from "mongoose";
const url =
  "mongodb+srv://admin:nHIQaneHVZvjOft0@cluster0.ea6x3cb.mongodb.net/TicketDB";
mongoose.connect(url);
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: Number,
    progress: Number,
    status: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
