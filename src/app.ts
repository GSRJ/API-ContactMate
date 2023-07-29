import express, { Application } from "express";
import "express-async-errors";
import { handleError } from "./errors";
import loginRoutes from "./routers/login.routes";
import { userRoutes, userRoutesAll } from "./routers/user.routes";

const app: Application = express();

app.use(express.json());
app.use("/user", userRoutes);
app.use("/users", userRoutesAll);
app.use("/login", loginRoutes);

app.use(handleError);
export default app;
