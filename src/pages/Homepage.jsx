import "../App.css";
import { Link } from "react-router-dom"; // Import de Link pour la navigation

function Homepage() {
  return (
    <div className="homepage-container">
      <h2 className="homepage-subtitle">
        Like ephemeral butterflies, let's make every moment count through sport.
      </h2>
      <h1 className="homepage-title">
        Welcome to <span className="highlight">The Mates Finder!</span>
      </h1>
      <p className="homepage-description">
        Finding the perfect workout partner has never been easier! 🏋️‍♂️💪 Whether
        you're a <span className="bold">beginner, intermediate, or expert</span>
        , our matchmaking platform helps you connect with like-minded fitness
        enthusiasts based on:
      </p>

      <ul className="features-list">
        <li>
          ✅ Your <span className="bold">location</span> 📍
        </li>
        <li>
          ✅ Your <span className="bold">favorite workout type</span> 🏃‍♀️
        </li>
        <li>
          ✅ Your <span className="bold">available workout times</span> 🕒
        </li>
        <li>
          ✅ Your <span className="bold">experience level</span> 🏆
        </li>
      </ul>

      <p className="homepage-description">
        Search, match, and train together to stay motivated and reach your
        fitness goals faster! 🚀🔥
      </p>

      <p className="homepage-action">
        💡{" "}
        <span className="bold">Ready to find your perfect training mate?</span>
      </p>

      <Link to="/signup" className="homepage-cta">
        Start now and take your workouts to the next level! 🎯
      </Link>
    </div>
  );
}

export default Homepage;
