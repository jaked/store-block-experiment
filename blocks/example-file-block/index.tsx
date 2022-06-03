import React from "react";
import { FileBlockProps, getLanguageFromFilename } from "@githubnext/blocks";
import { Button, Box } from "@primer/react";
import "./index.css";

export default function (props: FileBlockProps) {
  const { context, content, onStoreGet, onStoreSet } = props;
  const [number, setNumber] = React.useState(0);
  React.useEffect(() => {
    onStoreGet(`${context.path}/number`).then((number) =>
      setNumber(number ?? 0)
    );
  }, []);

  const language = Boolean(context.path)
    ? getLanguageFromFilename(context.path)
    : "N/A";

  return (
    <Box p={4}>
      <Box
        borderColor="border.default"
        borderWidth={1}
        borderStyle="solid"
        borderRadius={6}
        overflow="hidden"
      >
        <Box
          bg="canvas.subtle"
          p={3}
          borderBottomWidth={1}
          borderBottomStyle="solid"
          borderColor="border.default"
        >
          File: {context.path} {language}
        </Box>
        <Box p={4}>
          <p>Metadata example: this button has been clicked:</p>
          <Button
            onClick={() => {
              setNumber(number + 1);
              onStoreSet(`${context.path}/number`, number + 1);
            }}
          >
            {number} times
          </Button>
          <pre className="mt-3 p-3">{content}</pre>
        </Box>
      </Box>
    </Box>
  );
}
