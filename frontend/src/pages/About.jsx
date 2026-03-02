import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <div className={styles.aboutHero}>
        <span className={styles.eyebrow}>About this project</span>
        <h1 className={styles.aboutHeading}>
          Built to Learn.{" "}
          <span className={styles.highlight}>Built to Ship.</span>
        </h1>
        <p className={styles.aboutSubHeading}>
          A hands-on learning platform where you go from zero to building real
          projects with JavaScript and React.
        </p>
      </div>

      {/* What is this platform */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>What is this?</h2>
        <p className={styles.sectionText}>
          This is a full-stack course platform I built while learning React. It
          includes real authentication with Supabase, video lessons streamed
          from Vimeo, and payments powered by Stripe — all in one place. Every
          feature you see here was built as part of the learning process.
        </p>
      </div>

      {/* Features */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>What's inside?</h2>
        <div className={styles.featureGrid}>
          {[
            {
              icon: "🔐",
              title: "Auth with Supabase",
              desc: "Login and signup with secure token-based authentication.",
            },
            {
              icon: "🎬",
              title: "Video Lessons",
              desc: "Courses streamed directly from Vimeo with a clean player.",
            },
            {
              icon: "💳",
              title: "Stripe Payments",
              desc: "Test-mode checkout flow so you can practice real payment integration.",
            },
            {
              icon: "⚛️",
              title: "React & JavaScript",
              desc: "Courses focused on the two most in-demand frontend skills.",
            },
          ].map((feature) => (
            <div key={feature.title} className={styles.featureCard}>
              <span className={styles.featureIcon}>{feature.icon}</span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About the developer */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>About the Developer</h2>
        <p className={styles.sectionText}>
          I built this platform to level up my React skills by working on a real
          project instead of just tutorials. It covers everything — routing,
          authentication, protected pages, API calls, payments, and more. This
          project lives in my portfolio as proof that I can build and ship
          full-stack applications.
        </p>
      </div>

      {/* Tech Stack */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Tech Stack</h2>
        <div className={styles.techStack}>
          {[
            "React",
            "React Router",
            "Supabase",
            "Vimeo API",
            "Stripe",
            "CSS Modules",
          ].map((tech) => (
            <span key={tech} className={styles.techBadge}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
