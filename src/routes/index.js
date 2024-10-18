import express from "express";
import * as productController from "../controllers/product.js";
import * as authController from "../controllers/auth.js";
import { isAuthenticated } from "../middlewares/auth.js";
import User from "../models/users.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/login", (req, res) => res.render("login"));
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get(
  "/admin/products",
  isAuthenticated,
  productController.getAdminProducts
);
router.post(
  "/admin/products",
  isAuthenticated,
  productController.createProduct
);
router.put(
  "/admin/products/:id",
  isAuthenticated,
  productController.updateProduct
);
router.delete(
  "/admin/products/:id",
  isAuthenticated,
  productController.deleteProduct
);

router.get("/setup", async (req, res) => {
  try {
    const adminUser = await User.findOne({
      username: process.env.ADMIN_USERNAME,
    });
    if (adminUser) {
      return res.status(409).send("Admin já existe.");
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const newAdmin = new User({
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).send("Usuário admin criado com sucesso.");
  } catch (error) {
    console.error("Erro ao criar admin:", error);
    res.status(500).send("Erro ao criar o usuário admin.");
  }
});

export default router;
