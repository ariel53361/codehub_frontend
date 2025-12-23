import axiosInstance from "./axiosInstance";
import { Profile } from "../entities/Profile";

class ProfileAPIClient {
  getCurrentProfile = () => {
    return axiosInstance
      .get<Profile>("codehub/profiles/me/")
      .then((res) => res.data);
  };

  getProfile = (id: number) => {
    return axiosInstance
      .get<Profile>(`codehub/profiles/${id}/`)
      .then((res) => res.data);
  };

  updateCurrentProfile = (data: FormData) => {
    return axiosInstance
      .patch<Profile>("codehub/profiles/me/", data)
      .then((res) => res.data);
  };
}

export default ProfileAPIClient;
