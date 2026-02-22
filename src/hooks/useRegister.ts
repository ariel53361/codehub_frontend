import { useMutation } from "@tanstack/react-query";
import UserAPIClient from "../services/userApiClient";
import { ApiError } from "../services/apiTypes";
import { AxiosError } from "axios";
import { CreateUserProfileFormValues } from "../forms/UserProfileFormValues";
import { User, UserPayload } from "../entities/User";

const userApiClient = new UserAPIClient();

const useRegister = (postSuccessFunc?: () => void) => {
  return useMutation<User, AxiosError<ApiError>, CreateUserProfileFormValues>({
    mutationFn: (data) => {
      const user: UserPayload = {
        username: data.username,
        password: data.password,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      };
      return userApiClient.createUser(user);
      // .then(() => {
      //   const credentials: Credentials = {
      //     username: data.username,
      //     password: data.password,
      //   };
      //   return authApiClient.login(credentials);
      // })
      // .then((tokens) => {
      //   setAccessToken(tokens.access);

      //   const profileFormData = new FormData();

      //   if (data.avatar instanceof File) {
      //     profileFormData.append("avatar", data.avatar);
      //   }

      //   if (typeof data.bio === "string") {
      //     profileFormData.append("bio", data.bio);
      //   }

      //   return profileApiClient.updateCurrentProfile(profileFormData);
      // })
      // .then((profile) => {
      //   setProfile(profile);
      //   return profile;
      // });
    },

    onSuccess: (user) => {
      console.log("useRegister print: ", user);
      if (postSuccessFunc) postSuccessFunc();
    },
  });
};

export default useRegister;
