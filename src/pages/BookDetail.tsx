import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookInfo from "../components/BookInfo";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";
import { Box, Container, Typography, Button } from "@mui/material";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  const [book, setBook] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!id) return;
  
    const fetchBookAndReviews = async () => {
      try {
        setLoading(true);
  
        // Fetch book details from Google Books API
        const bookResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        setBook(bookResponse.data);
  
        // Fetch reviews from your backend
        const reviewResponse = await axios.get(`http://localhost:5000/review/book/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        
        setReviews(reviewResponse.data);
      } catch (error) {
        console.error("Error fetching book or reviews:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBookAndReviews();
  }, [id]);

  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: "#222",
        color: "#fff",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        marginTop: "20px",
      }}
    >
      {/* Back Button */}
      <Button
        onClick={() => navigate(-1)}
        sx={{
          color: "#ffcc00",
          marginBottom: "15px",
          "&:hover": { color: "#fff" },
        }}
      >
        ⬅ Back
      </Button>

      {/* Book Info */}
      {id && <BookInfo id={id} />}

      {/* Reviews Section */}
      <Typography variant="h5" sx={{ marginTop: "20px", fontWeight: "bold", borderBottom: "2px solid #ffcc00", paddingBottom: "5px" }}>
        Reviews
      </Typography>
      <ReviewList  reviews={reviews} setReviews={setReviews} />

      {/* Review Form */}
      <Typography variant="h6" sx={{ marginTop: "20px", fontWeight: "bold" }}>
    
      </Typography>
      <ReviewForm bookId={id!} setReviews={setReviews} />
    </Container>
  );
};

export default BookDetail;


