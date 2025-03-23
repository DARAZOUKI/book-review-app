import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(135deg, #1e1e1e, #333)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Mobile Menu Icon */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={() => setMobileOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "#fff",
            fontWeight: "bold",
            letterSpacing: "1px",
            "&:hover": { color: "#ffcc00" },
          }}
        >
          📚 Book Reviews
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Button
            component={Link}
            to="/"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { color: "#ffcc00" },
            }}
          >
            Home
          </Button>

          {user ? (
            <>
              <Button
                component={Link}
                to="/profile"
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": { color: "#ffcc00" },
                }}
              >
                Profile
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={logout}
                sx={{
                  backgroundColor: "#d32f2f",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#b71c1c" },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": { color: "#ffcc00" },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": { color: "#ffcc00" },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#1e1e1e",
            color: "#fff",
            width: 250,
          },
        }}
      >
        <List>
          <ListItem component={Link} to="/" onClick={() => setMobileOpen(false)}>
            <ListItemText primary="Home" sx={{ "& span": { fontWeight: "bold", color: "#ffcc00" } }} />
          </ListItem>
          {user ? (
            <>
              <ListItem component={Link} to="/profile" onClick={() => setMobileOpen(false)}>
                <ListItemText primary="Profile" sx={{ "& span": { fontWeight: "bold", color: "#ffcc00" } }} />
              </ListItem>
              <ListItem
                component="div"
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
              >
                <ListItemText primary="Logout" sx={{ "& span": { fontWeight: "bold", color: "#ffcc00" } }} />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem component={Link} to="/login" onClick={() => setMobileOpen(false)}>
                <ListItemText primary="Login" sx={{ "& span": { fontWeight: "bold", color: "#ffcc00" } }} />
              </ListItem>
              <ListItem component={Link} to="/register" onClick={() => setMobileOpen(false)}>
                <ListItemText primary="Register" sx={{ "& span": { fontWeight: "bold", color: "#ffcc00" } }} />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
