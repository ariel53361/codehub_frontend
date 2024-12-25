import { AxiosError } from "axios";
import { ApiError } from "../services/apiTypes";
import { Text, TextProps } from "@chakra-ui/react";
import { isApiError } from "../utils/isApiError";

interface Props {
  error: AxiosError<ApiError> | null;
  textProps?: TextProps;
}

const ApiErrorDisplay = ({ error, textProps }: Props) => {
  if (!error) return null;

  const apiErrors = error.response?.data;
  if (!isApiError(apiErrors)) {
    return (
      <Text color="red" {...textProps}>
        {error.message}
      </Text>
    );
  }

  return (
    <>
      {Object.entries<string[]>(apiErrors).map(([field, messages], index) => (
        <Text key={index} color="red" {...textProps}>
          {`${field}: ${messages.join(", ")}`}
        </Text>
      ))}
    </>
  );
};
export default ApiErrorDisplay;
