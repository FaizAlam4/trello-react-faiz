import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

function Navigation() {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "rgb(255 245 245)", width: "100vw" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <svg
              xmlns="http://www.3.org/2000/svg"
              width="120"
              viewBox="0 0 137.48 60"
              height="60"
            >
              <defs>
                <linearGradient
                  id="A"
                  x1="31.52"
                  y1="64.56"
                  x2="31.52"
                  y2="1.51"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset=".18" stopColor="grey" />
                  <stop offset="1" stopColor="#282b29" />
                </linearGradient>
              </defs>
              <g fillRule="evenodd">
                <path
                  d="M69 20.258v2.724H62.12v18.08h-2.85V22.98h-5.844v-2.72zm1.39 4.97h2.66v2.785c.918-1.868 2.52-3.2 5.607-3.01v2.66c-3.484-.36-5.607.698-5.607 4.052v9.357H70.4zM88.263 41.38c-5.924 0-8.518-3.42-8.518-8.277 0-4.783 2.66-8.202 7.475-8.202 4.876 0 6.838 3.4 6.838 8.202v1.234H82.502c.38 2.692 2.123 4.434 5.86 4.434 1.643-.001 3.273-.29 4.815-.857v2.52c-1.3.695-3.297.946-4.912.946zm-5.794-9.357h8.835c-.158-2.944-1.5-4.624-4.21-4.624-2.883-.014-4.34 1.853-4.624 4.606zm19.067 9.134c-2.598 0-4.243-1.234-4.243-4.15V18.6h2.724v18.084c0 1.44.95 1.933 2.123 1.933a6.9 6.9 0 0 0 .792-.032v2.436a5.8 5.8 0 0 1-1.396.126zm8.263 0c-2.598 0-4.243-1.234-4.243-4.15V18.6h2.724v18.084c0 1.44.95 1.933 2.123 1.933a6.9 6.9 0 0 0 .792-.032v2.436a5.8 5.8 0 0 1-1.396.126zm2.915-8.043c0-4.75 2.785-8.202 7.536-8.202s7.475 3.45 7.475 8.202-2.757 8.277-7.475 8.277-7.536-3.527-7.536-8.277zm2.66 0c0 3.01 1.5 5.733 4.876 5.733s4.815-2.724 4.815-5.733-1.44-5.668-4.812-5.668-4.87 2.66-4.87 5.668z"
                  fill="#535c55"
                />
                <path
                  d="M55.16 1.5H7.88a7.88 7.88 0 0 0-5.572 2.308A7.88 7.88 0 0 0 0 9.39v47.28a7.88 7.88 0 0 0 7.88 7.88h47.28A7.88 7.88 0 0 0 63 56.67V9.4a7.88 7.88 0 0 0-7.84-7.88zM27.42 49.26A3.78 3.78 0 0 1 23.64 53H12a3.78 3.78 0 0 1-3.8-3.74V13.5A3.78 3.78 0 0 1 12 9.71h11.64a3.78 3.78 0 0 1 3.78 3.78zM54.85 33.5a3.78 3.78 0 0 1-3.78 3.78H39.4a3.78 3.78 0 0 1-3.78-3.78v-20a3.78 3.78 0 0 1 3.78-3.79h11.67a3.78 3.78 0 0 1 3.78 3.78z"
                  fill="url(#A)"
                  transform="matrix(.606914 0 0 .606914 9.755521 9.95362)"
                />
              </g>
            </svg>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigation;
