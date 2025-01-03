import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const NavLink = ({ to, children }) => (
    <Link
        component={RouterLink}
        to={to}
        underline="none"
        sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            textDecoration: "none",
            "&:hover": {
                textDecoration: "underline",
            },
        }}
    >
        {children}
    </Link>
);

export default NavLink;

