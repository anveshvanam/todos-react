import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";

function Registration() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/login");
  };

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap" }}
      className="flex flex-col min-h-screen  justify-center items-center "
    >
      <h1 className="text-4xl font-bold mb-7">Register</h1>
      <div className="flex flex-col justify-center items-center shadow-sm rounded-md shadow-slate-600 lg:h-[70vh] w-[95%] lg:w-1/2 h-96">
        <FormControl variant="standard">
          <InputLabel htmlFor="standard-adornment-username">
            Username
          </InputLabel>
          <Input
            id="standard-adornment-username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="w-60 lg:w-96 h-10"
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-60 lg:w-96 h-10"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <div className="flex mt-10 justify-between w-60 lg:w-96">
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister}
            className="w-28 lg:w-40 h-10 m-10"
          >
            Register
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className="w-28 lg:w-40 h-10 m-10"
          >
            <Link to="/login" className="">
              Login
            </Link>
          </Button>
        </div>
      </div>
    </Box>
  );
}

export default Registration;
