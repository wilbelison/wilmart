import Product from "../models/products.js";

const fetchProducts = async (view, res) => {
  try {
    const products = await Product.find().lean();
    res.render(view, { products });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).send("Erro ao buscar produtos");
  }
};

export const getAllProducts = async (req, res) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  await fetchProducts("home", res);
};

export const getAdminProducts = async (req, res) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  await fetchProducts("admin", res);
};

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return res
        .status(400)
        .send(
          "Todos os campos são obrigatórios: título, descrição, preço, thumbnail, código e estoque."
        );
    }

    const newProduct = new Product({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    await newProduct.save();
    res.status(201).redirect("/admin/products");
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).send("Erro ao criar produto");
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock } = req.body;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return res
        .status(400)
        .send(
          "Todos os campos são obrigatórios: título, descrição, preço, thumbnail, código e estoque."
        );
    }

    await Product.findByIdAndUpdate(id, {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    res.status(200).redirect("/admin/products");
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).send("Erro ao atualizar produto");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).redirect("/admin/products");
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).send("Erro ao deletar produto");
  }
};
