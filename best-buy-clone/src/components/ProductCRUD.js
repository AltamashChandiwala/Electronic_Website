import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { database, storage } from '../firebase'; // Import the Realtime Database instance from firebase.js

const ProductCRUD = () => {
  const [productCount, setProductCount] = useState(16);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    image: '',
    seller_id: 1,
    item_categories_id: 1,
    product_name: '',
    stars: 4.5,
    new_price: '',
    old_price: '',
    discount: 7,
    special_offer: '10% Off on SBI Cards',
    delivery_type: 'Free delivery by Amazon',
    desc_1: '',
    desc_2: '',
    desc_3: '',
    desc_4: '',
    product_id: '',
    category_id: 2,
    image_gallery: [],
    desc_img: [],
  });
  const [errors, setErrors] = useState({
    product_name: '',
    new_price: '',
    old_price: '',
    image: '',
    desc_1: '',
    desc_2: '',
    desc_3: '',
    desc_4: '',
    image_gallery: '',
    desc_img: '',
  });
  const [selectedCategory, setSelectedCategory] = useState('mobiles'); // Default selected category

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]); // Trigger fetchProducts when selectedCategory changes

  const fetchProducts = () => {
    const productsRef = database.ref(selectedCategory); // Use selected category for fetching products
    productsRef.on('value', (snapshot) => {
      const productsData = snapshot.val();
      if (productsData) {
        const productList = Object.keys(productsData).map((key) => ({
          ...productsData[key],
          product_id: key,
        }));
        setProducts(productList);
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Check for negative values for new_price and old_price
    if ((name === 'new_price' || name === 'old_price') && parseFloat(value) < 0) {
      return; // Do not update state if value is negative
    }

    setNewProduct({ ...newProduct, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when input changes
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const promises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = storage.ref(`product-images/${file.name}`);

      // Upload file to Firebase Storage and get download URL
      const uploadTask = storageRef.put(file);
      const promise = new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            reject(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
      promises.push(promise);
    }

    // After all uploads are completed, update newProduct with image URLs
    Promise.all(promises)
      .then((downloadURLs) => {
        setNewProduct({ ...newProduct, [e.target.name]: downloadURLs });
      })
      .catch((error) => {
        console.error('Error uploading images:', error);
      });
  };

  const addProduct = (e) => {
    e.preventDefault();

    // Validate form inputs
    const { product_name, old_price, new_price, image, desc_1, desc_2, desc_3, desc_4, image_gallery, desc_img } = newProduct;
    let formIsValid = true;
    const newErrors = { ...errors };

    if (!product_name.trim()) {
      newErrors.product_name = 'Product name is required';
      formIsValid = false;
    }

    if (!new_price || new_price <= 0) {
      newErrors.new_price = 'Price must be a positive number';
      formIsValid = false;
    }

    if (!old_price || old_price <= 0) {
      newErrors.old_price = 'Old price must be a positive number';
      formIsValid = false;
    }

    if (!image || !image.length) {
      newErrors.image = 'Main image is required';
      formIsValid = false;
    }

    if (!desc_1.trim()) {
      newErrors.desc_1 = 'Description 1 is required';
      formIsValid = false;
    }

    if (!desc_2.trim()) {
      newErrors.desc_2 = 'Description 2 is required';
      formIsValid = false;
    }

    if (!desc_3.trim()) {
      newErrors.desc_3 = 'Description 3 is required';
      formIsValid = false;
    }

    if (!desc_4.trim()) {
      newErrors.desc_4 = 'Description 4 is required';
      formIsValid = false;
    }

    if (!image_gallery.length) {
      newErrors.image_gallery = 'Image gallery is required';
      formIsValid = false;
    }

    if (!desc_img.length) {
      newErrors.desc_img = 'Description images are required';
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    // Add product to the database if form is valid
    const productsRef = database.ref(selectedCategory);
    const newProductRef = productsRef.push();
    newProductRef
      .set(newProduct)
      .then(() => {
        alert('Product added successfully!');
        setProductCount(productCount + 1); // Increment product count for next product
        setNewProduct({ ...newProduct, product_id: '', image: '', image_gallery: [], desc_img: [] }); // Clear the form after adding
        document.getElementById('productImage').value = ''; // Reset main image input field
        document.getElementById('imageGallery').value = ''; // Reset image gallery input field
        document.getElementById('descImages').value = ''; // Reset description images input field
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        alert('Error adding product. Please try again.');
      });
  };

 // Function to update a product
 const updateProduct = (productId) => {
  const productToUpdate = products.find((product) => product.product_id === productId);
  if (productToUpdate) {
    setSelectedProduct(productToUpdate);
    setNewProduct({ ...productToUpdate });
  }
};

// Function to save updated product data
const saveUpdatedProduct = () => {
  // Validate form inputs
  const { product_name, old_price, new_price, desc_1, desc_2, desc_3, desc_4 } = newProduct;
  let formIsValid = true;
  const newErrors = { ...errors };

  if (!product_name.trim()) {
    newErrors.product_name = 'Product name is required';
    formIsValid = false;
  }

  if (!new_price || new_price <= 0) {
    newErrors.new_price = 'Price must be a positive number';
    formIsValid = false;
  }

  if (!old_price || old_price <= 0) {
    newErrors.old_price = 'Old price must be a positive number';
    formIsValid = false;
  }

  if (!desc_1.trim()) {
    newErrors.desc_1 = 'Description 1 is required';
    formIsValid = false;
  }

  if (!desc_2.trim()) {
    newErrors.desc_2 = 'Description 2 is required';
    formIsValid = false;
  }

  if (!desc_3.trim()) {
    newErrors.desc_3 = 'Description 3 is required';
    formIsValid = false;
  }

  if (!desc_4.trim()) {
    newErrors.desc_4 = 'Description 4 is required';
    formIsValid = false;
  }


  if (!formIsValid) {
    setErrors(newErrors);
    return;
  }
  if (selectedProduct) {
    // const productRef = database.ref(`mobiles/${selectedProduct.product_id}`);
    const productRef = database.ref(`${selectedCategory}/${selectedProduct.product_id}`);
    productRef
      .update(newProduct)
      .then(() => {
        alert('Product updated successfully!');
        fetchProducts(); // Fetch updated product list
        setNewProduct({}); // Clear the form after updating
        setSelectedProduct(null);
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        alert('Error updating product. Please try again.');
      });
  }
};
  

  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // const productRef = database.ref(`mobiles/${productId}`);
      const productRef = database.ref(`${selectedCategory}/${productId}`); 
      productRef
        .remove()
        .then(() => {
          alert('Product deleted successfully!');
          fetchProducts(); // Fetch updated product list
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
          alert('Error deleting product. Please try again.');
        });
    }
  };



  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <h2>Add Product</h2>
            {/* Dropdown to select category */}
            <select
              className="form-select mb-3"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="mobiles">Mobiles</option>
              <option value="watches">Watches</option>
            </select>
            {/* Add product form */}
            <form onSubmit={addProduct}>
        {/* Product Name */}
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name:</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            name="product_name"
            value={newProduct.product_name}
            onChange={handleInputChange}
            required
          />
          {errors.product_name && <div className="invalid-feedback">{errors.product_name}</div>}
        </div>
  
        {/* Price */}
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            name="new_price"
            value={newProduct.new_price}
            onChange={handleInputChange}
            required
          />
          {errors.new_price && <div className="invalid-feedback">{errors.new_price}</div>}
        </div>
  
        {/* Old Price */}
        <div className="mb-3">
          <label htmlFor="productOldPrice" className="form-label">Old Price:</label>
          <input
            type="number"
            className="form-control"
            id="productOldPrice"
            name="old_price"
            value={newProduct.old_price}
            onChange={handleInputChange}
            required
          />
          {errors.old_price && <div className="invalid-feedback">{errors.old_price}</div>}
        </div>
  
        {/* Main Image */}
        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">Main Image:</label>
          <input
            type="file"
            className="form-control"
            id="productImage"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          {errors.image && <div className="invalid-feedback">{errors.image}</div>}
        </div>
  
        {/* Description 1 */}
        <div className="mb-3">
          <label htmlFor="productDesc1" className="form-label">Description 1:</label>
          <textarea
            className="form-control"
            id="productDesc1"
            name="desc_1"
            value={newProduct.desc_1}
            onChange={handleInputChange}
          />
          {errors.desc_1 && <div className="invalid-feedback">{errors.desc_1}</div>}
        </div>
  
        {/* Description 2 */}
        <div className="mb-3">
          <label htmlFor="productDesc2" className="form-label">Description 2:</label>
          <textarea
            className="form-control"
            id="productDesc2"
            name="desc_2"
            value={newProduct.desc_2}
            onChange={handleInputChange}
          />
          {errors.desc_2 && <div className="invalid-feedback">{errors.desc_2}</div>}
        </div>
  
        {/* Description 3 */}
        <div className="mb-3">
          <label htmlFor="productDesc3" className="form-label">Description 3:</label>
          <textarea
            className="form-control"
            id="productDesc3"
            name="desc_3"
            value={newProduct.desc_3}
            onChange={handleInputChange}
          />
          {errors.desc_3 && <div className="invalid-feedback">{errors.desc_3}</div>}
        </div>
  
        {/* Description 4 */}
        <div className="mb-3">
          <label htmlFor="productDesc4" className="form-label">Description 4:</label>
          <textarea
            className="form-control"
            id="productDesc4"
            name="desc_4"
            value={newProduct.desc_4}
            onChange={handleInputChange}
          />
          {errors.desc_4 && <div className="invalid-feedback">{errors.desc_4}</div>}
        </div>
  
        {/* Image Gallery */}
        <div className="mb-3">
          <label htmlFor="imageGallery" className="form-label">Image Gallery:</label>
          <input
            type="file"
            className="form-control"
            id="imageGallery"
            name="image_gallery"
            onChange={handleImageChange}
            accept="image/*"
            multiple
          />
          {errors.image_gallery && <div className="invalid-feedback">{errors.image_gallery}</div>}
        </div>
  
        {/* Description Images */}
        <div className="mb-3">
          <label htmlFor="descImages" className="form-label">Description Images:</label>
          <input
            type="file"
            className="form-control"
            id="descImages"
            name="desc_img"
            onChange={handleImageChange}
            accept="image/*"
            multiple
          />
          {errors.desc_img && <div className="invalid-feedback">{errors.desc_img}</div>}
        </div>
  
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
            {selectedProduct && (
              <div>
                <button type="button" className="btn btn-success mt-3" onClick={saveUpdatedProduct}>Update Product</button>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <h2>Products</h2>
            <table className="table">
              {/* Your table header */}
              <tbody>
                {products.map((product) => (
                  <tr key={product.product_id}>
                    <td>{product.product_name}</td>
                    <td>${product.new_price}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => updateProduct(product.product_id)}>Edit</button>
                      <button className="btn btn-danger ml-2" onClick={() => deleteProduct(product.product_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductCRUD;
