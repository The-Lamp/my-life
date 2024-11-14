// Firebase Configuration - Replace with your Firebase project details
const firebaseConfig = {
  apiKey: "AIzaSyBR9Sqmk_pIpwlzdBm6fxAZN7ueZ1Evq60",
  authDomain: "my-life-c6f9a.firebaseapp.com",
  projectId: "my-life-c6f9a",
  storageBucket: "my-life-c6f9a.firebasestorage.app",
  messagingSenderId: "723753128702",
  appId: "1:723753128702:web:160e4d314a6529b65bcbaf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const PASSWORD = "admin"; // Default password; change as needed

// Login Function
function login() {
  const inputPassword = document.getElementById("password").value;
  const errorMessage = document.getElementById("login-error");

  if (inputPassword === PASSWORD) {
    document.getElementById("login-page").style.display = "none";
    document.getElementById("diary-page").style.display = "block";
    loadEntries(); // Load entries from Firebase after login
  } else {
    errorMessage.innerText = "Incorrect password!";
  }
}

// Logout Function
function logout() {
  document.getElementById("diary-page").style.display = "none";
  document.getElementById("login-page").style.display = "block";
  document.getElementById("password").value = "";
  document.getElementById("login-error").innerText = "";
}

// Save Entry to Firebase
function saveEntry() {
  const entryContent = document.getElementById("entry-content").value;
  if (entryContent.trim() === "") return; // Ignore empty entries

  const entry = {
    date: new Date().toLocaleString(),
    content: entryContent,
  };

  // Add entry to Firestore
  db.collection("entries").add(entry)
    .then(() => {
      document.getElementById("entry-content").value = "";
      loadEntries(); // Reload entries after saving new one
    })
    .catch((error) => {
      console.error("Error saving entry: ", error);
    });
}

// Load Entries from Firebase
function loadEntries() {
  const entriesDiv = document.getElementById("entries");
  entriesDiv.innerHTML = "";

  db.collection("entries").orderBy("date", "desc").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const entry = doc.data();
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        entryDiv.innerHTML = `<strong>${entry.date}</strong><p>${entry.content}</p>`;
        entriesDiv.appendChild(entryDiv);
      });
    })
    .catch((error) => {
      console.error("Error loading entries: ", error);
    });
