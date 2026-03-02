import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import RootLayout from "./Layout/RootLayout";
import { Home, Signup, Login, MyCourses, About, Profile } from "./pages";
import { loginAction, loginLoader } from "./pages/Login";
import { mycourseLoader } from "./pages/MyCourses";
import { profileLoader } from "./pages/Profile";
import { signupAction, signupLoader } from "./pages/Signup";
import { logoutAction } from "./pages/Logout";
import { getUser } from "./utils/getUser";
import { homeLoader } from "./pages/Home";
import CourseDetail, { courseDetailLoader } from "./pages/CourseDetail";
import Payment, { paymentLoader } from "./pages/Payment";
import Thankyou from "./pages/ThankYou";
import MyCourseVideos, { myCourseVideosLoader } from "./pages/MyCourseVideos";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} loader={getUser} id="parentRoute">
      <Route index element={<Home />} loader={homeLoader}></Route>
      <Route path="about" element={<About />}></Route>
      <Route
        path="profile"
        element={<Profile />}
        loader={profileLoader}></Route>
      <Route
        path="signup"
        element={<Signup />}
        action={signupAction}
        loader={signupLoader}></Route>
      <Route
        path="login"
        element={<Login />}
        action={loginAction}
        loader={loginLoader}></Route>
      <Route path="logout" action={logoutAction}></Route>,
      <Route
        path="mycourses"
        element={<MyCourses />}
        loader={mycourseLoader}></Route>
      <Route
        path="/course-detail/:id"
        element={<CourseDetail />}
        loader={courseDetailLoader}></Route>
      <Route
        path="/payment/:courseID"
        element={<Payment />}
        loader={paymentLoader}></Route>
      <Route
        path="/mycourses/:courseID"
        element={<MyCourseVideos />}
        loader={myCourseVideosLoader}></Route>
      <Route path="thankyou" element={<Thankyou />}></Route>
    </Route>,
  ),
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
