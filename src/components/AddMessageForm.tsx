import { Button, Text, Textarea, VStack } from "@chakra-ui/react";
import useSendMessage from "../hooks/useSendMessage";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ApiErrorDisplay from "./ApiErrorDisplay";

const AddMessageForm = () => {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [lengthError, setLengthError] = useState<String>("");
  const { roomId } = useParams();
  const {
    mutate: sendMessage,
    error: sendError,
    isLoading,
  } = useSendMessage(roomId!);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = messageRef.current!.value;

    if (content.length < 2) {
      setLengthError("Message must be at least 2 characters");
      return;
    }
    if (content.length > 50000) {
      setLengthError("Message cannot exceed 50,000 characters");
      return;
    }

    setLengthError("");

    sendMessage({ content });
    messageRef.current!.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack>
        <Textarea ref={messageRef} id="message" marginTop={"20px"} />
        {lengthError && <Text color={'red'}>{lengthError}</Text>}
        <ApiErrorDisplay error={sendError}/>
        <Button type="submit">Send</Button>
      </VStack>
    </form>
  );
};

export default AddMessageForm;
