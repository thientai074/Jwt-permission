import express from "express";
import RoleController from "../controlllers/role.controller";
const { rightToAction } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/role", rightToAction("create-role"), RoleController.createRole);

router.get("/role", rightToAction("get-roles"), RoleController.getAllRoles);

router.delete("/role", rightToAction("delete-role"), RoleController.deleteRole);

router.put("/role", rightToAction("update-role"), RoleController.updateRole);

export default router;
