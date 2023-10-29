"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = ({ ticket }) => {
  const router = useRouter();

  const EDITMODE = ticket._id === "new" ? false : true;

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }
  const [formData, setFormData] = useState(startingTicketData);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (EDITMODE) {
      const res = await fetch(`${window.location.origin}/api/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to update ticket");
      }
    } else {
      const res = await fetch(`${window.location.origin}/api/Tickets`, {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create new ticket");
      }
    }
    router.refresh();
    router.push("/");
  };

  return (
    <div className="flex justify-center ">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3> {EDITMODE ? "Update your Ticket" : "Create your Ticket"} </h3>
        <label>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />
        <label>Categories</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="User Related Issue">User Related Issue</option>
          <option value="Laptop Replacement">Laptop Replacement</option>
        </select>
        <label>Priority</label>
        <div>
          <input
            name="priority"
            id="priority-1"
            type="radio"
            value={1}
            onChange={handleChange}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            name="priority"
            id="priority-2"
            type="radio"
            value={2}
            onChange={handleChange}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            name="priority"
            id="priority-3"
            type="radio"
            value={3}
            onChange={handleChange}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            name="priority"
            id="priority-4"
            type="radio"
            value={4}
            onChange={handleChange}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            name="priority"
            id="priority-5"
            type="radio"
            value={5}
            onChange={handleChange}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          name="progress"
          id="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Not Started">Not Started</option>
          <option value="Started">Started</option>
          <option value="Done">Done</option>
        </select>
        <input
          type="submit"
          className="btn max-w-xs"
          value={EDITMODE ? "Update your Ticket" : "Create your Ticket"}
        />
      </form>
    </div>
  );
};

export default TicketForm;
