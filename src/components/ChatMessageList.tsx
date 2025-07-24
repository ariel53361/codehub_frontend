import { Spinner, VStack } from "@chakra-ui/react";
import ChatMessage from "./ChatMessage";
import useRoomMessages from "../hooks/useRoomMessages";
import { useEffect, useRef } from "react";

interface Props {
  roomId: number;
}

const ChatMessageList = ({ roomId }: Props) => {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRoomMessages(roomId);

  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = [
    ...(data?.pages.flatMap((page) => page.results) ?? []),
  ].reverse();

  useEffect(() => {
    if (scrollRef.current && data?.pages.length === 1) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [data]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    if (target.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      const prevScrollHeight = target.scrollHeight;

      fetchNextPage().then(() => {
        if (scrollRef.current) {
          const newScrollHeight = scrollRef.current.scrollHeight;
          scrollRef.current.scrollTop = newScrollHeight - prevScrollHeight;
        }
      });
    }
  };

  return (
    <VStack
      bg={"#1a202c"}
      align={"start"}
      gap={"20px"}
      maxH="700px"
      overflowY="scroll"
      p="25px"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      w={"100%"}
      onScroll={handleScroll}
      ref={scrollRef}
    >
      {isFetchingNextPage && <Spinner />}
      {messages?.map((m) => (
        <ChatMessage message={m} key={m.id} />
      ))}
    </VStack>
  );
};

export default ChatMessageList;
