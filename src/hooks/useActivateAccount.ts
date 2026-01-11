import { AxiosError } from "axios";
import { ActivationPayload } from "../services/apiTypes";
import AuthAPIClient from "../services/authApiClient";

import { useMutation } from "@tanstack/react-query";
const authApiClient = new AuthAPIClient();
const useActivateAccount = (postSuccessFuncs?: () => void) => {
  return useMutation<void, AxiosError, ActivationPayload>({
    mutationFn: authApiClient.activate,
    onSuccess: () => {
      if (postSuccessFuncs) postSuccessFuncs();
    },
  });
};

export default useActivateAccount;
