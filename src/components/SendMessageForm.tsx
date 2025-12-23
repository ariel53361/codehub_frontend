import { Button, Text, Textarea, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import useSendMessage from "../hooks/useSendMessage";
import { Message } from "../entities/Message";
import useAuthStore from "../store/authStore";
import { Room } from "../entities/Room";

interface Props {
  room: Room;
}

const SendMessageForm = ({ room }: Props) => {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [lengthError, setLengthError] = useState<string>("");
  const profile = useAuthStore((s) => s.profile);

  const { sendMessage, error: sendMessageError } = useSendMessage(room.id);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = messageRef.current?.value.trim() || "";

    if (content.length < 2) {
      setLengthError("Message must be at least 2 characters");
      return;
    }
    if (content.length > 50000) {
      setLengthError("Message cannot exceed 50,000 characters");
      return;
    }

    setLengthError("");

    const newMessage: Message = {
      id: Date.now(),
      profile: profile!,
      created: new Date().toISOString(),
      content,
      room,
    };

    sendMessage(newMessage);
    messageRef.current!.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack>
        <Textarea ref={messageRef} placeholder="Type your message..." />
        {lengthError && <Text color="red">{lengthError}</Text>}
        {sendMessageError && <Text color="red">{sendMessageError}</Text>}
        <Button isDisabled={!!sendMessageError} type="submit">
          Send
        </Button>
      </VStack>
    </form>
  );
};

export default SendMessageForm;
