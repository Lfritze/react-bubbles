import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // stretch add new colors - create object ... like colors [] in server.js
  const [createColor, setCreateColor] = useState({
    code: { hex: "" },
    color: "",
    id: Date.now()
  });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/api/colors/${colorToEdit}`, colorToEdit)
      .then(res => {
        let colorArray = colors.filter(color => color.id !== res.data.id);
        updateColors([...colorArray, res.data]);
        setEditing(false);
      })
      .catch(err => console.log("error in saveEdit in ColorList", err.res));
    // Make a put request to save your updated color
    // think about where will you get the id from... **(colorToEdit)***
    // where is is saved right now?
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(() => {
        updateColors(colors.filter(colorThing => colorThing.id !== color.id));
        setEditing(false);
      });
    // make a delete request to delete this color
  };

  const createNewColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/api/colors`, createColor)
      .then(res => updateColors(res.data));
  };

  const createColorOnChange = e => {
    e.preventDefault();
    setCreateColor({
      ...createColor,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="colors-wrap">
      <p>Click a Color to Edit</p>
      <small>Click x to delete colors</small>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <form className="addColor" onSubmit={createNewColor}>
        <legend>add new color</legend>
        <label>
          hex code:
          <input
            type="text"
            name="code"
            placeholder="hex code"
            value={createColor.code.hex}
            onChange={e =>
              setCreateColor({ ...colorToEdit, code: { hex: e.target.value } })
            }
          />
        </label>
        <label>
          color name:
          <input
            type="text"
            name="color"
            placeholder="color name"
            value={createColor.color}
            onChange={createColorOnChange}
          />
        </label>
        <div className="button-row">
          <button type="submit">Create New Color</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
