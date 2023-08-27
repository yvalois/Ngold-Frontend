import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CreatePool from './CreatePool';
import { AiTwotoneEdit, AiFillCloseCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from "react-redux";
import { fetchNewProduct } from "../../../redux/store/actions/productActions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Pools = () => {
    const [id, setId] = useState(0);
    const [edit, setEdit] = useState(false)

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

    const [dataTab] = useState([
        {
            id: 1,
            title: 'Crear',
            item: 0,
        },
        {
            id: 2,
            title: 'Pools',
            item: 3,
        }

    ]);

    const editar = (id) => {
        setId(id)
        setEdit(!edit)
    }
    return (
        <div>                        <Tabs>
            <div className="d-flex justify-content-between mb-wr">
                <TabList>

                    {
                        dataTab.map(idx => (
                            <Tab key={idx.id} className="new-design">{idx.title}</Tab>
                        ))
                    }



                </TabList>
            </div>

            <TabPanel >
                <div className='content'>
                    <CreatePool />

                </div>
            </TabPanel>
            <TabPanel>
                {!edit && (
                    <div className='content'>

                        <div className='car-contenedor'>
                            <div className="overflow-table">
                                <div className='dashboard-content inventory content-tab'>
                                    <div className="inner-content inventory">
                                        <h4 className="title-dashboard">Pools</h4>

                                        <div className="table-ranking top">

                                            <div className="title-ranking">
                                                <div className="col-rankingg">#</div>
                                                <div className="col-rankingg">Wallet</div>
                                                <div className="col-rankingg">Pool ID</div>
                                                <div className="col-rankingg">Reward Colected</div>
                                                <div className="col-rankingg">Token</div>
                                                <div className="col-rankingg">Editar</div>
                                            </div>

                                        </div>
                                        {/* {
                  products.length == 0 &&
                  <div>
                    Your Cart Is Empty <Link to="tienda" className="text-blue-500">Go Back</Link>

                  </div>
                } */}

                                        <div className="table-ranking " >
                                            <div className="content-ranking">
                                                <div className="col-rankingg">1</div>
                                                <div className="col-rankingg">
                                                    0x
                                                </div>
                                                <div className="col-rankingg coin">                      1</div>
                                                <div className="col-rankingg">
                                                    2

                                                </div>
                                                <div className="col-rankingg ">
                                                    Ngold

                                                </div>
                                                <div className="col-rankingg ">
                                                    <div className='contenedor-de'>
                                                        <div className='delete-button' onClick={() => editar(2)}>

                                                            <AiTwotoneEdit />

                                                        </div>
                                                    </div>


                                                </div>

                                            </div>


                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {edit && <div className='content'>
                    <form onSubmit={handleSubmit}>
                        <div className='create-pool'>
                            <div className='close-edit' >
                                <span>
                                    <AiFillCloseCircle onClick={() => editar(2)} />
                                </span>
                            </div>
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
                </div>}
            </TabPanel>


        </Tabs></div>
    )
}

export default Pools