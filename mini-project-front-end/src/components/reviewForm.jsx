import axios from "axios";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState(""); // Updated to accept values from 1 to 5
  const [isRegistrationDone, setIsRegistrationDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleRegister = (e) => {
    e.preventDefault();

    const data = {
      review: review,
      ratings: ratings,
    };

    setIsLoading(true);
    axiosInstance
      .post(`/book/${bookId}/reviews/create`, data)
      .then((resp) => {
        console.log("The Response", resp);
        setIsRegistrationDone(true);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error ", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Add review</h1>
      {isRegistrationDone && (
        <h2 style={{ color: "green" }}>Successfully Added Review</h2>
      )}
      {isLoading && <h1>Loading.....</h1>}
      <form onSubmit={handleRegister}>
        <div>
          <h4>Review</h4>
          <input
            value={review}
            placeholder="Write your opinion"
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </div>

        <div>
          <h4>Rating</h4>
          <input
            type="number" // Use type="number" to accept numeric values
            value={ratings}
            placeholder="Give your rating (1-5)"
            min="1" // Set the minimum value
            max="5" // Set the maximum value
            onChange={(e) => {
              setRatings(e.target.value);
            }}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
