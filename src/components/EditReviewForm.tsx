import { Paper, Typography, TextField, Stack, Button, MenuItem } from "@mui/material";

interface EditReviewFormProps {
  reviewText: string;
  rating: number;
  onChangeText: (text: string) => void;
  onChangeRating: (rating: number) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditReviewForm = ({
  reviewText,
  rating,
  onChangeText,
  onChangeRating,
  onSave,
  onCancel,
}: EditReviewFormProps) => {
  return (
    <Paper sx={{ p: 3, mt: 3, bgcolor: "#f9f9f9", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Edit Review
      </Typography>

      <TextField
        label="Review"
        fullWidth
        multiline
        rows={3}
        value={reviewText}
        onChange={(e) => onChangeText(e.target.value)}
        sx={{ my: 2 }}
      />

      <TextField
        select
        label="Rating"
        fullWidth
        value={rating}
        onChange={(e) => onChangeRating(Number(e.target.value))}
        sx={{ my: 2 }}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <MenuItem key={num} value={num}>
            {num} ⭐
          </MenuItem>
        ))}
      </TextField>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success" onClick={onSave}>
          Update
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Stack>
    </Paper>
  );
};

export default EditReviewForm;
