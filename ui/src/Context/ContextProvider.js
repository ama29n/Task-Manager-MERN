import React from "react";
import ToDoContext from "./ToDoContext";
import { useReducer } from "react";

const defaultValues = {
  data: [],
};

const reducerFunction = (state, action) => {
  if (action.identifier === "updateData") {
    return {
      data: action.list,
    };
  }
};

function ContextProvider(props) {
  const [ToDoState, dispatchFunction] = useReducer(
    reducerFunction,
    defaultValues
  );

  const updateData = (newList) => {
    dispatchFunction({ identifier: "updateData", list: newList });
  };

  const values = {
    data: ToDoState.data,
    updateData: updateData,
  };

  return (
    <ToDoContext.Provider value={values}>{props.children}</ToDoContext.Provider>
  );
}

export default ContextProvider;
