import React, { useEffect, useState } from "react";
import CardHeader from "../../partials/miniComponent/CardHeader";
import BreadCrumb from "../../partials/BreadCrumb";
import GlobalFunction from "../../../GlobalFunction";
import axios from "axios";

const Report = () => {
  const [report, setReport] = useState([]);

  const getReport = () => {
    axios.get(`get-reports`).then((res) => {
      setReport(res.data);
    });
  };
  useEffect(() => {
    getReport();
  }, []);
  return (
    <>
      <BreadCrumb title="Report" />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader title="Report" link="#" btn_name="List" hide={true} />
            <div className="card-body">
              {/* Sales */}
              <div className="card mb-3">
                <div className="card-header">
                  <h5>Sales(Branch)</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i className="fa-solid fa-cart-shopping"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Total Sales</h6>
                              <h5>{report.total_sale}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i className="fa-solid fa-cart-plus"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Total Purchase</h6>
                              <h5>{report.total_purchase}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-hand-holding-dollar"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Today's Sale</h6>
                              <h5>{report.total_sale_today}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-person-walking-arrow-loop-left"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Today's Purchase</h6>
                              <h5>{report.total_purchase_today}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i className="fa-solid fa-rotate-left"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Total Sales Return</h6>
                              <h5>{GlobalFunction.formatPrice(12256)}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i className="fa-solid fa-rotate-right"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Purchase Return</h6>
                              <h5>{GlobalFunction.formatPrice(12256)}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-right-left"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Today's Sales Reutrn</h6>
                              <h5>{GlobalFunction.formatPrice(12256)}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-arrow-right-arrow-left"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Today's Purchase Return</h6>
                              <h5>{GlobalFunction.formatPrice(12256)}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* Stock */}
              <div className="card mb-3">
                <div className="card-header">
                  <h5>Stock</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-box-open"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Total Products</h6>
                              <h5>{report.total_products}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-box"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Total Stock</h6>
                              <h5>{report.total_stock}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-battery-quarter"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Total Low Stock</h6>
                              <h5>{report.low_stock}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-dollar-sign"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>
                                Total Stock Value <span>(Buy)</span>
                              </h6>
                              <h5>{report.buy_stock_price}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-dollar-sign"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>
                                Total Stock Value <span>(Sale WOD)</span>
                              </h6>
                              <h5>{report.sale_stock_price}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-dollar-sign"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>
                                Possible Profit <span>(Sale WOD)</span>
                              </h6>
                              <h5>{report.possible_profit}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Expense */}
              {/* <div className="card mb-3">
                <div className="card-header">
                  <h5>Expense (Branch)</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-circle-dollar-to-slot"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Total Expense</h6>
                              <h5>{GlobalFunction.formatPrice(12256)}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-sack-dollar"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Total Today Expense</h6>
                              <h5>{GlobalFunction.formatPrice(12256)}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* Withdrawal */}
              {/* <div className="card mb-3">
                <div className="card-header">
                  <h5>Withdrawals (Branch)</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-right-from-bracket"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Total Withdrawal's</h6>
                              <h5>{GlobalFunction.formatPrice(12256)}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-money-bill-transfer"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Total Today Withdrawal's</h6>
                              <h5>{GlobalFunction.formatPrice(12256)}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* Profit */}
              <div className="card">
                <div className="card-header">
                  <h5>Profit</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-chart-line"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Total Profits</h6>
                              <h5>{GlobalFunction.formatPrice(12256)}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 col-md-3">
                      <div className="card report-card">
                        <div className="card-body report-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <i class="fa-solid fa-chart-bar"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6>Total Today Profit</h6>
                              <h5>{GlobalFunction.formatPrice(12256)}</h5>
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
        </div>
      </div>
    </>
  );
};

export default Report;
