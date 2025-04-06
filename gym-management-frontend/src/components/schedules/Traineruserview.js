import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../../img/back.jpg";
import img6 from "../../img/logo.png";
import Navbar from "../UserNavbar";
import defaultTrainerImage from "../../img/gold-removebg-preview.png";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TrainerView = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();
  const doc = new jsPDF();

  const [trainers, setTrainers] = useState([]);
  const [trainers1, setTrainers1] = useState([]);
  const [trainers2, setTrainers2] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [instructorSearch, setInstructorSearch] = useState("");

  const fetchUserTrainers = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/schedules/user/${user._id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trainers");
      }
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      console.error("Error fetching trainers:", error.message);
      toast.error("Failed to fetch trainers");
    }
  };

  const downloadPDF = () => {
    // Initialize jsPDF instance
    const doc = new jsPDF();

    // Add logo image
    const imgWidth = 50; // Adjust the width of the logo image as needed
    const imgHeight = 20; // Adjust the height of the logo image as needed
    const center = (doc.internal.pageSize.getWidth() - imgWidth) / 2;

    // Ensure img6 is loaded
    const logoImg = new Image();
    logoImg.onload = () => {
      doc.addImage(logoImg, "PNG", center, 10, imgWidth, imgHeight);

      // Add title to the PDF document
      doc.text("Schedule Details", 10, 40); // Adjust the vertical position as needed

      // Extract table data from the state
      const tableRows = trainers2.map((trainer) => [
        trainer._id,
        trainer.userData._id,
        trainer.className,
        trainer.instructor,
        trainer.time,
        trainer.userData.username,
        formatDate(trainer.date),
      ]);

      // Define columns for the table
      const columns = [
        "Schedule ID",
        "User ID",
        "Class Name",
        "Instructor Name",
        "Time",
        "User Name",
        "Date",
      ];

      // Add table to the PDF document
      doc.autoTable({
        head: [columns],
        body: tableRows,
        startY: 60, // Adjust the vertical position as needed
      });

      // Save the PDF document
      doc.save("Schedule_details.pdf");
    };

    // Handle errors during image loading
    logoImg.onerror = (error) => {
      console.error("Error loading logo image:", error);
    };

    // Set the source of the logo image
    logoImg.src = img6; // Replace img6 with the actual image source
  };

  const fetchScheduleTrainers = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/schedules/schedules/${user.username}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trainers");
      }
      const data = await response.json();

      const trainersWithUserData = await Promise.all(
        data.map(async (trainer) => {
          try {
            const userResponse = await fetch(
              `http://localhost:5000/api/auth/${trainer.userId}`
            );
            if (!userResponse.ok) {
              throw new Error("Failed to fetch user");
            }
            const userData = await userResponse.json();
            return { ...trainer, userData };
          } catch (error) {
            console.error(
              "Error fetching user data for trainer:",
              error.message
            );
            return { ...trainer, userData: null };
          }
        })
      );

      setTrainers1(trainersWithUserData);
    } catch (error) {
      console.error("Error fetching trainers:", error.message);
      toast.error("Failed to fetch trainers");
    }
  };

  const fetchAllTrainers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/schedules/`);
      if (!response.ok) {
        throw new Error("Failed to fetch trainers");
      }
      const data = await response.json();

      const trainersWithUserData = await Promise.all(
        data.map(async (trainer) => {
          try {
            const userResponse = await fetch(
              `http://localhost:5000/api/auth/${trainer.userId}`
            );
            if (!userResponse.ok) {
              throw new Error("Failed to fetch user");
            }
            const userData = await userResponse.json();
            return { ...trainer, userData };
          } catch (error) {
            console.error(
              "Error fetching user data for trainer:",
              error.message
            );
            return { ...trainer, userData: null };
          }
        })
      );

      setTrainers2(trainersWithUserData);
      setFilteredTrainers(trainersWithUserData);
    } catch (error) {
      console.error("Error fetching trainers:", error.message);
      toast.error("Failed to fetch trainers");
    }
  };

  useEffect(() => {
    fetchUserTrainers();
    fetchScheduleTrainers();
    fetchAllTrainers();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = trainers2.filter((trainer) => {
        const trainerDate = new Date(trainer.date);
        return (
          trainerDate >= new Date(startDate) && trainerDate <= new Date(endDate)
        );
      });
      setFilteredTrainers(filtered);
    } else {
      setFilteredTrainers(trainers2);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const filtered = trainers2.filter((trainer) =>
      trainer.instructor.toLowerCase().includes(instructorSearch.toLowerCase())
    );
    setFilteredTrainers(filtered);
  }, [instructorSearch]);

  const renderBackButton = () => {
    if (user.role === "trainer") {
      return (
        <div>
          <div
            className="container mt-3 "
            style={{ width: "900px", padding: "15px" }}
          >
            <div className="row d-flex justify-content-center">
              {trainers1.map((trainer) => (
                <div key={trainer._id} className="col-sm-3">
                  <div className="card mb-3 box3 border-dark">
                    <img
                      src={trainer.img || defaultTrainerImage}
                      className="card-img mx-auto d-block"
                      alt={trainer.instructor}
                      style={{ width: "50%", height: "150px" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title text-center text-warning">
                        {trainer.username}
                      </h5>
                      <p className="card-text text-center text-warning">
                        Class Name: {trainer.className}
                      </p>
                      <p className="card-text text-center text-warning">
                        User Name: {trainer.userData.username}
                      </p>
                      <p className="card-text text-center text-warning">
                        Time: {trainer.time}
                      </p>
                      <p className="card-text text-center text-warning">
                        Location: {trainer.location}
                      </p>
                      <p className="card-text text-center text-warning">
                        Date: {formatDate(trainer.date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (user.role === "admin") {
      return (
        <div>
          <center>
            <div className="input-group mb-3 w-25">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Instructor"
                value={instructorSearch}
                onChange={(e) => setInstructorSearch(e.target.value)}
              />
            </div>
            <br></br>

            <div className="input-group mb-3 mt-3 w-50">
              <div className="input-group-prepend">
                <span
                  className="input-group-text text-warning"
                  id="startDateLabel"
                >
                  Start Date:
                </span>
              </div>
              <input
                type="date"
                className="form-control"
                aria-label="Start Date"
                aria-describedby="startDateLabel"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text text-warning"
                  id="endDateLabel"
                >
                  End Date:
                </span>
              </div>
              <input
                type="date"
                className="form-control"
                aria-label="End Date"
                aria-describedby="endDateLabel"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </center>
          <div
            className="container mt-3 "
            style={{ width: "900px", padding: "15px" }}
          >
            <div className="row d-flex justify-content-center">
              {filteredTrainers.map((trainer) => (
                <div key={trainer._id} className="col-sm-3">
                  <div className="card mb-3 box3 border-dark">
                    <img
                      src={trainer.img || defaultTrainerImage}
                      className="card-img mx-auto d-block"
                      alt={trainer.instructor}
                      style={{ width: "50%", height: "150px" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title text-center text-warning">
                        {trainer.username}
                      </h5>
                      <p className="card-text text-center text-warning">
                        Class Name: {trainer.className}
                      </p>
                      <p className="card-text text-center text-warning">
                        Trainer Name: {trainer.instructor}
                      </p>
                      <p className="card-text text-center text-warning">
                        User Name: {trainer.userData.username}
                      </p>
                      <p className="card-text text-center text-warning">
                        Time: {trainer.time}
                      </p>
                      <p className="card-text text-center text-warning">
                        Date:{" "}
                        {new Date(trainer.date).toLocaleDateString("en-US")}
                      </p>
                      <p className="card-text text-center text-warning">
                        Location: {trainer.location}
                      </p>
                      <button
                        className="btn btn-danger ms-2"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => deleteClass(trainer._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div class="d-grid gap-2 col-2 mx-auto">
              <button className="btn btn-primary" onClick={downloadPDF}>
                Download
              </button>
              <button
                className="btn btn-warning ms-2"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={() => navigate("/admin-home", { state: { user } })}
              >
                BACK
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div
            className="container mt-3 "
            style={{ width: "900px", padding: "15px" }}
          >
            <div className="row d-flex justify-content-center">
              {trainers.map((trainer) => (
                <div key={trainer._id} className="col-sm-3">
                  <div className="card mb-3 box3 border-dark">
                    <img
                      src={trainer.img || defaultTrainerImage}
                      className="card-img mx-auto d-block"
                      alt={trainer.instructor}
                      style={{ width: "50%", height: "150px" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title text-center text-warning">
                        {trainer.username}
                      </h5>
                      <p className="card-text text-center text-warning">
                        Class Name: {trainer.className}
                      </p>
                      <p className="card-text text-center text-warning">
                        Instructor: {trainer.instructor}
                      </p>
                      <p className="card-text text-center text-warning">
                        Time: {trainer.time}
                      </p>
                      <p className="card-text text-center text-warning">
                        Location: {trainer.location}
                      </p>
                      <p className="card-text text-center text-warning">
                        Date: {formatDate(trainer.date)}
                      </p>
                      <button
                        className="btn btn-warning ms-2"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() =>
                          navigate("/edit", { state: { user, trainer } })
                        }
                      >
                        UPDATE
                      </button>
                      <br />
                      <br />
                      <button
                        className="btn btn-danger ms-2"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => deleteClass(trainer._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-body text-center">
            <button
              className="btn btn-warning"
              style={{ marginRight: "262px" }}
              onClick={() => navigate("/add-classes", { state: { user } })}
            >
              ADD SCHEDULE
            </button>
            <button
              className="btn btn-warning"
              onClick={() => navigate("/home", { state: { user } })}
            >
              BACK
            </button>
          </div>
        </div>
      );
    }
  };

  const deleteClass = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/schedules/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete class");
      }
      fetchUserTrainers();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting class:", error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div>
      <Navbar />
      <img
        src={img}
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
      <h1 className="mt-5 text-center text-warning">SCHEDULES</h1>
      {renderBackButton()}
      <ToastContainer />
    </div>
  );
};

export default TrainerView;
