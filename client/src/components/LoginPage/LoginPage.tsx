import "./loginPageSignInSignUp.css";
import LoginPageSignInSignUpStyle from "./LoginPageSignInSignUpStyle";
import NeurobicaLogo from "../NeurobicaLogo/NeurobicaLogo";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Email from "@mui/icons-material/Email";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Signin from "../Signin/Signin";
import SignupReq from "../SignupReq/SignupReq";
import Badge from "@mui/icons-material/Badge";
import Lock from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import SignupFin from "../SignupFin/SignupFin";
export default function LoginPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isAdvanced, setIsAdvanceed] = useState(false);
  const [isAllowedToSignIn, setSsAllowedToSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordagain] = useState("");
  const [label, setLabel] = useState<string>(
    isSignIn ? "Sign In" : "Continiue"
  );

  const [state, setState] = useState<{
    checkedA: boolean;
    checkedB: boolean;
    checkedF: boolean;
    checkedG: boolean;
  }>({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [state2, setState2] = useState<{
    checkedA: boolean;
    checkedB: boolean;
    checkedF: boolean;
    checkedG: boolean;
  }>({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState2({ ...state, [event.target.name]: event.target.checked });
  };

  const emailValidation =
    email.includes("+") ||
    !(
      email.includes("@") &&
      email.indexOf("@") !== 0 &&
      email.indexOf("@") !== email.length - 1
    );

  console.log(email.indexOf("@"));
  console.log(email.indexOf("@"));

  return (
    <Grid
      container
      spacing={{ xs: 1, md: 1 }}
      columns={{ xs: 4, md: 4 }}
      direction="column"
      justifyContent="center"
      alignItems="center"
      paddingTop="5vh"
    >
      <Grid item xs={4}>
        <NeurobicaLogo c={5} />
      </Grid>
      <Grid item xs={4}>
        <div className="loginPageSignInSignUp">
          <ToggleButtonGroup value={isSignIn}>
            <ToggleButton
              onClick={() => {
                setIsSignIn(true);
                setLabel("Sign In");
              }}
              sx={
                isSignIn
                  ? LoginPageSignInSignUpStyle.selected
                  : LoginPageSignInSignUpStyle.unselected
              }
              value="signin"
            >
              Sign In
            </ToggleButton>
            <ToggleButton
              onClick={() => {
                setIsSignIn(false);
                setLabel("Continue");
              }}
              sx={
                isSignIn
                  ? LoginPageSignInSignUpStyle.unselected
                  : LoginPageSignInSignUpStyle.selected
              }
              value="signup"
            >
              Sign Up
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        {isSignIn ? (
          <Box
            component="form"
            sx={{
              m: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                sx={{
                  m: 0,
                  width: "40vh",
                }}
                error={emailValidation && !!email}
                id="sandard-basic"
                variant="standard"
                type="email"
                label={
                  email.includes("+")
                    ? "Email Address mustn't include '+'"
                    : !(
                        email.includes("@") &&
                        email.indexOf("@") !== 0 &&
                        email.indexOf("@") !== email.length - 1
                      ) && !!email
                    ? "Email Address must include '@'"
                    : "Email Address"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                value={email}
                placeholder="Enter Your Email Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <br />
            <div>
              <TextField
                sx={{
                  m: 0,
                  width: "40vh",
                }}
                error={false}
                id="tandard-basic"
                variant="standard"
                type="password"
                label="Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
                value={password}
                placeholder="Enter Your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </Box>
        ) : isAdvanced ? (
          <Box
            component="form"
            sx={{
              m: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                sx={{
                  m: 0,
                  width: "40vh",
                }}
                error={emailValidation && !!email}
                id="sandard-basic"
                variant="standard"
                type="email"
                label={
                  email.includes("+")
                    ? "Email Address mustn't include '+'"
                    : !(
                        email.includes("@") &&
                        email.indexOf("@") !== 0 &&
                        email.indexOf("@") !== email.length - 1
                      ) && !!email
                    ? "Email Address must include '@'"
                    : "Email Address"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                value={email}
                placeholder="Enter Your Email Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <br />
            <div>
              <TextField
                sx={{
                  m: 0,
                  width: "40vh",
                }}
                error={false}
                type="text"
                variant="standard"
                label="Full Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Badge />
                    </InputAdornment>
                  ),
                }}
                value={fullname}
                placeholder="Enter Your Full Name"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </div>
            <br />
            <TextField
              sx={{
                m: 0,
                width: "40vh",
              }}
              error={false}
              type="password"
              variant="standard"
              label="key"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              value={key}
              placeholder="Enter Your Key (check you email inbox)"
              onChange={(e) => setKey(e.target.value)}
            />{" "}
            <br />
            <TextField
              sx={{
                m: 0,
                width: "40vh",
              }}
              error={false}
              type="password"
              variant="standard"
              label="Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              value={password}
              placeholder="Enter Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <div>
              <TextField
                sx={{
                  m: 0,
                  width: "40vh",
                }}
                error={false}
                type="password"
                variant="standard"
                label="Confirm Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
                value={passwordagain}
                placeholder="Confirm Your Password"
                onChange={(e) => {
                  setPasswordagain(e.target.value);
                }}
              />

              <Grid container>
                <Grid item>
                  {" "}
                  <br />
                  <FormControlLabel
                    label={
                      <div>
                        <span>I accept the </span>
                        <Link to={"/termsvf"}>
                          terms of use and privacy policy
                        </Link>
                      </div>
                    }
                    sx={{
                      color: "GrayText",
                      width: "35vh",
                    }}
                    control={
                      <Checkbox
                        sx={{
                          fontSize: "28",
                        }}
                        checked={state.checkedB}
                        onChange={handleChange}
                        name="checkedB"
                        color="default"
                        size="small"
                      />
                    }
                  />
                </Grid>
              </Grid>
            </div>
          </Box>
        ) : (
          <Box
            component="form"
            sx={{
              m: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                sx={{
                  m: 0,
                  width: "40vh",
                }}
                error={emailValidation && !!email}
                id="sandard-basic"
                variant="standard"
                type="email"
                label={
                  email.includes("+")
                    ? "Email Address mustn't include '+'"
                    : !(
                        email.includes("@") &&
                        email.indexOf("@") !== 0 &&
                        email.indexOf("@") !== email.length - 1
                      ) && !!email
                    ? "Email Address must include '@'"
                    : "Email Address"
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                value={email}
                placeholder="Enter Your Email Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <br />
          </Box>
        )}
      </Grid>
      <Grid item xs={4} sx={{ padding: "0vh" }}>
        <Grid container>
          <Grid item>
            <FormControlLabel
              label="Rememmber Me"
              sx={{
                color: "GrayText",
                width: "25vh",
              }}
              control={
                <Checkbox
                  sx={{
                    fontSize: "28",
                  }}
                  checked={state2.checkedB}
                  onChange={handleChange2}
                  name="checkedB"
                  color="default"
                  size="small"
                />
              }
            />
          </Grid>
          <Grid item alignSelf="center">
            <div className="text">
              <a
                href="src/components/ForgotPassword/ForgotPassword"
                style={{ color: "#FF8B17" }}
              >
                Trouble Logging In?
              </a>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <GoogleReCaptchaProvider reCaptchaKey="6LcrTYUhAAAAALcocJuPUztaWEIAsY_DdAuRxx8b">
          <GoogleReCaptcha
            onVerify={() => {
              setSsAllowedToSignIn(true);
            }}
          />
        </GoogleReCaptchaProvider>
      </Grid>
      <Grid item xs={4}>
        <Button
          disabled={!isAllowedToSignIn || emailValidation}
          color="inherit"
          variant="outlined"
          sx={{
            color: "#FF8B17",
            width: "45vh",
            height: "6vh",
            borderRadius: "30px",
          }}
          onClick={() =>
            isSignIn
              ? setLabel("Signing in...")
              : isAdvanced
              ? setLabel("Signing up...")
              : setLabel("Continueing...")
          }
        >
          {label}
        </Button>

        {label === "Signing in..." && (
          <Signin setLabel={setLabel} email={email} password={password} />
        )}
        {label === "Continueing..." && (
          <SignupReq
            setLabel={setLabel}
            setIsAdvanced={setIsAdvanceed}
            email={email}
          />
        )}
        {label === "Signing up..." && (
          <SignupFin
            setLabel={setLabel}
            email={email}
            secretKey={key}
            fullname={fullname}
            password={password}
            passwordagain={passwordagain}
          />
        )}
        <br />
        {label === "Continiue to Home Page" && (
          <Link to="\">By clicking in this link</Link>
        )}
      </Grid>
    </Grid>
  );
}
