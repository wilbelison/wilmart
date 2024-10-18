import User from "../models/User.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render("login", {
      error: "Por favor, preencha todos os campos.",
    });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.render("login", { error: "Usuário não encontrado." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { error: "Senha inválida." });
    }

    req.session.user = { id: user._id, username: user.username };
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Erro no login:", error.message);
    res.render("login", {
      error:
        "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.",
    });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erro ao fazer logout:", err.message);
    }
    res.redirect("/");
  });
};
