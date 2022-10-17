
import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { Stack } from "@mui/system";
import { SingleChatOverview } from "../../components/chat/single-chat";

const ChatOverview: NextPage = () => {
  return (
    <Template title="Chat Overview">
      <h3>Active Chats</h3>
      <Stack spacing={2}>
        <SingleChatOverview />
        <SingleChatOverview />
        <SingleChatOverview />
        <SingleChatOverview />
      </Stack>
      <h3>Inactive Chats</h3>
      <Stack spacing={2}>
        <SingleChatOverview />
        <SingleChatOverview />
        <SingleChatOverview />
        <SingleChatOverview />
      </Stack>
    </Template>
  );
};

export default ChatOverview
