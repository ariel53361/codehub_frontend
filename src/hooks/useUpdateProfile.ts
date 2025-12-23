import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProfileAPIClient from "../services/profileApiClient";
import useAuthStore from "../store/authStore";
import { ApiError } from "../services/apiTypes";
import { AxiosError } from "axios";
import { Profile, ProfilePayload } from "../entities/Profile";

const profileApiClient = new ProfileAPIClient();

const useUpdateProfile = (postSuccessFuncs?: () => void) => {
  const queryClient = useQueryClient();
  const setProfile = useAuthStore((s) => s.setProfile);
  return useMutation<Profile, AxiosError<ApiError>, ProfilePayload>({
    mutationFn: (data) => {
      const formData = new FormData();

      formData.append("bio", data.bio ?? "");

      if (data.avatar === null) {
        formData.append("avatar", "");
      } else if (data.avatar instanceof File) {
        formData.append("avatar", data.avatar);
      }

      return profileApiClient.updateCurrentProfile(formData);
    },
    onSuccess: (savedProfile) => {
      if (postSuccessFuncs) postSuccessFuncs();
      setProfile(savedProfile);
      queryClient.invalidateQueries({
        queryKey: ["profiles", savedProfile.id.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
  });
};

export default useUpdateProfile;
