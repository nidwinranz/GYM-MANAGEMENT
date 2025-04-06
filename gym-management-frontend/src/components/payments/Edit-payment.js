import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img5 from "../../img/back.jpg";
const EditPaymentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, id } = location.state || {};
  const [editedPaymentData, setEditedPaymentData] = useState({
    name: id.name,
    cardNo: id.cardNo,
    cvv: id.cvv,
    expireDate: id.expireDate,
    expiremonth: id.expiremonth,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPaymentData({ ...editedPaymentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate card number (10-digit number)
    const cardNoIntValue = parseInt(editedPaymentData.cardNo);
    if (isNaN(cardNoIntValue) || editedPaymentData.cardNo.length !== 10) {
      toast.error("Card number must be a 10-digit number");
      return;
    }

    // Validate CVV (3-digit number)
    const cvvIntValue = parseInt(editedPaymentData.cvv);
    if (isNaN(cvvIntValue) || editedPaymentData.cvv.length !== 3) {
      toast.error("CVV must be a 3-digit number");
      return;
    }

    // Validate expiration year
    const expireDateIntValue = parseInt(editedPaymentData.expireDate);
    if (
      isNaN(expireDateIntValue) ||
      expireDateIntValue < 2024 ||
      expireDateIntValue > 2050
    ) {
      toast.error("Expiration year must be a number between 2024 and 2050");
      return;
    }

    // Validate expiration month (1-12)
    const expireMonthIntValue = parseInt(editedPaymentData.expiremonth);
    if (
      isNaN(expireMonthIntValue) ||
      expireMonthIntValue < 1 ||
      expireMonthIntValue > 12
    ) {
      toast.error("Expiration month must be a number between 1 and 12");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/payments/${id._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user, product: null, ...editedPaymentData }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update payment details");
      }

      toast.success("Payment details updated successfully!");
      navigate("/payment-card-view", { state: { user } });
    } catch (error) {
      console.error("Error updating payment details:", error.message);
      toast.error(error.message || "Failed to update payment details");
    }
  };

  return (
    <div>
      <img
        src={img5}
        alt="Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "850px",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <div
        className="container box3 mt-3"
        style={{ width: "500px", padding: "35px" }}
      >
        <h1 className="text-center text-warning">Edit Payment Details</h1>
        <div className="underline bg-warning w-100"></div>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-warning">
              Name on Card
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={editedPaymentData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cardNo" className="form-label text-warning">
              Card Number
            </label>
            <input
              type="text"
              className="form-control"
              id="cardNo"
              name="cardNo"
              value={editedPaymentData.cardNo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cvv" className="form-label text-warning">
              CVV
            </label>
            <input
              type="text"
              className="form-control"
              id="cvv"
              name="cvv"
              value={editedPaymentData.cvv}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expireDate" className="form-label text-warning">
              Expiration Year
            </label>
            <input
              type="text"
              className="form-control"
              id="expireDate"
              name="expireDate"
              value={editedPaymentData.expireDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expiremonth" className="form-label text-warning">
              Expiration Month
            </label>
            <input
              type="text"
              className="form-control"
              id="expiremonth"
              name="expiremonth"
              value={editedPaymentData.expiremonth}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-warning"
            style={{ marginRight: "170px" }}
          >
            Update Payment Details
          </button>
          <button
            className="btn btn-warning "
            onClick={() => navigate("/payment-card-view", { state: { user } })}
          >
            Back
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditPaymentDetails;
