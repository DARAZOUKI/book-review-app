## Book Review App - Frontend

A React-based web application for searching books using the Google Books API, viewing details, and adding reviews. Users can register, log in, and manage their reviews.

🚀 Features

    🔍 Search Books - Search for books using the Google Books API.

    📖 View Book Details - Display detailed information about a selected book.

    📝 Write & View Reviews - Users can add, edit, and delete their book reviews.

    👤 User Authentication - Register, log in, and manage personal reviews.

    🎨 Material UI Styling - Beautiful UI with responsive design.

🏗️ Tech Stack

    Frontend: React, TypeScript, React Router, Axios, Material UI

    Backend: NestJS API (not included in this repo)

    Database: MongoDB (for storing reviews)

    Authentication: JWT-based authentication.
    🔗 API Endpoints Used
📖 Google Books API

    GET https://www.googleapis.com/books/v1/volumes?q=SEARCH_TERM

    GET https://www.googleapis.com/books/v1/volumes/{bookId}

📝 Backend API (NestJS)

    POST /auth/register → Register user

    POST /auth/login → Log in user

    GET /review/book/{bookId} → Get all reviews for a book

    POST /review → Add a review

    PUT /review/{reviewId} → Edit review

    DELETE /review/{reviewId} → Delete review

    GET /review/my-reviews → Fetch user’s own reviews

🖥️ Pages & Components
📌 Home.tsx

    Displays a search bar to find books.

    Shows book results in a grid format.

📌 BookDetail.tsx

    Displays book information.

    Shows and allows users to add reviews.

📌 Profile.tsx

    Shows user's posted reviews.

    Allows editing and deleting reviews.

📌 Components

    BookInfo.tsx → Displays book details.

    ReviewList.tsx → Lists all reviews for a book.

    ReviewForm.tsx → Form for adding reviews.

    ReviewCard.tsx → Individual review item.

    EditReviewForm.tsx → Editing review functionality.

🔐 Authentication Flow

    Users register or log in.

    A JWT token is stored in localStorage.

    Protected routes (Profile) require authentication.

    The token is sent in API requests for authentication.

🛠️ Possible Improvements

✅ Implement pagination for search results.
✅ Add ratings & sorting for reviews.
✅ Improve UI with more animations.
✅ Implement dark/light mode.
