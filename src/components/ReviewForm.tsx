import { Card, CardContent, TextField, Button, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReviewForm = ({ bookId, setReviews }: { bookId: string; setReviews: any }) => {
  const navigate = useNavigate();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      alert("You need to login first");
      navigate("/login");
      return;
    }

    if (!reviewText.trim()) {
      setError("Review text is required.");
      setSuccess('');
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5.");
      setSuccess('');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(
        "https://backend-bookreviewapp.onrender.com/review",
        { bookId, reviewText, rating, username },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReviewText("");
      setRating(5);
      setSuccess("Your review was submitted successfully!");
      setReviews((prevReviews: any) => [...prevReviews, { ...response.data, username }]);
    } catch (error: any) {
      setError("Failed to submit review. Please try again.");
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mt: 3, boxShadow: 3, borderRadius: 2, p: 2, maxWidth: 500, mx: "auto" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", textAlign: "center", color: "primary.main" }}>
          Write a Review
        </Typography>

        <TextField
          label="Your Review"
          fullWidth
          multiline
          minRows={3}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{ my: 1 }}
        />

        <TextField
          label="Rating (1-5)"
          type="number"
          fullWidth
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          inputProps={{ min: 1, max: 5 }}
          sx={{ my: 1 }}
        />

        {/* Alerts */}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={submitReview}
            disabled={loading}
            sx={{
              width: "100%",
              py: 1,
              borderRadius: 1,
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            Submit Review
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
