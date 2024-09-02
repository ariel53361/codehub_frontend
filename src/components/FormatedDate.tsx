import { Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import React from "react";

interface Props {
  date: string;
  optionalAttributes?: object;
}
const FormatedDate = ({ date, optionalAttributes }: Props) => {
  return (
    <Text fontWeight={"normal"} {...optionalAttributes}>
      {formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })}
    </Text>
  );
};

export default FormatedDate;
