import { useMutation } from "@tanstack/react-query";
import UserAPIClient from "../services/userApiClient";
import { ApiError } from "../services/apiTypes";
import { AxiosError } from "axios";
import { CreateUserProfileFormValues } from "../forms/UserProfileFormValues";
import AuthAPIClient from "../services/authApiClient";
import ProfileAPIClient from "../services/profileApiClient";
import useAuthStore from "../store/authStore";
import { Profile } from "../entities/Profile";
import { Credentials } from "./useLogin";
import { UserPayload } from "../entities/User";

const userApiClient = new UserAPIClient();
const profileApiClient = new ProfileAPIClient();
const authApiClient = new AuthAPIClient();

const useRegisterWithAutoLogin = (postSuccessFunc?: () => void) => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setProfile = useAuthStore((s) => s.setProfile);

  return useMutation<
    Profile,
    AxiosError<ApiError>,
    CreateUserProfileFormValues
  >({
    mutationFn: (data) => {
      const user: UserPayload = {
        username: data.username,
        password: data.password,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      };
      return userApiClient
        .createUser(user)
        .then(() => {
          const credentials: Credentials = {
            username: data.username,
            password: data.password,
          };
          return authApiClient.login(credentials);
        })
        .then((tokens) => {
          setAccessToken(tokens.access);

          const profileFormData = new FormData();
          
          if (data.avatar instanceof File) {
            profileFormData.append("avatar", data.avatar);
          }

          if (typeof data.bio === "string") {
            profileFormData.append("bio", data.bio);
          }

          return profileApiClient.updateCurrentProfile(profileFormData);
        })
        .then((profile) => {
          setProfile(profile);
          return profile;
        });
    },

    onSuccess: (profile) => {
      if (postSuccessFunc) postSuccessFunc();
    },
  });
};

export default useRegisterWithAutoLogin;
