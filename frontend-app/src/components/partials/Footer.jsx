import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between">
            <div className="text-muted">
              Copyright &copy; Inventory Management 2024
            </div>
            <div>
              <small>
                <Link to={"#"} className="text-dark">
                  Design & Developed By Kaiser
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
