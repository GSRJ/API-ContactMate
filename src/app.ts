import cors from "cors";
import express, { Application } from "express";
import "express-async-errors";
import { handleError } from "./errors";
import { contactRoutes, contactRoutesAll } from "./routers/contact.routes";
import loginRoutes from "./routers/login.routes";
import { userRoutes, userRoutesAll } from "./routers/user.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/users", userRoutesAll);
app.use("/login", loginRoutes);

app.use("/contact", contactRoutes);
app.use("/contacts", contactRoutesAll);

app.use(
  cors({
    origin: "*",
  })
);
app.use(handleError);
export default app;
