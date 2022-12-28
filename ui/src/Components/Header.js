import { Box, Typography, Button } from "@mui/material";
import image from "../Assets/bg-desktop-dark.jpg";
import style from "./Style.module.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import ToDoContext from "../Context/ToDoContext";

function Header() {
  const [input, setInput] = useState("");

  const URL = process.env.REACT_APP_BACKEND_URL;

  const values = useContext(ToDoContext);

  const addButtonHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(URL + "/app/", {
        name: input,
        completed: false,
      });

      console.log(response);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get(URL + "/app/")
      .then((response) => {
        values.updateData(response.data.tasks);
      })
      .catch((err) => console.log(err));
  }, [values, URL]);

  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        height: "240px",
        backgroundSize: "cover",
        // backgroundColor: "Gray",
        // backgroundBlendMode: "multiply",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" mb="25px" color="White">
          Task Manager
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "400px",
          }}
        >
          <input
            value={input}
            onChange={inputChangeHandler}
            className={style.input}
            type="text"
            placeholder="Add a task..."
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={addButtonHandler}
          >
            Add Task
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
