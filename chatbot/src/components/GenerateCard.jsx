import React from "react";
import { Card } from '@mui/material'
import "./GenerateCard.css"

function GenerateCard({ text }) {
    return <Card variant="outlined" className="generate-card">
        {text}
        </Card>;
  }
  
export default GenerateCard;