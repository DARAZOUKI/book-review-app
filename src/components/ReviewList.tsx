import { Card, CardContent, Typography, TextField, Button, Box, Stack } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const ReviewList = ({ reviews, setReviews }: { reviews: any[]; setReviews: any }) => {
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editedReviewText, setEditedReviewText] = useState("");
  const [editedRating, setEditedRating] = useState(5);


  
  const deleteReview = async (reviewId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`http://localhost:5000/review/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Review deleted!");
      setReviews((prev: any[]) => prev.filter((r) => r._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const startEditing = (reviewId: string, currentText: string, currentRating: number) => {
    setEditingReviewId(reviewId);
    setEditedReviewText(currentText);
    setEditedRating(currentRating);
  };

  const submitEditedReview = async (reviewId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.put(
        `https://backend-bookreviewapp.onrender.com/review/${reviewId}`,
        { reviewText: editedReviewText, rating: editedRating },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Review updated!");
      setEditingReviewId(null);
      setReviews((prev: any[]) =>
        prev.map((r) =>
          r._id === reviewId ? { ...r, reviewText: editedReviewText, rating: editedRating } : r
        )
      );
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", color: "primary.main", mb: 2 }}>
        📖 Reviews
      </Typography>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Card
            key={review._id}
            sx={{
              my: 2,
              p: 2,
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "primary.dark" }}>
                {review.username || "Unknown User"}
              </Typography>

              {editingReviewId === review._id ? (
                <>
                  <TextField
                    label="Edit Review"
                    fullWidth
                    variant="outlined"
                    value={editedReviewText}
                    onChange={(e) => setEditedReviewText(e.target.value)}
                    sx={{ my: 1 }}
                  />
                  <TextField
                    label="Rating (1-5)"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={editedRating}
                    onChange={(e) => setEditedRating(Number(e.target.value))}
                    inputProps={{ min: 1, max: 5 }}
                    sx={{ my: 1 }}
                  />

                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => submitEditedReview(review._id)}
                      sx={{ flexGrow: 1, textTransform: "none" }}
                    >
                      ✅ Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setEditingReviewId(null)}
                      sx={{ flexGrow: 1, textTransform: "none" }}
                    >
                      ❌ Cancel
                    </Button>
                  </Stack>
                </>
              ) : (
                <>
                  <Typography variant="body1" sx={{ my: 1 }}>
                    {review.reviewText}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold", color: "warning.main" }}>
                    ⭐ {review.rating} / 5
                  </Typography>

                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => startEditing(review._id, review.reviewText, review.rating)}
                      sx={{ flexGrow: 1, textTransform: "none" }}
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteReview(review._id)}
                      sx={{ flexGrow: 1, textTransform: "none" }}
                    >
                      🗑️ Delete
                    </Button>
                  </Stack>
                </>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
          No reviews yet. Be the first to write one! 📝
        </Typography>
      )}
    </Box>
  );
};

export default ReviewList;
