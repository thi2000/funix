const Product = require("../model/product");
exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.id;
  Product.find({ _id: prodId }).then((product) => {
    res.send(product);
  });
  // Product.findByPk(prodId).then((product) => {
  //   res.send(product);
  // });
};
exports.postEditProduct = (req, res, next) => {
  console.log(req.body.data.title);
  const prodId = req.body.data._id;
  const updatedTitle = req.body.data.title;
  const updatedPrice = req.body.data.price;
  const updatedImageUrl = req.body.data.imageUrl;
  const updatedDesc = req.body.data.description;
  Product.findByIdAndUpdate(
    { _id: prodId },
    {
      title: updatedTitle,
      price: updatedPrice,
      description: updatedDesc,
      imageUrl: updatedImageUrl,
    }
  )

    .then((result) => {
      console.log("UPDATED PRODUCT!");
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.data.title;
  const imageUrl = req.body.data.imageUrl;
  const price = req.body.data.price;
  const description = req.body.data.description;

  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  });
  return product.save();
};
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.prodId;
  console.log(req.body.prodId);
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("DESTROYED PRODUCT");
    })
    .catch((err) => console.log(err));
};
