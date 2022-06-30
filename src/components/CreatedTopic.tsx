import { Box, Button, Heading } from "grommet";
import { Add, FormAdd, FormSubtract, Tools } from "grommet-icons";

interface CreatedTopicProps {
  name: string;
  duration: number;
  id: number;
}

function CreatedTopic(props: CreatedTopicProps) {
  return (
    <>
      <Box pad="small" direction="column" gap="small">
        <Box>
          <Heading level="1" textAlign="center" margin={{ vertical: "medium" }}>
            {props.name}
          </Heading>
        </Box>

        <Box direction="row">
          <Button
            size="small"
            plain={undefined}
            icon={<FormSubtract size="medium" style={{ width: 20 }} />}
            onClick={() => {}}
            primary
            style={{ width: 30, height: 30, padding: "3px 5px" }}
          />
          <Heading
            level="3"
            textAlign="center"
            margin={{ vertical: "none", horizontal: "small" }}
          >
            {props.duration} Minutes
          </Heading>

          <Button
            size="small"
            plain={undefined}
            icon={<FormAdd size="medium" style={{ width: 20 }} />}
            onClick={() => {}}
            primary
            style={{ width: 30, height: 30, padding: "3px 5px" }}
          />
        </Box>
      </Box>
    </>
  );
}

export default CreatedTopic;
