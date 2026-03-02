// import axios from "axios";
// import { BASE_URL, SUPABASE_API_KEY } from "../constants";
// import { getUser } from "../utils/getUser";
// import { requireAuth } from "../utils/requireAuth";
// import { useLoaderData } from "react-router-dom";
// import ReactPlayer from "react-player";

// export async function myCourseVideosLoader({ request, params }) {
//   const pathname = new URL(request.url).pathname;
//   await requireAuth({ redirectTo: pathname });
//   const { courseID } = params;
//   const { access_token } = await getUser();

//   const { data } = await axios.get(
//     `${BASE_URL}rest/v1/modules?course_id=eq.${courseID}&select=*`,
//     {
//       headers: { apikey: SUPABASE_API_KEY },
//     },
//   );
//   const modules = data.sort((a, b) => a.number - b.number);
//   const promiseArray = modules.map((module) => {
//     return axios.get(
//       `${BASE_URL}rest/v1/videos?module_id=eq.${module.id}&select=*`,
//       {
//         headers: {
//           apikey: SUPABASE_API_KEY,
//           Authorization: `Bearer ${access_token}`,
//         },
//       },
//     );
//   });
//   const videos = await Promise.all(promiseArray);
//   console.log("videos", videos);
//   const videosData = videos.map((video) => video.data);

//   const flatVideoData = [].concat(...videosData);
//   return flatVideoData;
// }
// function MyCourseVideos() {
//   const videos = useLoaderData();

//   console.log("videos inside component", videos);
//   return (
//     <div>
//       <h1>Videos Below</h1>
//       {videos.map((video) => {
//         return video?.vimeo_url ? (
//           <div key={video.id}>
//             <ReactPlayer url={video.vimeo_url} controls />
//             <h3>{video.name}</h3>
//             <hr />
//           </div>
//         ) : null;
//       })}
//     </div>
//   );
// }

// export default MyCourseVideos;

import { BASE_URL, SUPABASE_API_KEY } from "../constants";
import axios from "axios";
import { getUser } from "../utils/getUser";
import { useLoaderData } from "react-router-dom";
import styles from "./MyCourseVideos.module.css";
import ReactPlayer from "react-player";
import { useState } from "react";

export async function myCourseVideosLoader({ params }) {
  console.log(params);
  const { courseID } = params;
  const { access_token } = await getUser();

  const { data } = await axios.get(
    `${BASE_URL}rest/v1/modules?course_id=eq.${courseID}&select=*`,
    {
      headers: { apikey: SUPABASE_API_KEY },
    },
  );
  const modules = data.sort((a, b) => a.number - b.number);
  // [{name: ""}, {name: ""}]
  console.log("modules", modules);
  const videos = await Promise.all(
    modules.map((module) => {
      return axios.get(
        `${BASE_URL}rest/v1/videos?module_id=eq.${module.id}&select=*`,
        {
          headers: {
            apikey: SUPABASE_API_KEY,
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
    }),
  );

  // need data something like this

  console.log("videos", videos);
  const moduleVideos = videos.map((item) =>
    item.data.sort((a, b) => a.number - b.number),
  );

  // const dummy = [{module_number: 1, videos : []}, {module_number: 2, videos: []}]

  const videosData = moduleVideos.map((videos, index) => {
    return { module_name: modules[index].name, videos };
  });
  console.log("videosData", videosData);
  // const videosArray = [].concat(...videosData);
  // console.log("videosArray", videosArray);
  return videosData;
}
function MyCourseVideos() {
  const videosData = useLoaderData();
  if (videosData.length === 0) {
    return <h1>No videos found</h1>;
  }
  let firstVideo;
  for (let module of videosData) {
    if (module.videos.length > 0) {
      firstVideo = module.videos[0].vimeo_url;
    }
  }
  console.log("firstVideo", firstVideo);
  if (!firstVideo) {
    return <h1>No videos found</h1>;
  }
  const [videoUrl, setVideoUrl] = useState(firstVideo);
  return (
    <div className={`${styles.myCourseSection}`}>
      <div className={styles.playlist}>
        {videosData.map((module) => {
          return (
            <div>
              <h3>{module.module_name}</h3>
              <ul>
                {module.videos.map((video, index) => (
                  <li
                    key={video.vimeo_url}
                    onClick={() => setVideoUrl(video.vimeo_url)}>
                    {index + 1}. {video.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className={styles.videoContainer}>
        <ReactPlayer
          url={videoUrl}
          controls
          className={styles.video}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
export default MyCourseVideos;
