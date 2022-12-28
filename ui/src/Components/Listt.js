import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useContext } from "react";
import ToDoContext from "../Context/ToDoContext";
import EditDialogue from './EditDialogue'

function Listt() {
  const values = useContext(ToDoContext);
  const URL = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    axios
      .get(URL + "/app/")
      .then((response) => {
        values.updateData(response.data.tasks);
      })
      .catch((err) => console.log(err));
  }, [values, URL]);

  const handleToggle = async (e) => {
    try {
      const id = e.target.id;
      const response = await axios.patch(`${URL}/app/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteButtonHandler = async (e) => {
    e.preventDefault();

    try {
      const response1 = await axios.delete(`${URL}/app/${e.target.id}`);
      console.log(response1);

      const response2 = await axios.get(URL + "/app/");
      values.updateData(response2.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const len = values.data.length;

  return (
    <>
      {len && (
        <List
          sx={{
            width: "400px",
            margin: "30px auto",
            bgcolor: "background.paper",
            borderRadius: "5px",
            boxShadow: "1px 1px 40px rgb(219, 218, 218)"
          }}
        >
          {values.data.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value["_id"]}
                secondaryAction={
                  <Box sx={{ display: "flex", gap: "1rem" }}>
                    <IconButton edge="end" aria-label="comments">
                      <EditDialogue id={value["_id"]}><EditIcon /></EditDialogue>
                    </IconButton>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={deleteButtonHandler}
                      id={value["_id"]}
                    >
                      Delete
                    </Button>
                  </Box>
                }
                disablePadding
                id={value["_id"]}
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle}
                  dense
                  id={value["_id"]}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value.completed}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                      color="info"
                      id={value["_id"]}
                    />
                  </ListItemIcon>

                  <ListItemText id={value["_id"]} primary={value.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
}

export default Listt;
