/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../../partials/BreadCrumb";
import CardHeader from "../../../partials/miniComponent/CardHeader";
import $ from "jquery";

const AddProductPhoto = () => {
  const params = useParams();
  const [photos, setPhotos] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  const handlePhotoUpload = () => {
    setIsLoading(true);
    axios
      .post(
        `/product-photo-upload/${params.id}`,
        { photos },
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progress);
          },
        }
      )
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
      });
  };

  const handlePhotoUploadInput = (e) => {
    let images = e.target.files;
    for (let i = 0; i < images.length; i++) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prevState) => ({
          ...prevState,
          [i]: {
            ...prevState[i],
            photo: reader.result,
            ...prevState[i],
            is_primary: i === 0 ? 1 : 0,
          },
        }));
      };
      reader.readAsDataURL(images[i]);
    }
  };
  const handlePrimaryPhoto = (key) => {
    for (let i = 0; i < Object.keys(photos).length; i++) {
      setPhotos((prevState) => ({
        ...prevState,
        [i]: {
          ...prevState[key],
          is_primary: i === key ? 1 : 0,
        },
      }));
    }
  };
  const handlePhotoInputField = () => {
    $("#photo_input").trigger("click");
  };

  return (
    <>
      <BreadCrumb title={"Add Product Photo"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader
              title="Add Product Photo"
              btn_name="Product List"
              link="/product"
            />
            <div className="card-body">
              <div className="photo-upload-container">
                <div className="icon" onClick={handlePhotoInputField}>
                  <i className="fa-solid fa-camera fa-2x"></i>
                </div>
              </div>
              <input
                id={"photo_input"}
                type="file"
                className="d-none"
                multiple={true}
                accept="image/png, image/jpg, image/jpeg, image/webp"
                onChange={handlePhotoUploadInput}
              />
              <div className="row">
                {Object.keys(photos).map((key) => (
                  <div className="col-md-2 my-3" key={key}>
                    <img
                      onClick={() => handlePrimaryPhoto(key)}
                      src={photos[key].photo}
                      className={
                        photos[key].is_primary === 1
                          ? "primary-photo img-thumbnail preview-photo"
                          : "img-thumbnail preview-photo"
                      }
                      alt="Photo Preview"
                    />
                  </div>
                ))}
                <div className="row align-items-center">
                  <div className="col-md-9">
                    <div
                      className="progress"
                      style={{ display: `${progress < 1 ? "none" : "block"}` }}
                    >
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-theme-basic"
                        style={{ width: `${progress}%` }}
                      >
                        {`${progress}%`}
                      </div>
                    </div>
                  </div>
                  {/* Photo Upload Button */}
                  <div className="col-md-12">
                    <div className="text-end">
                      <button
                        className="btn main-btn"
                        onClick={handlePhotoUpload}
                        dangerouslySetInnerHTML={{
                          __html: isLoading
                            ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                            : "Upload Photo",
                        }}
                      />
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

export default AddProductPhoto;
