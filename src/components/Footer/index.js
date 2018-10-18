import React from "react";
import Typography from "@material-ui/core/Typography";

const Footer = () => (
  <footer>
    <Typography
      variant="subtitle1"
      align="center"
      color="textSecondary"
      component="p"
    >
      Developed by{" "}
      <a
        href="https://github.com/jansvigar"
        target="_blank"
        rel="noopener noreferrer"
      >
        Jan Vigar
      </a>
      . Powered by{" "}
      <a
        href="https://github.com/mapbox/mapbox-gl-js"
        target="_blank"
        rel="noopener noreferrer"
      >
        MapBox GL
      </a>{" "}
      and{" "}
      <a
        href="https://foursquare.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        FourSquare
      </a>
    </Typography>
  </footer>
);

export default Footer;
