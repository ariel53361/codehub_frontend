import axiosInstance from "./axiosInstance";
import { Credentials } from "../hooks/useLogin";
import { ActivationPayload, SetPasswordPayload } from "./apiTypes";

class AuthAPIClient {
  login = (credentials: Credentials) => {
    return axiosInstance
      .post("auth/jwt/create/", credentials)
      .then((res) => res.data);
  };

  refresh = () => {
    return axiosInstance.post("auth/jwt/refresh/").then((res) => res.data);
  };

  activate = (data: ActivationPayload) => {
    return axiosInstance
      .post("auth/users/activation/", data)
      .then(() => undefined);
  };

  resendActivationEmail = (email: string) => {
    return axiosInstance
      .post("/auth/users/resend_activation/", { email })
      .then(() => undefined);
  };
  // resetPassword = (email: string) => {
  //   return axiosInstance
  //     .post("/auth/users/reset_password/", { email })
  //     .then(() => undefined);
  // };
  // resetPasswordConfirm = (uid: string, token: string, new_password: string) => {
  //   return axiosInstance
  //     .post("/auth/users/reset_password/", { uid, token, new_password })
  //     .then(() => undefined);
  // };
  setPassword = (data: SetPasswordPayload) => {
    return axiosInstance
      .post("/auth/users/set_password/", data)
      .then(() => undefined);
  };
}

export default AuthAPIClient;
