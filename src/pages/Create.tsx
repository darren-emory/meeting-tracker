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
}

function Create() {
  const [meetingDuration, setMeetingDuration] = useState<number>();
  const [topicDuration, setTopicDuration] = useState<number>();
  const [meetingTopics, setMeetingTopics] = useState({});
  const [topicInput, setTopicInput] = useState("");

  useEffect(() => {
    calculateTopicDuration();
  }, [meetingDuration, meetingTopics]);

  const parseMeetingDuration = (option: string) => {
    switch (option) {
      case "15 minutes":
        setMeetingDuration(15);
        break;
      case "30 minutes":
        setMeetingDuration(30);
        break;
      case "45 minutes":
        setMeetingDuration(45);
        break;
      case "1 hour":
        setMeetingDuration(60);
        break;
      case "1.5 hours":
        setMeetingDuration(90);
        break;
      case "2 hours":
        setMeetingDuration(120);
        break;
    }
  };

  const handleAddMeetingTopic = (topicName: string) => {
    let newTopic = {
      id: uuid(),
      name: topicName,
    };
    let updatedMeetingTopics: any = { ...meetingTopics };
    updatedMeetingTopics[newTopic.id] = newTopic;

    setMeetingTopics(updatedMeetingTopics);
    calculateTopicDuration();
  };

  const calculateTopicDuration = () => {
    // get total meetingTopics
    // divide meetingTopics by meetingDuration
    // set state

    const totalTopics = Object.keys(meetingTopics).length;
    meetingDuration && setTopicDuration(meetingDuration / totalTopics);
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
              onChange={({ option }) => parseMeetingDuration(option)}
              options={[
                "15 minutes",
                "30 minutes",
                "45 minutes",
                "1 hour",
                "1.5 hours",
                "2 hours",
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
                  <div key={topic.id}>
                    {topic.name} - {topicDuration} minutes
                  </div>
                ))}
              </Text>
            </Box>
          )}

          <Box align="center" pad={{ vertical: "medium" }}>
            <Link to="/create">
              <Button
                primary
                color="accent-4"
                label="Begin Meeting"
                size="large"
              />
            </Link>
          </Box>
        </Card>
      </Main>
    </AppWrapper>
  );
}

export default Create;
