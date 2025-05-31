import express from "express";
import auth from "../../middleware/auth";
import permit from "../../middleware/permit";
import cocktailsRouter from "../cocktails";


const adminRouter = express.Router();

adminRouter.use(auth, permit('admin'))
adminRouter.use('/cocktails', cocktailsRouter);

export default adminRouter;