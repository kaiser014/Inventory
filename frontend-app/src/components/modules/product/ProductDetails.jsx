import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import GlobalFunction from "../../../GlobalFunction";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProduct = () => {
    setIsLoading(true);
    axios.get(`product/${params.id}`).then((res) => {
      setProduct(res.data.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <BreadCrumb title="Product Details" />
      <div className="row">
        <div className="col-md-12">
          <div className="card page-card">
            <CardHeader
              title="Product Details"
              link="/product"
              icon="fa-list"
              btn_name="Product List"
            />
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-header">
                      <h5>Basic Information</h5>
                    </div>
                    <div className="card-body">
                      <table className="category-table table-sm product-table table table-hover table-striped table-bordered">
                        <tbody>
                          <tr>
                            <th>Title</th>
                            <td>{product?.name}</td>
                          </tr>
                          <tr>
                            <th>Slug</th>
                            <td>{product?.slug}</td>
                          </tr>
                          <tr>
                            <th>Status</th>
                            <td>{product?.status}</td>
                          </tr>
                          <tr>
                            <th>SKU</th>
                            <td>{product?.sku}</td>
                          </tr>
                          <tr>
                            <th>Category</th>
                            <td>
                              {GlobalFunction.isAdmin() ? (
                                <Link to={"/category"}>
                                  {product?.category}
                                </Link>
                              ) : (
                                product?.category
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Sub Category</th>
                            <td>
                              {GlobalFunction.isAdmin() ? (
                                <Link to={"/sub_category"}>
                                  {product?.sub_category}
                                </Link>
                              ) : (
                                product?.sub_category
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Brand</th>
                            <td>
                              {GlobalFunction.isAdmin() ? (
                                <Link to={"/brand"}>{product?.brand}</Link>
                              ) : (
                                product?.brand
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Supplier</th>
                            <td>
                              {GlobalFunction.isAdmin() ? (
                                <Link to={"/supplier"}>
                                  {product?.supplier}
                                </Link>
                              ) : (
                                product?.supplier
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Created By</th>
                            <td>{product?.created_by}</td>
                          </tr>
                          <tr>
                            <th>Created At</th>
                            <td>{product?.created_at}</td>
                          </tr>
                          <tr>
                            <th>Updated At</th>
                            <td>{product?.updated_at}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-3">
                    <div className="card-header">
                      <h5>Price & Stock</h5>
                    </div>
                    <div className="card-body">
                      <table className="category-table table-sm product-table table table-hover table-striped table-bordered">
                        <tbody>
                          <tr>
                            <th>Cost</th>
                            <td>{product?.cost}</td>
                          </tr>
                          <tr>
                            <th>Original Sale Price</th>
                            <td>{product?.price}</td>
                          </tr>
                          <tr>
                            <th>Sale Price</th>
                            <td>
                              {GlobalFunction.formatPrice(
                                product?.selling_price?.price
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Discount Amount</th>
                            <td>
                              {GlobalFunction.formatPrice(
                                product?.selling_price?.discount
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>Discount Percent</th>
                            <td>{product?.discount_percent}</td>
                          </tr>
                          <tr>
                            <th>Discount Fixed Amount</th>
                            <td>{product?.discount_fixed}</td>
                          </tr>
                          <tr>
                            <th>Discount Start Date</th>
                            <td>{product?.discount_start}</td>
                          </tr>
                          <tr>
                            <th>Discount End Date</th>
                            <td>{product?.discount_end}</td>
                          </tr>
                          <tr>
                            <th>Discount Remaining Date</th>
                            <td>{product?.discount_remaining_days} days</td>
                          </tr>
                          <tr>
                            <th>Stock</th>
                            <td>{product?.stock}</td>
                          </tr>
                          <tr>
                            <th>Profit</th>
                            <td>
                              {GlobalFunction.formatPrice(product?.profit)}
                            </td>
                          </tr>
                          <tr>
                            <th>Profit Percentage</th>
                            <td>{product?.profit_percentage}%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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

export default ProductDetails;
