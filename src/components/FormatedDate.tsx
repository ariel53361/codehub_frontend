import { Text, TextProps } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";

interface Props extends TextProps {
  date: string;
}

const FormatedDate = ({ date, ...textProps }: Props) => {
  return (
    <Text fontWeight={"normal"} {...textProps}>
      {formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })}
    </Text>
  );
};

export default FormatedDate;
