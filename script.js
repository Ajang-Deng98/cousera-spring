let events = [
    {
        id: 1,
        name: "Tech Conference 2024",
        description: "Annual technology conference",
        location: "Convention Center",
        dateTime: "2024-12-20T09:00",
        category: "Technology"
    },
    {
        id: 2,
        name: "Music Festival",
        description: "Summer music festival",
        location: "Central Park",
        dateTime: "2024-12-25T18:00",
        category: "Music"
    },
    {
        id: 3,
        name: "Food Fair",
        description: "Local food vendors showcase",
        location: "Downtown Square",
        dateTime: "2024-12-15T12:00",
        category: "Food"
    }
];

let nextId = 4;

function displayEvents(eventsToShow = events) {
    const container = document.getElementById('eventsContainer');
    
    if (eventsToShow.length === 0) {
        container.innerHTML = '<p>No events found.</p>';
        return;
    }
    
    container.innerHTML = eventsToShow.map(event => `
        <div class="event-card">
            <h3>${event.name}</h3>
            <div class="event-meta">
                📍 ${event.location} | 📅 ${new Date(event.dateTime).toLocaleString()}
            </div>
            <p>${event.description}</p>
            <span class="event-category">${event.category}</span>
        </div>
    `).join('');
}

function searchEvents() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    let filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm) || 
                            event.location.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || event.category === categoryFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    displayEvents(filteredEvents);
}

function addEvent(event) {
    event.preventDefault();
    
    const newEvent = {
        id: nextId++,
        name: document.getElementById('eventName').value,
        location: document.getElementById('eventLocation').value,
        dateTime: document.getElementById('eventDateTime').value,
        category: document.getElementById('eventCategory').value,
        description: document.getElementById('eventDescription').value
    };
    
    events.push(newEvent);
    displayEvents();
    document.getElementById('eventForm').reset();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayEvents();
    document.getElementById('eventForm').addEventListener('submit', addEvent);
    document.getElementById('searchInput').addEventListener('input', searchEvents);
    document.getElementById('categoryFilter').addEventListener('change', searchEvents);
});