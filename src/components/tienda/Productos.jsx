import React, { useState, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa';
import { AiTwotoneEdit, AiFillCloseCircle } from 'react-icons/ai';
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteProducts, fetchNewProduct, editProducts } from "../../redux/store/actions/productActions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function Productos() {
    const [edit, setEdit] = useState(false)
    const [id, setId] = useState()
    const navigate = useNavigate();
    const productss = useSelector((state) => state.product);
    const category = useSelector((state) => state.category);
    const subcategory = useSelector((state) => state.subcategory);
    const { products, initialLoad, loading } = productss;
    const { categories, categoriesLoaded } = category;
    const { subCategories, subCategoriesLoaded } = subcategory;
    const Products = useSelector(state => state.product);
    const subCategory = useSelector(state => state.subcategory);
    const [productFind, setProductFind] = useState(false);
    const [product, setProduct] = useState({});
    const [loading2,setLoading] = useState(false)
    const dispatch = useDispatch();

    const editar = (id) => {
        setId(id);
        setEdit(!edit)
        const Product = products.find((p) => p._id === id);
        setProduct({ ...Product, newImg: "" });
        setProductFind(true);
        setLoading(false)
    }


    const handleChange = (e) => {
        e.preventDefault();

        dispatch(editProducts(product, id));
        Swal.fire({
            title: "Success",
            text: "Product has been updated",
            icon: "success",
            confirmButtonText: "OK",
        });
    }

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }


    return (
        <>
            {!edit && !loading &&  <div className='admin-products' >
                {!initialLoad  ? (
                    products.length > 0 ? (
                        <div className='car-contenedor'>
                            <div className="overflow-table">
                                <div className='dashboard-content inventory content-tab'>
                                    <div className="inner-content inventory">
                                        <h4 className="title-dashboard">Productos</h4>

                                        <div className="table-ranking top">

                                            <div className="title-ranking">
                                                <div className="col-rankingg">Imagen</div>
                                                <div className="col-rankingg">Nombre</div>
                                                <div className="col-rankingg">Precio</div>
                                                <div className="col-rankingg">Categoria</div>
                                                <div className="col-rankingg">Stock</div>
                                                <div className="col-rankingg">Editar</div>
                                                <div className="col-rankingg">Eliminar</div>
                                            </div>

                                        </div>
                                        {/* {
                  products.length == 0 &&
                  <div>
                    Your Cart Is Empty <Link to="tienda" className="text-blue-500">Go Back</Link>

                  </div>
                } */}
                                        {products.map
                                            ((item, index) => <>
                                                <div className="table-ranking " key={index}>
                                                    <div className="content-ranking">
                                                        <div className="col-rankingg"><div className="image"><img src={item.imageUrl.url} alt={item.name} /></div></div>
                                                        <div className="col-rankingg">
                                                            {item.name}
                                                        </div>
                                                        <div className="col-rankingg coin">                      {item.price}
                                                            busd</div>
                                                        <div className="col-rankingg">
                                                            {item.categorieId.name}

                                                        </div>
                                                        <div className="col-rankingg ">
                                                            {item.countInStock}

                                                        </div>
                                                        <div className="col-rankingg ">
                                                            <div className='contenedor-de'>
                                                                <div className='delete-button' onClick={() => editar(item._id)}>

                                                                    <AiTwotoneEdit />

                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div className="col-rankingg ">
                                                            <div className='contenedor-de'>
                                                                <div className='delete-button' onClick={() => dispatch(deleteProducts(item._id))}>

                                                                    <FaTrash />

                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>


                                                </div>
                                            </>)}

                                    </div>
                                </div>
                            </div>
                        </div>
                    ) :
                        (<h4>
                            No tienes productos
                        </h4>)
                ) :
                    <h4>Cargando...</h4>}

            </div>
            }

            {loading && <div>
                <h4>
                    Cargando
                </h4>
            </div>}

             {edit && !loading && productFind && <form onSubmit={(e)=>handleChange(e)}>
            <div className='product-form'>
                <div className='close-edit' >
                    <span>
                        <AiFillCloseCircle onClick={() => setEdit(!edit)} />
                    </span>
                </div>
                <div className='image-product'>
                {product.newImg !== "" &&
            <div className="image-product-selected">
              <div
                className="image-product-selected-close"
                onClick={() => setProduct({ ...product, newImg: "" })}
              >Eliminar</div>
              <img src={product.newImg} alt="selected-image" />
            </div>
          }

          {product.newImg === "" &&
            <>
              <input
                className="input-select-product"
                id="file-upload"
                type="file"
                onChange={(e) => {
                  convertImageToBase64(e.target.files[0]).then((base64) => {
                   setProduct({ ...product, newImg: base64 });
                  })
                }}
              />
              <label className="custom-input-button" htmlFor="file-upload"> Cambiar </label>
            </>
          }
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={product.name}
                        onChange={(e) =>
                            setProduct({ ...product, name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Precio"
                        value={product.price}
                        onChange={(e) =>
                            setProduct({ ...product, price: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Stock"
                        value={product.countInStock}
                        onChange={(e) => setProduct({ ...product, countInStock: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <fieldset className="message">
                        <textarea id="message" name="message" rows="4" placeholder="Message" tabIndex="4" aria-required="true" required="" />
                    </fieldset>
                </div>
                <div className="form-select" id="subject">
                    <select
                        value={product.categorieId._id}
                        onChange={(e) =>
                            setProduct({ ...product, categorieId: e.target.value })}
                    >
                        <option value={product.categorieId}>{product.categorieId.name}</option>
                        {categoriesLoaded &&
                            categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}

                    </select>
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="descuento"
                        value={product.discount}
                        onChange={(e) =>
                            setProduct({ ...product, discount: e.target.value })}
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
} 
        </>

    )
}

export default Productos