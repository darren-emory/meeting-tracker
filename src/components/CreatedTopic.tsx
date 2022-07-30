import { useState, useEffect } from "react";
import { Box, Button, Heading, TextInput } from "grommet";
import { Add, FormAdd, FormSubtract, Tools } from "grommet-icons";

interface CreatedTopicProps {
  topic: any;
  handleCustomTopicTime: (topic: any, value: number) => void;
  initialTopicDuration: number;
}

function CreatedTopic(props: CreatedTopicProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(props.initialTopicDuration);
  }, []);

  useEffect(() => {
    props.handleCustomTopicTime(props.topic, value);
  }, [value]);
  return (
    <>
      <Box pad="small" direction="column" gap="small">
        <Box>
          <Heading level="1" textAlign="center" margin={{ vertical: "medium" }}>
            {props.topic.name}
          </Heading>
        </Box>

        <Box direction="row">
          <TextInput
            type={"number"}
            placeholder={props.initialTopicDuration}
            onChange={(e) => setValue(parseInt(e.target.value))}
          />
        </Box>
      </Box>
    </>
  );
}

export default CreatedTopic;
