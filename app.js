// Import and configure Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form submission logic
const form = document.getElementById('personalDataForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const bio = document.getElementById('bio').value;
    const diary = document.getElementById('diary').value;
    const checklist = document.getElementById('checklist').value.split(',');
    const mission = document.getElementById('mission').value;
    const progress = document.getElementById('progress').value;
    const goal = document.getElementById('goal').value;
    const timestamp = new Date();

    try {
        await addDoc(collection(db, "userData"), {
            name: name,
            email: email,
            bio: bio,
            diary: diary,
            checklist: checklist,
            mission: mission,
            progress: progress,
            goalDate: goal,
            dateAdded: timestamp.toISOString(),
            time: `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`
        });
        alert('Data saved successfully!');
        form.reset();
    } catch (error) {
        console.error('Error adding document: ', error);
        alert('Error saving data. Please try again.');
    }
});
