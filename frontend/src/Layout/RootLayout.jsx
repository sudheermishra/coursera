// import { Form, NavLink, Outlet, useRouteLoaderData } from "react-router-dom";

// function RootLayout() {
//   const user = useRouteLoaderData("parentRoute");
//   return (
//     <>
//       <header>
//         <nav>
//           <h1 className="logo">
//             <NavLink to="/">Coursera</NavLink>
//           </h1>
//           <ul>
//             <li>
//               <NavLink to="about">About</NavLink>
//             </li>
//             {user && (
//               <li>
//                 <NavLink to="profile">Profile</NavLink>
//               </li>
//             )}
//             {user && (
//               <li>
//                 <NavLink to="mycourses">My Courses</NavLink>
//               </li>
//             )}
//             {!user && (
//               <li>
//                 <NavLink to="login">Login</NavLink>
//               </li>
//             )}
//             {!user && (
//               <li>
//                 <NavLink to="signup">Signup</NavLink>
//               </li>
//             )}
//           </ul>
//           {user && (
//             <Form action="/logout" method="post">
//               <button>Logout</button>
//             </Form>
//           )}
//         </nav>
//       </header>
//       <main>
//         <Outlet />
//       </main>
//     </>
//   );
// }

// export default RootLayout;

import { NavLink, Outlet, Form, useRouteLoaderData } from "react-router-dom";
import styles from "./RootLayout.module.css";
import logoutSvg from "../assets/logout.svg";
function RootLayout() {
  const user = useRouteLoaderData("parentRoute");
  return (
    <>
      <header>
        <nav className={`${styles.nav} container`}>
          <h1 className={styles.logo}>
            <NavLink to="/">
              <span className={styles.cod}>Cours</span>
              <span className={styles.prog}>era</span>{" "}
            </NavLink>
          </h1>
          <ul className={styles.navItems}>
            <li>
              <NavLink to="about"> About</NavLink>
            </li>
            {/* {user && (
              <li>
                <NavLink to="profile"> Profile</NavLink>
              </li>
            )} */}

            {user && (
              <li>
                <NavLink to="mycourses"> My Courses</NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink to="profile">Profile</NavLink>
              </li>
            )}
            {!user && (
              <li>
                <NavLink to="login"> Login</NavLink>
              </li>
            )}
            {!user && (
              <li>
                <NavLink to="signup"> Signup</NavLink>
              </li>
            )}
          </ul>
          {user && (
            <Form action="/logout" method="post">
              <button className={styles.logoutButton}>
                Logout{" "}
                <img
                  src={logoutSvg}
                  alt="Logout SVG"
                  className={styles.logoutSvg}
                />
              </button>
            </Form>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default RootLayout;
