import { Router } from "express";
import * as controller from "../controllers/member.controller.js";
const router = Router();
router.get("/get-members", controller.getMembers);
router.post("/create-member", controller.createMember);
router.put("/update-member", controller.updateMember);
router.delete("/delete-member", controller.deleteMember);
export default router;
