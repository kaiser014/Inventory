import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import BreadCrumb from "../BreadCrumb";
import CardHeader from "../miniComponent/CardHeader";
import axios from "axios";
import { useParams } from "react-router-dom";
import InvoicePage from "../InvoicePage";

const InvoicePaper = () => {
  const params = useParams();
  const [order, setOrder] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [paperSize, setPaperSize] = useState({
    a4: {
      width: 595,
      height: 842,
    },
  });

  const getOrderDetails = () => {
    setIsLoading(true);
    axios.get(`order/${params.id}`).then((res) => {
      setOrder(res.data.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <>
      <BreadCrumb title="Generate & Print Bar Code" />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader
              title="Print Invoice"
              link="#"
              btn_name="Bar Code List"
              icon="fa-list"
              hide={true}
            />
            <div className="card-body">
              <div
              // style={{
              //   display: Object.keys(order).length > 0 ? "block" : "none",
              // }}
              >
                <div className="text-center mt-3">
                  <button
                    onClick={() => reactToPrintFn()}
                    className="btn print-btn"
                  >
                    Print This Out!
                  </button>
                </div>
                <div className="bar-code-area-wrapper">
                  <InvoicePage
                    orders={order}
                    paperSize={paperSize}
                    ref={contentRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePaper;
