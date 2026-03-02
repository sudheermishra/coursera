import axios from "axios";
import { BASE_URL, SUPABASE_API_KEY } from "../constants";
import { getUser } from "../utils/getUser";
import { isTokenExpired } from "../utils/isTokenExpired";
import { refreshToken } from "../utils/refreshToken";
import { requireAuth } from "../utils/requireAuth";
import { useLoaderData } from "react-router-dom";
import styles from "./Profile.module.css";

export async function profileLoader({ request }) {
  const pathname = new URL(request.url).pathname;
  await requireAuth({ redirectTo: pathname });

  let { access_token, expires_at, user_id } = await getUser();
  const tokenPayload = JSON.parse(atob(access_token.split(".")[1]));
  const email = tokenPayload.email;

  if (isTokenExpired(expires_at)) {
    access_token = await refreshToken();
  }

  // Get subscriptions
  const { data: subscriptions } = await axios.get(
    `${BASE_URL}rest/v1/subscriptions?user_id=eq.${user_id}&select=*`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        apikey: SUPABASE_API_KEY,
      },
    },
  );

  let myCourses = [];
  if (subscriptions.length > 0) {
    const coursesNumbers = subscriptions
      .map((sub) => `"${sub.course_id}"`)
      .join(",");

    const { data } = await axios.get(
      `${BASE_URL}rest/v1/courses?id=in.%28${coursesNumbers}%29`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          apikey: SUPABASE_API_KEY,
        },
      },
    );
    myCourses = data;
  }

  return { email, myCourses };
}

function Profile() {
  const { email, myCourses } = useLoaderData();

  const avatarLetter = email ? email.charAt(0).toUpperCase() : "?";

  return (
    <div className={styles.profilePage}>
      {/* Top Card */}
      <div className={styles.profileCard}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>{avatarLetter}</div>
          <div className={styles.avatarRing}></div>
        </div>

        <div className={styles.profileInfo}>
          <h1 className={styles.profileEmail}>{email || "No email found"}</h1>
          <div className={styles.statsBadges}>
            <span className={styles.badge}>
              🎓 {myCourses.length} Course{myCourses.length !== 1 ? "s" : ""}{" "}
              Enrolled
            </span>
            <span className={`${styles.badge} ${styles.badgePurple}`}>
              ✅ Active
            </span>
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>My Courses</h2>

        {myCourses.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📚</span>
            <p>You haven't enrolled in any courses yet.</p>
          </div>
        ) : (
          <div className={styles.courseGrid}>
            {myCourses.map((course) => (
              <div key={course.id} className={styles.courseCard}>
                <div className={styles.courseCardInner}>
                  <span className={styles.courseEmoji}>⚛️</span>
                  <div>
                    <h3 className={styles.courseName}>{course.name}</h3>
                    <p className={styles.courseDesc}>
                      {course.description || ""}
                    </p>
                  </div>
                </div>
                <span className={styles.enrolledTag}>Enrolled</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Details */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Account Details</h2>
        <div className={styles.detailsCard}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Email</span>
            <span className={styles.detailValue}>{email}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Provider</span>
            <span className={styles.detailValue}>Email / Password</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Courses</span>
            <span className={styles.detailValue}>
              {myCourses.length} enrolled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
