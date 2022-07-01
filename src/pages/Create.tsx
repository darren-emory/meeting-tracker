import { useState, useEffect } from "react";
import AppWrapper from "./AppWrapper";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  Box,
  Button,
  Card,
  Heading,
  Main,
  Paragraph,
  Select,
  Text,
  TextInput,
  Tip,
} from "grommet";
import CreatedTopic from "../components/CreatedTopic";

interface MeetingTopic {
  name: string;
  weight: number;
  topicDuration: number | boolean;
  [key: string]: string | number | boolean;
}

function Create() {
  const [meetingDuration, setMeetingDuration] = useState<number>();
  const [topicDuration, setTopicDuration] = useState<any>();
  const [meetingTopics, setMeetingTopics] = useState<
    Array<MeetingTopic | null>
  >([]);
  const [topicInput, setTopicInput] = useState("");

  useEffect(() => {
    calculateTopicDuration();
  }, [meetingDuration, meetingTopics]);

  const handleMeetingDuration = (option: string) => {
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
    let newTopic: MeetingTopic = {
      name: topicName,
      weight: 2,
      topicDuration: false,
      key: uuid(),
    };
    let updatedMeetingTopics = meetingTopics;
    updatedMeetingTopics.push(newTopic);

    setMeetingTopics(updatedMeetingTopics);
    calculateTopicDuration();
  };

  const calculateTopicWeight = (topic: MeetingTopic, increase?: boolean) => {
    let updatedTopic: MeetingTopic = topic;

    if (increase && topic.weight < 3) {
      updatedTopic.weight++;
    } else if (!increase && topic.weight > 1) {
      updatedTopic.weight--;
    }

    updateTopic(updatedTopic);
  };

  const updateTopic = (topic: MeetingTopic) => {
    const newTopics = meetingTopics.map((t) => {
      if (t?.key === topic.key) {
        return {
          name: topic.name,
          weight: topic.weight,
          topicDuration: topic.topicDuration,
          key: topic.key,
        };
      }

      return t;
    });

    setMeetingTopics(newTopics);
  };

  const calculateTopicDuration = () => {
    // TODO:       // find length of each weight class before processing time
    // don't divide time by half if there's no other weights left

    let totalTopics = Object.keys(meetingTopics).length;
    let remainingTime = meetingDuration;
    let weightedTime = meetingDuration;

    let weightedTopics = [];

    for (let w = 3; w > 0; w--) {
      // divide topics into arrays based on weight
      weightedTopics[w] = meetingTopics.filter((topic) => topic?.weight === w);

      // halfing meeting time per weight
      let weightedTime = (remainingTime as number) / 2;
      (remainingTime as number) -= weightedTime;

      // half weight time and divide it among topics
      for (let t = 0; t < weightedTopics[w].length; t++) {
        let calculatedWeightedTopicTime =
          (weightedTime as number) / weightedTopics[w].length;

        (weightedTopics[w][t] as MeetingTopic).topicDuration =
          calculatedWeightedTopicTime;
      }
      console.log(remainingTime);
    }

    if (meetingDuration) {
      let topicDuration: any = meetingDuration / totalTopics;
      if (topicDuration % 2 !== 0) {
        topicDuration = topicDuration.toFixed(2);
        setTopicDuration(topicDuration);
      } else {
        setTopicDuration(topicDuration);
      }
    }
  };

  return (
    <AppWrapper>
      <Heading>Let's set up your awesome meeting:</Heading>
      <Main direction="column" background="brand" align="center">
        <Box direction="row">
          <Card background="light-1" pad="medium" width="medium">
            <Box align="center" pad={{ vertical: "medium" }}>
              <Text margin={{ vertical: "small" }}>
                How long is your meeting?
              </Text>
              <Select
                onChange={({ option }) => handleMeetingDuration(option)}
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
              <Tip content="Press Enter to add topics">
                <input
                  type="text"
                  className="textInput"
                  value={topicInput}
                  onChange={(e) =>
                    setTopicInput((e.target as HTMLInputElement).value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddMeetingTopic(
                        (e.target as HTMLInputElement).value
                      );
                      setTopicInput("");
                    }
                  }}
                />
              </Tip>
            </Box>
          </Card>

          <Card background="light-1" pad="medium" width="medium">
            {Object.keys(meetingTopics).length > 0 && (
              <Box align="center" pad={{ vertical: "medium" }}>
                <Heading
                  textAlign="center"
                  margin={{ vertical: "small" }}
                  level="3"
                >
                  Your awesome meeting agenda:
                </Heading>
                <Box>
                  {Object.values(meetingTopics).map((topic: any) => (
                    <CreatedTopic
                      key={topic.key}
                      topic={topic}
                      calculateTopicWeight={calculateTopicWeight}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Card>
        </Box>
        <Box align="" pad={{ vertical: "medium" }}>
          <Link to="/create">
            <Button
              primary
              color="accent-4"
              label="Begin Meeting"
              size="large"
            />
          </Link>
        </Box>
      </Main>
    </AppWrapper>
  );
}

export default Create;
