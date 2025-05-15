// lib/multer.ts
import multer from "multer";
import { NextApiRequest } from "next";

const storage = multer.memoryStorage();

export const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};
