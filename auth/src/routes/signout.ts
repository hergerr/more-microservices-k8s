import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  console.log("hello");
});

export { router as signoutRouter };
