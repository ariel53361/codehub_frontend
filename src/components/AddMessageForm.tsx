import { Button, Textarea, VStack } from "@chakra-ui/react";
import useSentMessage from "../hooks/useSentMessage";
import { useRef } from "react";

const AddMessageForm = () => {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const { mutate, isLoading, error } = useSentMessage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({ content: messageRef.current!.value });
    messageRef.current!.value = "";
  };
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const newMessage = await sentMessage(messageRef.current?.value);
  //   console.log(newMessage);
  //   if (messages && newMessage) {
  //     setMessages([...messages, newMessage]);
  //   }
  // };
  return (
    <form onSubmit={handleSubmit}>
      <VStack>
        <Textarea ref={messageRef} id="message" marginTop={"20px"} />
        <Button type="submit">Send</Button>
      </VStack>
    </form>
  );
};

export default AddMessageForm;
