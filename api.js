import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "bat",
      stock: 405,
    },
    {
      id: 2,
      name: "football",
      stock: 1405,
    },
    {
      id: 3,
      name: "football",
      stock: 4805,
    },
  ];

  res.status(202).json(products);
});

app.get("/api/product/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const products = [
    {
      id: 1,
      name: "bat",
      stock: 405,
    },
    {
      id: 2,
      name: "football",
      stock: 1405,
    },
    {
      id: 3,
      name: "football",
      stock: 4805,
    },
  ];
  const product = products.find((p) => p.id === parseInt(id));
  console.log(product);
  res.status(202).json(product);
});

app.post("/api/products", (req, res) => {
  const newProduct = req.body;
  console.log(newProduct)
  newProduct.id = Date.now();
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`api.js server running on http://localhost:${PORT}`);
});
