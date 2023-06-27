import { Avatar } from "@mui/material";
import { blue } from "@mui/material/colors";

const Profile = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-7">Profile</h1>
      {localStorage.getItem("isLoggedIn") === "true" ? (
        <div className="flex flex-col justify-center items-center shadow-sm rounded-md shadow-slate-600 lg:h-[70vh] w-[95%] lg:w-1/2 h-96">
          <Avatar sx={{ bgcolor: blue[500], width: 100, height: 100 }}>
            <span className="text-4xl">
              {localStorage.getItem("username").toUpperCase().slice(0, 1)}
            </span>
          </Avatar>
          <h1 className="text-2xl font-bold my-7">
            username: {localStorage.getItem("username")}
          </h1>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center shadow-sm rounded-md shadow-slate-600 lg:h-[70vh] w-[95%] lg:w-1/2 h-96">
          <h1 className="text-4xl font-bold mb-7">Profile</h1>
          <h1 className="text-2xl font-bold mb-7">Please Login</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;
