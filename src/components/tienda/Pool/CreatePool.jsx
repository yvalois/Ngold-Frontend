import React, { useEffect, useState } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewProduct } from "../../../redux/store/actions/productActions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreatePool = () => {

    const [Nombre, setNombre] = useState("")
    const navigate = useNavigate();
    const product = useSelector((state) => state.product);
    const category = useSelector((state) => state.category);
    const subcategory = useSelector((state) => state.subcategory);
    const { products, initialLoad, loading } = product;
    const { categories, categoriesLoaded } = category;
    const { subCategories, subCategoriesLoaded } = subcategory;
  
  
  
  
    const dispatch = useDispatch();
  
    const [newProduct, setNewProduct] = useState({
      name: "",
      price: "",
      description: "",
      countInStock: "",
      imageToCharge: "",
      category: "",
      subcategory: "",
      discount: 0
    });
  
    const convertImageToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      formData.append("countInStock", newProduct.countInStock);
      formData.append("imageUrl", newProduct.imageToCharge);
      formData.append("category", newProduct.category);
      //if value "" alert 
      if (newProduct.name === "" || newProduct.price === "" || newProduct.description === "" || newProduct.countInStock === "" || newProduct.imageToCharge === "" || newProduct.category === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill all fields",
        });
        return;
      }
      try {
        dispatch(fetchNewProduct(newProduct));
        setNewProduct({
          name: "",
          price: "",
          description: "",
          countInStock: "",
          imageToCharge: "",
          category: "",
          subcategory: "",
          discount: 0
        });
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product has been added",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
        });
      }
  
    }

  return (
    <form onSubmit={handleSubmit}>
      <div className='create-pool'>
        <div>
          <input
            type="number"
            placeholder="Apr"
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Maximo por wallet"
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Maximo por pool"
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Tiempo de bloqueo"
            required
          />
        </div>
        <div className="form-select" id="subject">
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
            <option value="">Category...</option>
            {categoriesLoaded &&
              categories.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <input
            type="number"
            placeholder="Calculo de recompensa"
            required
          />
        </div>
        <div className='save'>
        <input
                  type="submit"
                  className="button-admin-product-save"
                  value="Guardar producto"
                />

        </div>
      </div>
    </form>
  )
}

export default CreatePool