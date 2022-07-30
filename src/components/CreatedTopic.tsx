import { useState, useEffect } from "react";
import { Box, Button, Heading, TextInput } from "grommet";
import { Add, FormAdd, FormSubtract, Tools } from "grommet-icons";

interface CreatedTopicProps {
  topic: any;
  handleCustomTopicTime: (topic: any, value: number) => void;
  initialTopicDuration: number;
}

function CreatedTopic(props: CreatedTopicProps) {
  const [value, setValue] = useState(props.initialTopicDuration);
  const [defaultValue, setDefaultValue] = useState<number | string>(
    props.initialTopicDuration
  );

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
            placeholder={defaultValue}
            onChange={(e) => (
              setDefaultValue(""),
              e.target.value === ""
                ? setValue(0)
                : setValue(parseInt(e.target.value))
            )}
          />
        </Box>
      </Box>
    </>
  );
}

export default CreatedTopic;
