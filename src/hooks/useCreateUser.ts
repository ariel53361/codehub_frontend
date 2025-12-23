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

const userApiClient = new UserAPIClient();
const profileApiClient = new ProfileAPIClient();
const authApiClient = new AuthAPIClient();

const useRegisterWithAutoLogin = (postSuccessFunc?: () => void) => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setProfile = useAuthStore((s) => s.setProfile);

  return useMutation<Profile, AxiosError<ApiError>, CreateUserProfileFormValues>({
    mutationFn: (newUser) => {
      const userFormData = new FormData();
      userFormData.append("username", newUser.username);
      userFormData.append("password", newUser.password);
      userFormData.append("email", newUser.email);
      if (newUser.first_name) userFormData.append("first_name", newUser.first_name);
      if (newUser.last_name) userFormData.append("last_name", newUser.last_name);

      return userApiClient
        .createUser(userFormData) 
        .then(() => {
          const credentials: Credentials = {
            username: newUser.username,
            password: newUser.password,
          };
          return authApiClient.login(credentials);
        })
        .then((tokens) =>{
          setAccessToken(tokens.access);
          
          const profileFormData = new FormData();
          profileFormData.append("bio", newUser.bio ?? "");

          if (newUser.avatar === null) {
            profileFormData.append("avatar", "");
          } else if (newUser.avatar instanceof File) {
            profileFormData.append("avatar", newUser.avatar);
          }

          return profileApiClient.updateCurrentProfile(profileFormData);
        })
        .then((profile) => {
          setProfile(profile);
          return profile;
        });
    },

    onSuccess:(profile) => {
      if (postSuccessFunc) postSuccessFunc();
    },
  });
};

export default useRegisterWithAutoLogin;