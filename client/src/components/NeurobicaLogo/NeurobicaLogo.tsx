import Box from "@mui/material/Box";
import React from "react";
import NeurobicaLogoAsset from "../../assets/LogoPNG.png";

export default function NeurobicaLogo(props: { c: number }) {
  return (
    <Box
      component="img"
      sx={{
        height: { xs: 4 * props.c + "vh" },
        width: { xs: 6 * props.c + "vh" },
        maxHeight: { xs: 60 * props.c + "px" },
        maxWidth: { xs: 150 * props.c + "px" },
      }}
      alt="Neurobica Logo"
      src={NeurobicaLogoAsset}
    />
  );
}
