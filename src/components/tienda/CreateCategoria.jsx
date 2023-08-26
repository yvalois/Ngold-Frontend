import React, { useState, useEffect } from 'react'
import { AiTwotoneEdit, AiFillCloseCircle } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

import {
    deleteCategory,
    newCategory,
} from "../../redux/store/actions/categoryAction";
import Swal from "sweetalert2";
function CreateCategoria() {
    const category = useSelector((state) => state.category);
    const { categories, categoriesLoaded, loading } = category;
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState("");

    const handleNewCategory = () => {
        if (categoryName !== "") {
            try {
                dispatch(newCategory(categoryName));
                setCategoryName("");
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "New category has been added",
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error creating category",
                });
            }

        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter category name",
            });
        }
    };

    const handleDeleteCategory = (id) => {
        dispatch(deleteCategory(id));
    };



    return (
        <div className='create-category'>
            <div className='create'>
                <h4>
                    Categoria
                </h4>
                <div className='crear'>
                    <input
                        type="text"
                        placeholder='Nombre'
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <button onClick={handleNewCategory}>
                        Crear
                    </button>
                </div>

            </div>


            <div className='create-category-2'>
                <div className='car-contenedor'>
                    <div className="overflow-table">
                        <div className='dashboard-content inventory content-tab'>
                            <div className="inner-content inventory">

                                <div className="table-ranking top">

                                    <div className="title-ranking2">
                                        <div className="col-rankingg">Id</div>
                                        <div className="col-rankingg">Nombre</div>
                                        <div className="col-rankingg">Eliminar</div>
                                    </div>

                                </div>




                                {categoriesLoaded ? (
                                    <>
                                        {categories.length > 0 && (
                                            categories.map((category, index) => 
                                            <>
                                                <div className="table-ranking ">
                                                    <div className="content-ranking2">
                                                        <div className="col-rankingg">{index}</div>
                                                        <div className="col-rankingg">{category.name}</div>
                                                        <div className="col-rankingg ">
                                                            <div className='contenedor-de'>
                                                                <div className='delete-button' onClick={() => handleDeleteCategory(category._id)}>

                                                                    <FaTrash />

                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>


                                                </div>
                                            </>)
                                        )}
                                        {categories.length <= 0 && (
                                            <h4>
                                                No hay categorias
                                            </h4>
                                        )}
                                        </>
                                        )
                                        :
                                        <h4>
                                            Cargando
                                        </h4>}

                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

            

        </div>
    )
}

export default CreateCategoria