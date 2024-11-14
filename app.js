// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBR9Sqmk_pIpwlzdBm6fxAZN7ueZ1Evq60",
    authDomain: "my-life-c6f9a.firebaseapp.com",
    projectId: "my-life-c6f9a",
    storageBucket: "my-life-c6f9a.appspot.com",
    messagingSenderId: "723753128702",
    appId: "1:723753128702:web:160e4d314a6529b65bcbaf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Submit a new post
function submitPost() {
    const content = document.getElementById("postContent").value.trim();
    const category = document.getElementById("postCategory").value;
    
    if (content) {
        db.collection("forumPosts").add({
            content: content,
            category: category,
            likes: 0,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            document.getElementById("postContent").value = ""; // Clear textarea
            loadPosts(); // Refresh posts
        })
        .catch((error) => console.error("Error posting:", error));
    } else {
        alert("Please write something before posting.");
    }
}

// Like a post
function likePost(id) {
    const postRef = db.collection("forumPosts").doc(id);
    postRef.update({
        likes: firebase.firestore.FieldValue.increment(1)
    });
}

// Load posts from Firestore
function loadPosts() {
    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = ""; // Clear previous posts

    db.collection("forumPosts").orderBy("timestamp", "desc").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const postData = doc.data();
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <div class="category-tag">${postData.category}</div>
                <p>${postData.content}</p>
                <div class="timestamp">${formatDate(postData.timestamp?.seconds)}</div>
                <div>
                    <button class="like-btn" onclick="likePost('${doc.id}')">❤️ ${postData.likes} Likes</button>
                    <button class="reply-btn">💬 Reply</button>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    })
    .catch((error) => console.error("Error loading posts:", error));
}

// Format date
function formatDate(seconds) {
    const date = new Date(seconds * 1000);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

// Load posts when the page loads
window.onload = loadPosts;
