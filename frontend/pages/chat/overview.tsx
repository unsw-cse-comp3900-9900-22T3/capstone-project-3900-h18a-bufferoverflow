
import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { SingleChatOverview } from "../../components/chat/single-chat";

const ChatOverview: NextPage = () => {
  return (
    <Template title="Chat Overview">
      <SingleChatOverview />
      <SingleChatOverview />
      <SingleChatOverview />
      <SingleChatOverview />
    </Template>
  );
};

export default ChatOverview
