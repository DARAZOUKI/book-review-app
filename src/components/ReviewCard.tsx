import { Card, CardContent, Typography, Stack, Button } from "@mui/material";

interface ReviewCardProps {
  review: {
    _id: string;
    bookId: string;
    reviewText: string;
    rating: number;
    createdAt: string | number | Date;
  };
  onDelete: (reviewId: string) => void;
  onEdit: (reviewId: string, reviewText: string, rating: number) => void;
  sx?: object
}

const ReviewCard = ({ review, onDelete, onEdit }: ReviewCardProps) => {
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="subtitle1">
          <strong>Book ID:</strong> {review.bookId}
        </Typography>
        <Typography variant="body1">
          <strong>Review:</strong> {review.reviewText}
        </Typography>
        <Typography variant="body2">
          <strong>Rating:</strong> {review.rating} / 5
        </Typography>
        <Typography variant="caption">
          <strong>Created At:</strong> {new Date(review.createdAt).toLocaleString()}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" color="error" onClick={() => onDelete(review._id)}>
            🗑️ Delete
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => onEdit(review._id, review.reviewText, review.rating)}
          >
            ✏️ Edit
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
