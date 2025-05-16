import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Card, CardContent, Typography, CardMedia, Box, Container, CircularProgress, Alert } from "@mui/material";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query) {
      searchBooks(query);
    }
  }, [query]);

  const searchBooks = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
      setBooks(response.data.items || []);
      navigate(`/?q=${searchTerm}`);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/?q=${query}`);
    searchBooks(query);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1E1E1E 30%, #2A2A2A 100%)",
        color: "white",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 3,
            letterSpacing: "1px",
            color: "#FFD700",
            textShadow: "0px 0px 10px rgba(255, 215, 0, 0.6)",
          }}
        >
          Find Your Next Favorite Book 📖✨
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            maxWidth: 600,
            mx: "auto",
            mb: 5,
            background: "rgba(255, 255, 255, 0.1)",
            padding: 2,
            borderRadius: 3,
            backdropFilter: "blur(10px)",
          }}
        >
          <TextField
            label="Search for books..."
            variant="outlined"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#FFD700" },
                "&.Mui-focused fieldset": { borderColor: "#FFD700" },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              background: "#FFD700",
              color: "#1E1E1E",
              fontWeight: "bold",
              px: 3,
              "&:hover": { background: "#FFC107" },
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>

        {/* Alerts and Loading */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <CircularProgress color="primary" />
          </Box>
        )}
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  overflow: "hidden",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <CardMedia
                    component="img"
                    image={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    sx={{
                      height: 250,
                      objectFit: "cover",
                      filter: "grayscale(20%) contrast(1.2)",
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#FFD700", mb: 1 }}
                  >
                    {book.volumeInfo.title}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author"}
                  </Typography>
                </CardContent>
                <Box sx={{ textAlign: "center", pb: 2 }}>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/book/${book.id}?q=${query}`}
                    sx={{
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      px: 3,
                      "&:hover": { background: "#FFD700", color: "#1E1E1E" },
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
