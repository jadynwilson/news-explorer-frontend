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
          Hi, I’m Jadyn, a software engineering student at TripleTen. I build
          web applications with React, JavaScript, HTML, and CSS, and I use
          React Router for navigation, Vite for tooling, and Git and GitHub for
          version control.
        </p>
        <p className="about__text">
          Through the program I’ve learned to turn a design into a working,
          responsive app: connecting to third-party APIs, handling loading and
          error states, and building features like sign-in and saved content.
          I’m excited to keep growing as a developer and to help build products
          people enjoy using.
        </p>
      </div>
    </section>
  );
}

export default About;
