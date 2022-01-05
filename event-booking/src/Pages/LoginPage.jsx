import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import "../Components/Styling/LoginPag.css";

import { useHistory } from "react-router-dom";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Login({ action, handleCloseLogin }) {
  const [email_id, setEmail] = React.useState("");
  const [pass, setPassword] = React.useState("");
  const [number, setNumber] = React.useState("");
  let history = useHistory();

  const redirect_admin = () => {
    history.push("/admin");
  };
  const redirect_user = () => {
    history.push("/user");
  };
  return (
    <div>
      <Dialog
        onClose={handleCloseLogin}
        aria-labelledby="customized-dialog-title"
        open={action}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        <DialogContent
          dividers
          style={{
            textAlign: "center",
            color: "white",
            backgroundColor: "#383838",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "25px",
                width: "400px",
                margin: "auto",
                marginBottom: "50px",
              }}
            >
              <u>Login Here</u>
            </div>

            {/* <div className="google">
            <Button color="secondary" onClick={redirect_admin}>Admin</Button>
          </div>
          <div className="google">
            <Button color="primary" onClick={redirect_user}>User</Button>
          </div> */}
          </div>
          <>
            <form>
              <center>
                {/* <div className="rowA">
                <div className="middle_Container">User</div>
                <div className="middle_Container_right">Organizer</div>
              </div> */}
                <div className="rowA">
                  <div className="middle_Container">
                    <input
                      id="tab-1"
                      type="radio"
                      name="tab"
                      class="sign-in"
                      value="User"
                    />
                    <label for="tab-1" class="tab">
                      User
                    </label>
                  </div>
                  <div className="middle_Container_right">
                    <input
                      id="tab-2"
                      type="radio"
                      name="tab"
                      class="sign-up"
                      value="Organizer"
                    />
                    <label for="tab-2" class="tab">
                      Organizer
                    </label>
                  </div>
                </div>
              </center>
              <div className="inputs">
                <div>
                  <svg
                    width="18"
                    height="12"
                    version="1.1"
                    viewBox="0 0 18 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <rect width="18" height="12" fill="#f93"></rect>
                      <path d="m0 4h18v4h-18z" fill="#fff"></path>
                      <path d="m0 8h18v4h-18z" fill="#128706"></path>
                      <path
                        d="m10.602 6c0 0.88281-0.71875 1.6016-1.6016 1.6016s-1.6016-0.71875-1.6016-1.6016 0.71875-1.6016 1.6016-1.6016 1.6016 0.71875 1.6016 1.6016z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m10.398 6c0 0.77344-0.625 1.3984-1.3984 1.3984s-1.3984-0.625-1.3984-1.3984 0.625-1.3984 1.3984-1.3984 1.3984 0.625 1.3984 1.3984z"
                        fill="#fff"
                      ></path>
                      <path
                        d="m9.2812 6c0 0.15625-0.125 0.28125-0.28125 0.28125s-0.28125-0.125-0.28125-0.28125 0.125-0.28125 0.28125-0.28125 0.28125 0.125 0.28125 0.28125z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m10.457 6.1914c-0.003906 0.039063-0.039062 0.066406-0.078125 0.0625-0.039062-0.007812-0.066406-0.042968-0.058594-0.082031 0.003907-0.035156 0.039063-0.0625 0.078126-0.058594 0.035156 0.003907 0.0625 0.039063 0.058593 0.078125z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m9 7.3984 0.046875-0.83984-0.046875-0.39844-0.046875 0.39844z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m10.359 6.5625c-0.015625 0.035156-0.058594 0.050781-0.09375 0.039062-0.035156-0.015624-0.050781-0.058593-0.035156-0.09375 0.011719-0.035156 0.054687-0.050781 0.089843-0.035156 0.035157 0.011719 0.050782 0.054688 0.039063 0.089844z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m8.6367 7.3516 0.26562-0.79687 0.054687-0.39844-0.14844 0.37109z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m10.168 6.8945c-0.023438 0.03125-0.070313 0.035157-0.10156 0.011719-0.027344-0.023438-0.035156-0.066406-0.011718-0.097656 0.023437-0.03125 0.066406-0.035156 0.097656-0.011719s0.039062 0.066406 0.015625 0.097656z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m8.3008 7.2109 0.46094-0.70313 0.16016-0.37109s-0.24219 0.32422-0.24219 0.32422z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m9.8945 7.168c-0.03125 0.023437-0.074219 0.015625-0.097656-0.015625s-0.019531-0.074219 0.011719-0.097656c0.03125-0.023438 0.074218-0.015626 0.097656 0.011718 0.023438 0.03125 0.019531 0.078125-0.011719 0.10156z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m8.0117 6.9883 0.625-0.55859 0.25-0.31641-0.31641 0.25z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m9.5625 7.3594c-0.035156 0.011719-0.078125-0.003906-0.089844-0.039063-0.015625-0.035156 0-0.078124 0.035156-0.089843 0.035157-0.015625 0.078126 0 0.09375 0.035156 0.011719 0.035156-0.003906 0.078125-0.039062 0.09375z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m7.7891 6.6992 0.75-0.37891 0.32422-0.24219-0.37109 0.16016z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m9.1914 7.457c-0.039062 0.003907-0.074218-0.023437-0.078125-0.058593-0.003906-0.039063 0.023438-0.074219 0.058594-0.078126 0.039063-0.007812 0.074219 0.019532 0.082031 0.058594 0.003906 0.039063-0.023437 0.074219-0.0625 0.078125z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m7.6484 6.3633 0.82422-0.17188 0.37109-0.14844s-0.39844 0.054687-0.39844 0.054687z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m8.8086 7.457c-0.039063-0.003906-0.066406-0.039062-0.0625-0.078125 0.007812-0.039062 0.042968-0.066406 0.082031-0.058594 0.035156 0.003907 0.0625 0.039063 0.058594 0.078126-0.003907 0.035156-0.039063 0.0625-0.078125 0.058593z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m7.6016 6 0.83984 0.046875s0.39844-0.046875 0.39844-0.046875-0.39844-0.046875-0.39844-0.046875z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m8.4375 7.3594c-0.035156-0.015625-0.050781-0.058594-0.039062-0.09375 0.015624-0.035156 0.058593-0.050781 0.09375-0.035156 0.035156 0.011719 0.050781 0.054687 0.035156 0.089843-0.011719 0.035157-0.054688 0.050782-0.089844 0.039063z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m7.6484 5.6367 0.79687 0.26562s0.39844 0.054687 0.39844 0.054687l-0.37109-0.14844z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m8.1055 7.168c-0.03125-0.023438-0.035157-0.070313-0.011719-0.10156 0.023438-0.027344 0.066406-0.035156 0.097656-0.011718 0.03125 0.023437 0.035156 0.066406 0.011719 0.097656s-0.066406 0.039062-0.097656 0.015625z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m7.7891 5.3008 0.70313 0.46094 0.37109 0.16016-0.32422-0.24219z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m7.832 6.8945c-0.023437-0.03125-0.015625-0.074219 0.015625-0.097656s0.074219-0.019531 0.097656 0.011719c0.023438 0.03125 0.015626 0.074218-0.011718 0.097656-0.03125 0.023438-0.078125 0.019531-0.10156-0.011719z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m8.0117 5.0117 0.55859 0.625 0.31641 0.25-0.25-0.31641z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m7.6406 6.5625c-0.011719-0.035156 0.003906-0.078125 0.039063-0.089844 0.035156-0.015625 0.078124 0 0.089843 0.035156 0.015625 0.035157 0 0.078126-0.035156 0.09375-0.035156 0.011719-0.078125-0.003906-0.09375-0.039062z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m8.3008 4.7891 0.37891 0.75s0.24219 0.32422 0.24219 0.32422l-0.16016-0.37109z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m7.543 6.1914c-0.003907-0.039062 0.023437-0.074218 0.058593-0.078125 0.039063-0.003906 0.074219 0.023438 0.078126 0.058594 0.007812 0.039063-0.019532 0.074219-0.058594 0.082031-0.039063 0.003906-0.074219-0.023437-0.078125-0.0625z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m8.6367 4.6484 0.17188 0.82422 0.14844 0.37109-0.054687-0.39844z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m7.543 5.8086c0.003906-0.039063 0.039062-0.066406 0.078125-0.0625 0.039062 0.007812 0.066406 0.042968 0.058594 0.082031-0.003907 0.035156-0.039063 0.0625-0.078126 0.058594-0.035156-0.003907-0.0625-0.039063-0.058593-0.078125z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m9 4.6016-0.046875 0.83984 0.046875 0.39844 0.046875-0.39844z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m7.6406 5.4375c0.015625-0.035156 0.058594-0.050781 0.09375-0.039062 0.035156 0.015624 0.050781 0.058593 0.035156 0.09375-0.011719 0.035156-0.054687 0.050781-0.089843 0.035156-0.035157-0.011719-0.050782-0.054688-0.039063-0.089844z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m9.3633 4.6484-0.26562 0.79687-0.054687 0.39844 0.14844-0.37109z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m7.832 5.1055c0.023438-0.03125 0.070313-0.035157 0.10156-0.011719 0.027344 0.023438 0.035156 0.066406 0.011718 0.097656-0.023437 0.03125-0.066406 0.035156-0.097656 0.011719s-0.039062-0.066406-0.015625-0.097656z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m9.6992 4.7891-0.46094 0.70313-0.16016 0.37109s0.24219-0.32422 0.24219-0.32422z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m8.1055 4.832c0.03125-0.023437 0.074219-0.015625 0.097656 0.015625s0.019531 0.074219-0.011719 0.097656c-0.03125 0.023438-0.074218 0.015626-0.097656-0.011718-0.023438-0.03125-0.019531-0.078125 0.011719-0.10156z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m9.9883 5.0117-0.625 0.55859-0.25 0.31641 0.31641-0.25z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m8.4375 4.6406c0.035156-0.011719 0.078125 0.003906 0.089844 0.039063 0.015625 0.035156 0 0.078124-0.035156 0.089843-0.035157 0.015625-0.078126 0-0.09375-0.035156-0.011719-0.035156 0.003906-0.078125 0.039062-0.09375z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m10.211 5.3008-0.75 0.37891-0.32422 0.24219 0.37109-0.16016z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m8.8086 4.543c0.039062-0.003907 0.074218 0.023437 0.078125 0.058593 0.003906 0.039063-0.023438 0.074219-0.058594 0.078126-0.039063 0.007812-0.074219-0.019532-0.082031-0.058594-0.003906-0.039063 0.023437-0.074219 0.0625-0.078125z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m10.352 5.6367-0.82422 0.17188-0.37109 0.14844s0.39844-0.054687 0.39844-0.054687z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m9.1914 4.543c0.039063 0.003906 0.066406 0.039062 0.0625 0.078125-0.007812 0.039062-0.042968 0.066406-0.082031 0.058594-0.035156-0.003907-0.0625-0.039063-0.058594-0.078126 0.003907-0.035156 0.039063-0.0625 0.078125-0.058593z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m10.398 6-0.83984-0.046875s-0.39844 0.046875-0.39844 0.046875 0.39844 0.046875 0.39844 0.046875z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m9.5625 4.6406c0.035156 0.015625 0.050781 0.058594 0.039062 0.09375-0.015624 0.035156-0.058593 0.050781-0.09375 0.035156-0.035156-0.011719-0.050781-0.054687-0.035156-0.089843 0.011719-0.035157 0.054688-0.050782 0.089844-0.039063z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m10.352 6.3633-0.79687-0.26562s-0.39844-0.054687-0.39844-0.054687l0.37109 0.14844z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m9.8945 4.832c0.03125 0.023438 0.035157 0.070313 0.011719 0.10156-0.023438 0.027344-0.066406 0.035156-0.097656 0.011718-0.03125-0.023437-0.035156-0.066406-0.011719-0.097656s0.066406-0.039062 0.097656-0.015625z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m10.211 6.6992-0.70313-0.46094-0.37109-0.16016 0.32422 0.24219z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m10.168 5.1055c0.023437 0.03125 0.015625 0.074219-0.015625 0.097656s-0.074219 0.019531-0.097656-0.011719c-0.023438-0.03125-0.015626-0.074218 0.011718-0.097656 0.03125-0.023438 0.078125-0.019531 0.10156 0.011719z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m9.9883 6.9883-0.55859-0.625-0.31641-0.25 0.25 0.31641z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m10.359 5.4375c0.011719 0.035156-0.003906 0.078125-0.039063 0.089844-0.035156 0.015625-0.078124 0-0.089843-0.035156-0.015625-0.035157 0-0.078126 0.035156-0.09375 0.035156-0.011719 0.078125 0.003906 0.09375 0.039062z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m9.6992 7.2109-0.37891-0.75s-0.24219-0.32422-0.24219-0.32422l0.16016 0.37109z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m10.457 5.8086c0.003907 0.039062-0.023437 0.074218-0.058593 0.078125-0.039063 0.003906-0.074219-0.023438-0.078126-0.058594-0.007812-0.039063 0.019532-0.074219 0.058594-0.082031 0.039063-0.003906 0.074219 0.023437 0.078125 0.0625z"
                        fill="#000087"
                      ></path>
                      <path
                        d="m9.3633 7.3516-0.17188-0.82422-0.14844-0.37109 0.054687 0.39844z"
                        fill="#000087"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div> +91 </div>
                <div>
                  <input
                    type="text"
                    placeholder="Continue with mobile number"
                    onChange={(e) => setNumber(e.target.value)}
                    style={{ background: "#383838" }}
                  />
                </div>
              </div>
              <div>OR</div>
              {/* <div>
              
            <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} />
              <br/>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
            </div> */}
              <div style={{ marginTop: "20px" }}>
                I agree to the{" "}
                <a href="" style={{ color: "#f84464" }}>
                  Terms &amp; Conditions
                </a>{" "}
                &amp;{" "}
                <a href="" style={{ color: "#f84464" }}>
                  Privacy Policy
                </a>
              </div>
            </form>
          </>
          <>
            {/* <div class="login-wrap">
            <div class="login-html">
              <div className="rowA">
                <div className="middle_Container"><input id="tab-1" type="radio" name="tab" class="sign-in" checked/><label for="tab-1" class="tab">User</label></div>
                <div className="middle_Container_right"><input id="tab-2" type="radio" name="tab" class="sign-up"/><label for="tab-2" class="tab">Organizer</label></div>
              </div>
              <input id="tab-1" type="radio" name="tab" class="sign-in" checked/><label for="tab-1" class="tab">User</label>
              <input id="tab-2" type="radio" name="tab" class="sign-up"/><label for="tab-2" class="tab">Organizer</label>
              <div class="login-form">
                <div class="sign-in-htm">
                  <div class="group">
                    <label for="user" class="label">Username</label>
                    <input id="user" type="text" class="input"/>
                  </div>
                  <div class="group">
                    <label for="pass" class="label">Password</label>
                    <input id="pass" type="password" class="input" data-type="password"/>
                  </div>
                  <div class="group">
                    <input id="check" type="checkbox" class="check" checked/>
                    <label for="check"><span class="icon"></span> Keep me Signed in</label>
                  </div>
                  <div class="group">
                    <input type="submit" class="button" value="Sign In"/>
                  </div>
                  <div class="hr"></div>
                  <div class="foot-lnk">
                    <a href="#forgot">Forgot Password?</a>
                  </div>
                </div>
                <div class="sign-up-htm">
                  <div class="group">
                    <label for="user" class="label">Username</label>
                    <input id="user" type="text" class="input"/>
                  </div>
                  <div class="group">
                    <label for="pass" class="label">Password</label>
                    <input id="pass" type="password" class="input" data-type="password"/>
                  </div>
                  <div class="group">
                    <label for="pass" class="label">Repeat Password</label>
                    <input id="pass" type="password" class="input" data-type="password"/>
                  </div>
                  <div class="group">
                    <label for="pass" class="label">Email Address</label>
                    <input id="pass" type="text" class="input"/>
                  </div>
                  <div class="group">
                    <input type="submit" class="button" value="Sign Up"/>
                  </div>
                  <div class="hr"></div>
                  <div class="foot-lnk">
                    <label for="tab-1"><a>Already Member?</a></label>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          </>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#383838" }}>
          <Button
            autoFocus
            onClick={() => handleCloseLogin(email_id, pass, number)}
            style={{ color: "#f84464" }}
          >
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
