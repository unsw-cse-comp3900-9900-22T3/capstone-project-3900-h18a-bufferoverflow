
import { Template } from "../../components/generic/Template";
import { NextPage } from "next";
import { useState , useEffect} from "react";
import { Stack } from "@mui/system";
import { SingleChatOverview , SingleChatOverviewProps} from "../../components/chat/single-chat";
import { mockSingleChatRequest } from "../../utils/mockdata";

const ChatOverview: NextPage = () => {
  const [data, setData] = useState<SingleChatOverviewProps[]>([]);

  useEffect(() => {
      mockSingleChatRequest().then((data) => setData(data));
  }, []);

  return (
    <Template title="Chat Overview">
      <h3>Active Chats</h3>
      <Stack spacing={2}>
        {data?.map((item) => {
          const href = item.href;
          return <SingleChatOverview {...item} href={href} />;
        })}
      </Stack>
      <h3>Inactive Chats</h3>
      <Stack spacing={2}>
        {data?.map((item) => {
          const href = item.href;
          return <SingleChatOverview {...item} href={href} />;
        })}
      </Stack>
    </Template>
  );
};

export default ChatOverview
