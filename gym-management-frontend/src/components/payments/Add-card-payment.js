import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img5 from "../../img/back.jpg";

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  const initialPaymentData = {
    name: "",
    cardNo: "",
    cvv: "",
    expireDate: "",
    expiremonth: "",
  };

  const [paymentData, setPaymentData] = useState(initialPaymentData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate card number (10-digit number)
    const cardNoIntValue = parseInt(paymentData.cardNo);
    if (isNaN(cardNoIntValue) || paymentData.cardNo.length !== 10) {
      toast.error("Card number must be a 10-digit number");
      return;
    }

    // Validate CVV (3-digit number)
    const cvvIntValue = parseInt(paymentData.cvv);
    if (isNaN(cvvIntValue) || paymentData.cvv.length !== 3) {
      toast.error("CVV must be a 3-digit number");
      return;
    }

    // Validate expiration year
    const expireDateIntValue = parseInt(paymentData.expireDate);
    if (
      isNaN(expireDateIntValue) ||
      expireDateIntValue < 2024 ||
      expireDateIntValue > 2050
    ) {
      toast.error("Expiration year must be a number between 2024 and 2050");
      return;
    }

    // Validate expiration month (1-12)
    const expireMonthIntValue = parseInt(paymentData.expiremonth);
    if (
      isNaN(expireMonthIntValue) ||
      expireMonthIntValue < 1 ||
      expireMonthIntValue > 12
    ) {
      toast.error("Expiration month must be a number between 1 and 12");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user,
          product: null,
          ...paymentData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit payment");
      }

      toast.success("Payment card created successfully!");
      navigate("/payment-card-view", { state: { user } });
    } catch (error) {
      console.error("Error submitting payment:", error.message);
      toast.error(error.message || "Failed to submit payment");
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
        className="container box3 mt-3 "
        style={{ width: "500px", padding: "35px" }}
      >
        <h1 className="text-center text-warning">Payment Form</h1>
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
              value={paymentData.name}
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
              value={paymentData.cardNo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cvv" className="form-label text-warning">
              CVV
            </label>
            <input
              type="number"
              className="form-control"
              id="cvv"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expireDate" className="form-label text-warning">
              Expiration Year
            </label>
            <input
              type="number"
              className="form-control"
              id="expireDate"
              name="expireDate"
              value={paymentData.expireDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expiremonth" className="form-label text-warning">
              Expiration Month
            </label>
            <input
              type="number"
              className="form-control"
              id="expiremonth"
              name="expiremonth"
              value={paymentData.expiremonth}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-warning"
            style={{ marginRight: "230px" }}
          >
            create card
          </button>
          <button
            className="btn btn-warning "
            onClick={() =>
              navigate("/payment-card-view", { state: { user, product: null } })
            }
          >
            Back
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default PaymentForm;
