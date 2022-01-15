import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  console.log("hello");
});

export { router as currentUserRouter };
