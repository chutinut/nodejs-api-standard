import { Router } from "express";
import routes from "../routes/member.routes.js";
const router = Router();
router.use("/member", routes);
export default router;
