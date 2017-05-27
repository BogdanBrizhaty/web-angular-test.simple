app.service('cartService', function () {
    var productList = [];

  var addProduct = (newObj) => {
      productList.push(newObj);
  };
  var count = () => {
      return productList.length;
  };
  var getProducts = () =>{
      return productList;
  };
  var removeProduct = (phone) => {
    var index = productList.findIndex((e) => {
        return e.Model == phone.Model && e.Brand == phone.Brand;
    });
    if (index !== -1)
        productList.splice(index, 1);
  };

  return {
    addProduct: addProduct,
    getProducts: getProducts,
    count: count,
    removeProduct: removeProduct
  };
});