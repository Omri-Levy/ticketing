import { Router } from "express";

const signOut = Router();

signOut.post(`/api/users/signOut`, (req, res) => {
  req.session = null;

  res.send();
});

export default signOut;
