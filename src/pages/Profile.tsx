import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Paper, Box, Divider, Button, Stack } from "@mui/material";
import ReviewCard from "../components/ReviewCard";
import EditReviewForm from "../components/EditReviewForm";

const Profile = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<
    { _id: string; bookId: string; reviewText: string; rating: number; createdAt: string | number | Date }[]
  >([]);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editReviewText, setEditReviewText] = useState("");
  const [editRating, setEditRating] = useState(5);

  useEffect(() => {
    if (!token) return;

    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/review/my-reviews", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };

    fetchReviews();
  }, [token]);

  const deleteReview = async (reviewId: string) => {
    try {
      await axios.delete(`http://localhost:5000/review/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReviews((prevReviews) => prevReviews.filter((r) => r._id !== reviewId));
      alert("Review deleted successfully.");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review.");
    }
  };

  const updateReview = async () => {
    if (!editingReviewId) return;

    try {
      await axios.put(
        `http://localhost:5000/review/${editingReviewId}`,
        { reviewText: editReviewText, rating: editRating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReviews((prevReviews) =>
        prevReviews.map((r) =>
          r._id === editingReviewId ? { ...r, reviewText: editReviewText, rating: editRating } : r
        )
      );

      alert("Review updated successfully.");
      setEditingReviewId(null);
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Failed to update review.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: 600,
          width: "100%",
          borderRadius: 3,
          bgcolor: "background.default",
          boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Profile
        </Typography>

        {user ? (
          <>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", fontWeight: "bold", mb: 2, color: "text.primary" }}
            >
              ✨ Welcome, <strong>{user.username}</strong>!
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="h5"
              sx={{
                mt: 3,
                mb: 1,
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.dark",
              }}
            >
              Your Reviews
            </Typography>

            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onDelete={deleteReview}
                  onEdit={(id, text, rating) => {
                    setEditingReviewId(id);
                    setEditReviewText(text);
                    setEditRating(rating);
                  }}
                  sx={{
                    boxShadow: 2,
                    borderRadius: 2,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 4 },
                  }}
                />
              ))
            ) : (
              <Typography
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  fontStyle: "italic",
                  mt: 2,
                }}
              >
                No reviews submitted yet. Start writing your first one! 📝
              </Typography>
            )}

            {editingReviewId && (
              <EditReviewForm
                reviewText={editReviewText}
                rating={editRating}
                onChangeText={setEditReviewText}
                onChangeRating={setEditRating}
                onSave={updateReview}
                onCancel={() => setEditingReviewId(null)}
              />
            )}

          </>
        ) : (
          <Typography sx={{ textAlign: "center", color: "text.secondary" }}>Loading...</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;
