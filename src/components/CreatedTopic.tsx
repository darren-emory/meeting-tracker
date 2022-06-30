import { Box, Button, Heading } from "grommet";
import { Add, FormAdd, FormSubtract, Tools } from "grommet-icons";

interface CreatedTopicProps {
  topic: any;
  calculateTopicWeight: (topic: any, increase?: boolean) => void;
}

function CreatedTopic(props: CreatedTopicProps) {
  return (
    <>
      <Box pad="small" direction="column" gap="small">
        <Box>
          <Heading level="1" textAlign="center" margin={{ vertical: "medium" }}>
            {props.topic.name}
          </Heading>
        </Box>

        <Box direction="row">
          <Button
            size="small"
            plain={undefined}
            icon={<FormSubtract size="medium" style={{ width: 20 }} />}
            onClick={() => {
              props.calculateTopicWeight(props.topic);
            }}
            primary
            style={{ width: 30, height: 30, padding: "3px 5px" }}
          />
          <Heading
            level="3"
            textAlign="center"
            margin={{ vertical: "none", horizontal: "small" }}
          >
            {props.topic.topicDuration} Minutes, {props.topic.weight}
          </Heading>

          <Button
            size="small"
            plain={undefined}
            icon={<FormAdd size="medium" style={{ width: 20 }} />}
            onClick={() => {
              props.calculateTopicWeight(props.topic, true);
            }}
            primary
            style={{ width: 30, height: 30, padding: "3px 5px" }}
          />
        </Box>
      </Box>
    </>
  );
}

export default CreatedTopic;
