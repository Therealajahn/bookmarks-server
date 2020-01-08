const express = require("express");
const markRouter = express.Router();
const store = require("./store");
const uuid = require("uuid/v4");

markRouter.get("/", (req, res) => {
  res.send(store);
});

markRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const bookmark = store.find(b => b.id == id);
  if (!bookmark) {
    return res.status(404).send("No bookmark FOUND FFS!");
  }
  res.send(bookmark.mark);
});

markRouter.post("/", function addNewBookMark(req, res) {
  const newId = uuid();
  console.log(req.body.mark);
  const newMark = req.body.mark;
  
  const postMark = {
    id: newId,
    mark: newMark
  }
  
  store.push(postMark);

  res  
    .send(postMark);
});

markRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const markIndex = store.findIndex(b => b.id == id);

  if (markIndex == -1) {
    res.status(404).send("enter a valid id");
  }

  store.splice(markIndex, 1);
  res
    .send(store)
    .status(204)
    .end();
});

module.exports = markRouter;
