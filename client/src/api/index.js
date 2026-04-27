const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function getCategories() {
  const response = await fetch(`${API_BASE}/api/categories`);
  const result = await response.json();
  if (!response.ok) {
    throw Error(result.error || "Something went wrong");
  }
  return result;
}

export async function getEvents() {
  const response = await fetch(`${API_BASE}/api/events`);
  const result = await response.json();
  if (!response.ok) {
    throw Error(result.error || "Something went wrong");
  }
  return result;
}

export async function getEvent(id) {
  try {
    const response = await fetch(`${API_BASE}/api/events/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createEvent(eventData, token) {
  if (!token) {
    throw Error("You must be signed in to create an event.");
  }
  const response = await fetch(`${API_BASE}/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw Error("Something went wrong while creating event.");
  }
  const result = await response.json();
  return result;
}

export async function joinEvent(eventId, token) {
  const response = await fetch(`${API_BASE}/api/events/${eventId}/join`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();

  if (!response.ok) {
    throw Error(result.error || "Could not join event.");
  }
  return result;
}

export async function getEventAttendees(eventId){
  const response = await fetch(`${API_BASE}/api/events/${eventId}/attendees`);
  const result = await response.json();

  if (!response.ok) {
    throw Error(result.error || "Could not get attendees.");
  }
  return result;
}

export async function getJoinedEvents(token) {
  const response = await fetch(`${API_BASE}/api/users/me/joined-events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  if (!response.ok) {
    throw Error(result.error || "Something went wrong");
  }
  return result;
}

export async function updateEvent(eventId, eventData, token) {
  const response = await fetch(`${API_BASE}/api/events/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  const result = await response.json();

  if (!response.ok) {
    throw Error(result.error || "Could not update event.");
  }
  return result;
}

export async function leaveJoinedEvent(eventId, token) {
  const response = await fetch(`${API_BASE}/api/events/${eventId}/leave`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();

  if (!response.ok) {
    throw Error(result.error || "Could not leave event");
  }
  return result;
}

export async function deleteEvent(eventId, token) {
  const response = await fetch(`${API_BASE}/api/events/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw Error(result.error || "Could not delete event");
  }
  return result;
}
