import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

// Dummy formatExpression and calculateArray functions
function formatExpression(arr) {
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
    if (typeof arr[i] === "string" && ["+", "-", "*", "/"].includes(arr[i])) {
      result += " ";
    } else if (
      typeof arr[i] === "number" &&
      i < arr.length - 1 &&
      typeof arr[i + 1] === "string"
    ) {
      result += " ";
    }
  }
  return result;
}

function calculateArray(arr) {
  let expression = arr.join("");
  try {
    let result = eval(expression);
    return parseFloat(result.toFixed(2));
  } catch (error) {
    return "Invalid expression!";
  }
}

function App() {
  const [input, setInput] = useState([]);

  return (
    <Box
      sx={{
        width: 300,
        margin: "auto",
        mt: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Result and Input Display */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          backgroundColor: "#f5f5f5",
          textAlign: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
          Result: {calculateArray(input)}
        </Typography>
        <Typography variant="body1">
          Input: {formatExpression(input) || "0"}
        </Typography>
      </Paper>

      {/* Calculator Buttons */}
      <Box
        sx={{
          margin: "auto",
          flexGrow: 1,
          p: 2,
          border: "2px solid",
          borderColor: "primary.main",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          {/* First Row */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9,0].map((num) => (
            <Grid item xs={4} key={`num-${num}`}>
              <Button
                onClick={() => setInput((prev) => [...prev, num])}
                variant="contained"
                fullWidth
                size="large"
              >
                {num}
              </Button>
            </Grid>
          ))}

          {/* Operators Row */}
          {["+", "-", "*", "/"].map((operator) => (
            <Grid item xs={4} key={`operator-${operator}`}>
              <Button
                onClick={() => setInput((prev) => [...prev, operator])}
                variant="contained"
                color="warning"
                fullWidth
                size="large"
              >
                {operator}
              </Button>
            </Grid>
          ))}

          {/* Equals Button */}
          <Grid item xs={12}>
            <Button
              onClick={() => {
                const result = calculateArray(input);
                setInput([result]); // Set input to the result on click
              }}
              variant="contained"
              color="success"
              fullWidth
              size="large"
            >
              =
            </Button>

            <Button
              onClick={() => {
                const result = calculateArray(input);
                setInput([]); // Set input to the result on click
              }}
              variant="contained"
              color="error"
              fullWidth
              size="large"
              sx={{ marginTop: 2 }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
