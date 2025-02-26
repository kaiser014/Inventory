import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";

const EditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({ status: 1 });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [attributes, setAttributes] = useState([]);
  // const [shops, setShops] = useState([]);

  const [allSubCategories, setAllSubCategories] = useState([]);

  // const [attribute_input, setAttribute_input] = useState({});
  // const [specification_input, setSpecification_input] = useState({});

  // const [attributeFiled, setAttributeField] = useState([]);
  // const [attributeFieldId, setAttributeFieldId] = useState(1);
  // const [specificationFiled, setSpecificationFiled] = useState([]);
  // const [specificationFiledId, setSpecificationFiledId] = useState(1);

  // const [productAttributeData, setProductAttributeData] = useState([]);
  // const [productSpecificationData, setProductSpecificationData] = useState([]);

  const getAddProductData = () => {
    axios.get(`get-add-product-data`).then((res) => {
      setCategories(res.data.categories);
      setBrands(res.data.brands);
      setAttributes(res.data.attributes);
      setSuppliers(res.data.suppliers);
      setAllSubCategories(res.data.sub_categories);
      // setShops(res.data.shops);
    });
  };

  const getProduct = () => {
    axios.get(`product/${params.id}`).then((res) => {
      setInput(res.data.data);
    });
  };

  const handleInput = (e) => {
    if (e.target.name === "name") {
      let slug = e.target.value;
      slug = slug.toLowerCase();
      slug = slug.replaceAll(" ", "-");
      setInput((prevState) => ({ ...prevState, slug: slug }));
    } else if (e.target.name == "category_id") {
      let category_id = parseInt(e.target.value);
      if (!Number.isNaN(category_id)) {
        let sub_category = allSubCategories.filter((item, index) => {
          return item.category_id == category_id;
        });
        setSubCategories(sub_category);
      }
    }
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   const handlePhoto = (e) => {
  //     let file = e.target.files[0];
  //     let reader = new FileReader();
  //     reader.onloadend = () => {
  //       setInput((prevState) => ({ ...prevState, photo: reader.result }));
  //     };
  //     reader.readAsDataURL(file);
  //   };
  const handleProductUpdate = () => {
    setIsLoading(true);
    axios
      .put(`/product/${params.id}`, input)
      .then((res) => {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: res.data.cls,
          title: res.data.message,
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        });
        navigate("/product");
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  // const handleSpecificationFieldRemove = (id) => {
  //   setSpecificationFiled((oldValues) => {
  //     return oldValues.filter(
  //       (specificationFiled) => specificationFiled !== id
  //     );
  //   });
  //   setSpecification_input((current) => {
  //     const copy = { ...current };
  //     delete copy[id];
  //     return copy;
  //   });
  //   setSpecificationFiledId(specificationFiledId - 1);
  // };
  // const handleSpecificationFields = (id) => {
  //   setSpecificationFiledId(specificationFiledId + 1);
  //   setSpecificationFiled((prevState) => [...prevState, specificationFiledId]);
  // };

  // const handleAttributeFieldsRemove = (id) => {
  //   setAttributeField((oldValues) => {
  //     return oldValues.filter((attributeFiled) => attributeFiled !== id);
  //   });
  //   setAttribute_input((current) => {
  //     const copy = { ...current };
  //     delete copy[id];
  //     return copy;
  //   });
  //   setAttributeFieldId(attributeFieldId - 1);
  // };
  // const handleAttributeFields = (id) => {
  //   if (attributes.length >= attributeFieldId) {
  //     setAttributeFieldId(attributeFieldId + 1);
  //     setAttributeField((prevState) => [...prevState, attributeFieldId]);
  //   }
  // };
  // const handleSpecificationInput = (e, id) => {
  //   setSpecification_input((prevState) => ({
  //     ...prevState,
  //     [id]: {
  //       ...prevState[id],
  //       [e.target.name]: e.target.value,
  //     },
  //   }));
  // };
  // const handleAttributeInput = (e, id) => {
  //   setAttribute_input((prevState) => ({
  //     ...prevState,
  //     [id]: {
  //       ...prevState[id],
  //       [e.target.name]: e.target.value,
  //     },
  //   }));
  // };

  useEffect(() => {
    getAddProductData();
    getProduct();
  }, []);

  // useEffect(() => {
  //   setInput((prevState) => ({ ...prevState, attributes: attribute_input }));
  // }, [attribute_input]);

  // useEffect(() => {
  //   setInput((prevState) => ({
  //     ...prevState,
  //     specifications: specification_input,
  //   }));
  // }, [specification_input]);

  // const handleMultipleSelect = (e) => {
  //   let value = [];
  //   for (const item of e) {
  //     value.push(item.vale);
  //   }
  //   setInput((prevState) => ({
  //     ...prevState,
  //     shop_ids: value,
  //   }));
  // };

  return (
    <>
      <BreadCrumb title={"Edit Product"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader
              title="Edit Product"
              btn_name="Product List"
              icon="fa-list"
              link="/product"
            />
            <div className="card-body">
              <div className="row">
                {/* Product Name */}
                <div className="col-md-6">
                  <label className="w-100 mt-3">
                    <p>Product Name</p>
                    <input
                      className={
                        errors.name !== undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      name={"name"}
                      type={"text"}
                      value={input.name}
                      placeholder={"Enter product name"}
                      onChange={handleInput}
                    />
                    <p className="login-error-msg">
                      <small>
                        {errors.name !== undefined ? errors.name[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Product Slug */}
                <div className="col-md-6">
                  <label className="w-100 mt-3">
                    <p>Slug</p>
                    <input
                      className={
                        errors.slug !== undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      name={"slug"}
                      type={"text"}
                      value={input.slug}
                      placeholder={"Enter product slug"}
                      onChange={handleInput}
                    />
                    <p className="login-error-msg">
                      <small>
                        {errors.slug !== undefined ? errors.slug[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Category List */}
                <div className="col-md-6">
                  <label className="w-100 mt-3">
                    <p>Select Category</p>
                    <select
                      className={
                        errors.category_id !== undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"category_id"}
                      value={input.category_id}
                      onChange={handleInput}
                    >
                      <option>Select Category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <p className="login-error-msg">
                      <small>
                        {errors.category_id !== undefined
                          ? errors.category_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Sub Category List */}
                <div className="col-md-6">
                  <label className="w-100 mt-3">
                    <p>Select Sub Category</p>
                    <select
                      className={
                        errors.sub_category_id !== undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"sub_category_id"}
                      value={input.sub_category_id}
                      onChange={handleInput}
                      disabled={input.category_id == undefined}
                    >
                      <option>Select Sub Category</option>
                      {subCategories.map((sub_category, index) => (
                        <option key={index} value={sub_category.id}>
                          {sub_category.name}
                        </option>
                      ))}
                    </select>
                    <p className="login-error-msg">
                      <small>
                        {errors.sub_category_id !== undefined
                          ? errors.sub_category_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Supplier List */}
                <div className="col-md-6">
                  <label className="w-100 mt-3">
                    <p>Select Product Supplier</p>
                    <select
                      className={
                        errors.supplier_id !== undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"supplier_id"}
                      value={input.supplier_id}
                      onChange={handleInput}
                    >
                      <option>Select Product Supplier</option>
                      {suppliers.map((supplier, index) => (
                        <option key={index} value={supplier.id}>
                          {supplier.name} - {supplier.phone}
                        </option>
                      ))}
                    </select>
                    <p className="login-error-msg">
                      <small>
                        {errors.supplier_id !== undefined
                          ? errors.supplier_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Select Brand */}
                <div className="col-md-6">
                  <label className="w-100 mt-3">
                    <p>Select Brand</p>
                    <select
                      className={
                        errors.brand_id !== undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"brand_id"}
                      value={input.brand_id}
                      onChange={handleInput}
                    >
                      <option>Select Brand</option>
                      {brands.map((brand, index) => (
                        <option key={index} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                    <p className="login-error-msg">
                      <small>
                        {errors.brand_id !== undefined
                          ? errors.brand_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-12">
                  <div className="card mt-3">
                    <div className="card-header">
                      <h5>Product Attribute and Product Specification</h5>
                    </div>
                    <div className="card-body text-center text-danger">
                      Product Attribute and Product Specification Data Are Not
                      Editable
                    </div>
                  </div>
                </div>
                {/* Attribute & Value */}
                {/* <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-12">
                      <div className="card my-4">
                        <div className="card-header">
                          <h5>Select Product Attribute</h5>
                        </div>
                        <div className="card-body">
                          {attributeFiled.map((id, ind) => (
                            <div
                              key={ind}
                              className="row my-2 align-items-baseline"
                            >
                              <div className="col-md-5">
                                <label className={"w-100 mt-4"}>
                                  <p>Select Attribute</p>
                                  <select
                                    className="form-select mt-2"
                                    name={"attribute_id"}
                                    value={
                                      attribute_input[id] != undefined
                                        ? attribute_input[id].attribute_id
                                        : null
                                    }
                                    onChange={(e) =>
                                      handleAttributeInput(e, id)
                                    }
                                    placeholder={"Select product attribute"}
                                  >
                                    <option>Select Attribute</option>
                                    {attributes.map((value, index) => (
                                      <option value={value.id}>
                                        {value.name}
                                      </option>
                                    ))}
                                  </select>
                                  <p className={"login-error-msg"}>
                                    <small>
                                      {errors.attribute_id != undefined
                                        ? errors.attribute_id[0]
                                        : null}
                                    </small>
                                  </p>
                                </label>
                              </div>
                              <div className="col-md-5">
                                <label className={"w-100 mt-4"}>
                                  <p>Select Attribute Value</p>
                                  <select
                                    className={"form-select mt-2"}
                                    name={"value_id"}
                                    value={
                                      attribute_input[id] != undefined
                                        ? attribute_input[id].value_id
                                        : null
                                    }
                                    onChange={(e) =>
                                      handleAttributeInput(e, id)
                                    }
                                    placeholder={
                                      "Select product attribute value"
                                    }
                                  >
                                    <option>Select Attribute Value</option>
                                    {attributes.map((value, index) => (
                                      <>
                                        {attribute_input[id] != undefined &&
                                        value.id ==
                                          attribute_input[id].attribute_id
                                          ? value.value.map(
                                              (atr_value, value_ind) => (
                                                <option value={atr_value.id}>
                                                  {atr_value.name}
                                                </option>
                                              )
                                            )
                                          : null}
                                      </>
                                    ))}
                                  </select>
                                  <p className={"login-error-msg"}>
                                    <small>
                                      {errors.attribute_id != undefined
                                        ? errors.attribute_id[0]
                                        : null}
                                    </small>
                                  </p>
                                </label>
                              </div>
                              <div className="col-md-2">
                                {attributeFiled.length - 1 == ind ? (
                                  <button
                                    className={"btn btn-danger"}
                                    onClick={() =>
                                      handleAttributeFieldsRemove(id)
                                    }
                                  >
                                    <i className="fa-solid fa-minus" />
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          ))}

                          <div className="row">
                            <div className="col-md-12 text-center">
                              <button
                                className={"btn btn-success"}
                                onClick={handleAttributeFields}
                              >
                                <i className="fa-solid fa-plus" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* Product Specification */}
                {/* <div className="col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="card my-4">
                        <div className="card-header">
                          <h5>Product Specifications</h5>
                        </div>
                        <div className="card-body">
                          {specificationFiled.map((id, ind) => (
                            <div
                              key={ind}
                              className="row my-2 align-items-baseline"
                            >
                              <div className="col-md-5">
                                <label className={"w-100 mt-4"}>
                                  <p>Specification Name</p>
                                  <input
                                    className={"form-control mt-2"}
                                    type={"text"}
                                    name={"name"}
                                    value={
                                      specification_input[id] != undefined
                                        ? specification_input[id].name
                                        : null
                                    }
                                    onChange={(e) =>
                                      handleSpecificationInput(e, id)
                                    }
                                    placeholder={
                                      "Enter Product Specification Name"
                                    }
                                  />
                                  <p className={"login-error-msg"}>
                                    <small>
                                      {errors.name != undefined
                                        ? errors.name[0]
                                        : null}
                                    </small>
                                  </p>
                                </label>
                              </div>
                              <div className="col-md-5">
                                <label className={"w-100 mt-4"}>
                                  <p>Specification Value</p>
                                  <input
                                    className="form-control mt-2"
                                    type={"text"}
                                    name={"value"}
                                    value={
                                      specification_input[id] != undefined
                                        ? specification_input[id].value
                                        : null
                                    }
                                    onChange={(e) =>
                                      handleSpecificationInput(e, id)
                                    }
                                    placeholder={
                                      "Enter Product Specification Name"
                                    }
                                  />
                                  <p className={"login-error-msg"}>
                                    <small>
                                      {errors.name != undefined
                                        ? errors.name[0]
                                        : null}
                                    </small>
                                  </p>
                                </label>
                              </div>
                              <div className="col-md-2">
                                {specificationFiled.length - 1 == ind ? (
                                  <button
                                    className={"btn btn-danger"}
                                    onClick={() =>
                                      handleSpecificationFieldRemove(id)
                                    }
                                  >
                                    <i className="fa-solid fa-minus" />
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          ))}

                          <div className="row">
                            <div className="col-md-12 text-center">
                              <button
                                className={"btn btn-success"}
                                onClick={handleSpecificationFields}
                              >
                                <i className="fa-solid fa-plus" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* Product Price & Stock */}
                <div className="col-md-12 mt-3">
                  <div className="card">
                    <div className="card-header">
                      <h5>Product Price & Stock</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <label className="w-100 mb-3">
                            <p>Product Cost</p>
                            <input
                              className={
                                errors.cost !== undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              name={"cost"}
                              type={"number"}
                              value={input.cost}
                              placeholder={"Enter product cost"}
                              onChange={handleInput}
                            />
                            <p className="login-error-msg">
                              <small>
                                {errors.cost !== undefined
                                  ? errors.cost[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className="w-100 mb-3">
                            <p>Product Sale Price</p>
                            <input
                              className={
                                errors.price !== undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              name={"price"}
                              type={"number"}
                              value={input.price}
                              placeholder={"Enter product price"}
                              onChange={handleInput}
                            />
                            <p className="login-error-msg">
                              <small>
                                {errors.price !== undefined
                                  ? errors.price[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className="w-100 mb-3">
                            <p>Product Discount %</p>
                            <input
                              className={
                                errors.discount_percent !== undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              name={"discount_percent"}
                              type={"number"}
                              value={input.discount_percent}
                              placeholder={"Enter product Discount (%)"}
                              onChange={handleInput}
                            />
                            <p className="login-error-msg">
                              <small>
                                {errors.discount_percent !== undefined
                                  ? errors.discount_percent[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className="w-100 mb-3">
                            <p>Discount Fixed Amount</p>
                            <input
                              className={
                                errors.discount_fixed !== undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              name={"discount_fixed"}
                              type={"number"}
                              value={input.discount_fixed}
                              placeholder={"Enter Discount Fixed Amount"}
                              onChange={handleInput}
                            />
                            <p className="login-error-msg">
                              <small>
                                {errors.discount_fixed !== undefined
                                  ? errors.discount_fixed[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className="w-100 mb-3">
                            <p>Discount Start Date</p>
                            <input
                              className={
                                errors.discount_start !== undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              name={"discount_start"}
                              type={"datetime-local"}
                              value={input.discount_start}
                              placeholder={"Enter Discount Start Time"}
                              onChange={handleInput}
                            />
                            <p className="login-error-msg">
                              <small>
                                {errors.discount_start !== undefined
                                  ? errors.discount_start[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className="w-100 mb-3">
                            <p>Discount End Date</p>
                            <input
                              className={
                                errors.discount_end !== undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              name={"discount_end"}
                              type={"datetime-local"}
                              value={input.discount_end}
                              placeholder={"Enter Discount End Time"}
                              onChange={handleInput}
                            />
                            <p className="login-error-msg">
                              <small>
                                {errors.discount_end !== undefined
                                  ? errors.discount_end[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className="w-100 mb-3">
                            <p>Product Stock</p>
                            <input
                              className={
                                errors.stock !== undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              name={"stock"}
                              type={"number"}
                              value={input.stock}
                              placeholder={"Enter Product Stock"}
                              onChange={handleInput}
                            />
                            <p className="login-error-msg">
                              <small>
                                {errors.stock !== undefined
                                  ? errors.stock[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className="w-100 mb-3">
                            <p>Product SKU</p>
                            <input
                              className={
                                errors.sku !== undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              name={"sku"}
                              type={"text"}
                              value={input.sku}
                              placeholder={"Enter Product SKU"}
                              onChange={handleInput}
                            />
                            <p className="login-error-msg">
                              <small>
                                {errors.sku !== undefined
                                  ? errors.sku[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Status */}
                <div className="col-md-6">
                  <label className="w-100 mt-3">
                    <p>Status</p>
                    <select
                      className={
                        errors.status !== undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"status"}
                      value={input.status}
                      onChange={handleInput}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                    <p className="login-error-msg">
                      <small>
                        {errors.status !== undefined ? errors.status[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Description */}
                <div className="col-md-6">
                  <label className="w-100 mt-3">
                    <p>Description</p>
                    <textarea
                      className={
                        errors.description !== undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      name={"description"}
                      value={input.description}
                      placeholder={"Enter product description"}
                      onChange={handleInput}
                    />
                    <p className="login-error-msg">
                      <small>
                        {errors.description !== undefined
                          ? errors.description[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Photo */}
                {/* <div className="col-md-6">
                      <label className="w-100 mt-3">
                        <p>Photo</p>
                        <input
                          className={
                            errors.photo !== undefined
                              ? "form-control mt-2 is-invalid"
                              : "form-control mt-2"
                          }
                          type={"file"}
                          name={"photo"}
                          onChange={handlePhoto}
                        />
                        <p className="login-error-msg">
                          <small>
                            {errors.photo !== undefined ? errors.photo[0] : null}
                          </small>
                        </p>
                      </label>
                      {input.photo !== undefined ? (
                        <div className="row">
                          <div className="col-md-3">
                            <div className="photo-preview mt-2">
                              <img
                                src={input.photo}
                                alt={"Img preview"}
                                className="img-thumbnail aspect-one"
                              />
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div> */}
                {/* Button */}
                <div className="col-md-12 mt-3">
                  <div className="text-center">
                    <button
                      className="btn main-btn"
                      onClick={handleProductUpdate}
                      dangerouslySetInnerHTML={{
                        __html: isLoading
                          ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                          : "Product Update & Next",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
