import { Box, Button, Heading } from "grommet";
import { Add, Tools } from "grommet-icons";

interface CreatedTopicProps {
  name: string;
  duration: number;
  id: number;
}

function CreatedTopic(props: CreatedTopicProps) {
  return (
    <>
      <Box>
        <Heading alignSelf="center" margin={{ vertical: "small" }}>
          {props.name}
        </Heading>
      </Box>
      <Box pad="small" direction="row">
        <Button
          size="small"
          plain={false}
          icon={<Add size="medium" />}
          onClick={() => {}}
          primary
        />
        <Heading
          size="small"
          margin={{ vertical: "none", horizontal: "small" }}
        >
          {props.duration} Minutes
        </Heading>
        <Button
          size="small"
          plain={false}
          icon={<Add size="medium" />}
          onClick={() => {}}
          primary
        />
      </Box>
    </>
  );
}

export default CreatedTopic;
