import profilePhoto from "../../images/profile.jpg";
import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__image-placeholder">
        <img
          src={profilePhoto}
          alt="Photo of the author"
          className="about__image"
        />
      </div>
      <div className="about__content">
        <h2 className="about__heading">About the author</h2>
        <p className="about__text">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>
        <p className="about__text">
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
}

export default About;
