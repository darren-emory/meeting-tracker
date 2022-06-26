import { useState, useEffect } from "react";
import AppWrapper from "./AppWrapper";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  Box,
  Button,
  Card,
  Grid,
  Heading,
  Main,
  Paragraph,
  Select,
  Text,
  TextInput,
} from "grommet";

interface MeetingTopic {
  id: any;
  name: string;
  percentageOfMeeting: number;
}

function Create() {
  const [meetingDuration, setMeetingDuration] = useState<number>();
  const [meetingTopics, setMeetingTopics] = useState({});
  const [topicInput, setTopicInput] = useState("");

  useEffect(() => {
    console.log(Object.values(meetingTopics));
  }, [meetingTopics]);

  const handleAddMeetingTopic = (topicName: string) => {
    let newTopic = {
      id: uuid(),
      name: topicName,
      percentageOfMeeting: calculateNewTopicPercentage(),
    };
    let updatedMeetingTopics: any = { ...meetingTopics };
    updatedMeetingTopics[newTopic.id] = newTopic;

    setMeetingTopics(updatedMeetingTopics);
  };

  const renderMeetingTopics = () => {
    Object.entries(meetingTopics).map(([key]) => {
      return "yay";
    });
  };
  const calculateNewTopicPercentage = () => {
    return 1;
  };

  return (
    <AppWrapper>
      <Main
        pad="large"
        direction="column"
        align="center"
        justify="center"
        background="brand"
      >
        <Heading>Let's set up your awesome meeting:</Heading>
        <Card background="light-1" pad="large" width="large" align="center">
          <Box align="center" pad={{ vertical: "medium" }}>
            <Text margin={{ vertical: "small" }}>
              How long is your meeting?
            </Text>
            <Select
              options={[
                "15 minutes",
                "30 minutes",
                "45 minutes",
                "1 hour",
                "1.5 hours",
              ]}
            />
          </Box>
          <Box align="center" pad={{ vertical: "medium" }}>
            <Text margin={{ vertical: "small" }}>
              What topics do you want to discuss?
            </Text>
            <input
              type="text"
              className="textInput"
              value={topicInput}
              onChange={(e) =>
                setTopicInput((e.target as HTMLInputElement).value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddMeetingTopic((e.target as HTMLInputElement).value);
                  setTopicInput("");
                }
              }}
            />
          </Box>

          {Object.keys(meetingTopics).length > 0 && (
            <Box align="center" pad={{ vertical: "medium" }}>
              <Text margin={{ vertical: "small" }}>
                Here's your topics:
                {Object.values(meetingTopics).map((topic: any) => (
                  <div key={topic.id}>{topic.name}</div>
                ))}
              </Text>
            </Box>
          )}

          <Box align="center" pad={{ vertical: "medium" }}>
            <Link to="/create">
              <Button primary color="accent-4" label="Set Up Your Meeting" />
            </Link>
          </Box>
        </Card>
      </Main>
    </AppWrapper>
  );
}

export default Create;
