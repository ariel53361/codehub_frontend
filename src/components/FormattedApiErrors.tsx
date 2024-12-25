import { Text, TextProps } from "@chakra-ui/react";

interface Props {
  errorMessages?: string[];
  textProps?: TextProps;
}

const FormattedApiErrors = ({ errorMessages, textProps }: Props) => {
  if (!errorMessages?.length) return null;

  return (
    <>
      {errorMessages.map((message, i) => (
        <Text key={i} color="red" {...textProps}>
          {message}
        </Text>
      ))}
    </>
  );
};

export default FormattedApiErrors;
