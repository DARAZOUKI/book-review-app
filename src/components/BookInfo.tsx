import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box, Card, CardContent, CardMedia } from "@mui/material";

const BookInfo = ({ id }: { id: string }) => {
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) return <Typography>Loading...</Typography>;

  return (
    <Card sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2, boxShadow: 3 }}>
      {book.volumeInfo.imageLinks?.thumbnail && (
        <CardMedia
          component="img"
          image={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
          sx={{ height: 300, objectFit: "contain", mb: 2 }}
        />
      )}
      <CardContent>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          {book.volumeInfo.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Published: {book.volumeInfo.publishedDate || "Unknown"}
        </Typography>

        {/* ✅ Render Description Correctly */}
        {book.volumeInfo.description ? (
          <Typography
            variant="body1"
            sx={{ mt: 2 }}
            dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            No description available.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default BookInfo;
