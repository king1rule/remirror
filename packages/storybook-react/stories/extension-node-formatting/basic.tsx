import 'remirror/styles/all.css';

import React from 'react';
import { htmlToProsemirrorNode } from 'remirror';
import { NodeFormattingExtension } from 'remirror/extensions';
import { Remirror, ThemeProvider, useCommands, useRemirror } from '@remirror/react';

const Basic: React.FC = () => {
  const { manager, state, onChange } = useRemirror({
    extensions: () => [new NodeFormattingExtension()],
    content: '<p>Click buttons to change alignment, indent,<br> and line height</p>',
    stringHandler: htmlToProsemirrorNode,
  });

  return (
    <ThemeProvider>
      <Remirror
        manager={manager}
        autoFocus
        onChange={onChange}
        initialContent={state}
        autoRender='end'
      >
        <AlignButtons />
        &nbsp;
        <IndentButtons />
        &nbsp;
        <LineHeightButtons />
      </Remirror>
    </ThemeProvider>
  );
};

const AlignButtons = () => {
  const commands = useCommands();
  return (
    <>
      <button onClick={() => commands.leftAlign()}>Left</button>
      <button onClick={() => commands.centerAlign()}>Center</button>
      <button onClick={() => commands.rightAlign()}>Right</button>
    </>
  );
};

const IndentButtons = () => {
  const commands = useCommands();
  return (
    <>
      <button onClick={() => commands.decreaseIndent()}>&lt;&lt;</button>
      <button onClick={() => commands.increaseIndent()}>&gt;&gt;</button>
    </>
  );
};

const LineHeightButtons = () => {
  const commands = useCommands();
  return (
    <>
      <button onClick={() => commands.setLineHeight(1)}>Narrow</button>
      <button onClick={() => commands.setLineHeight(2)}>Wide</button>
    </>
  );
};

export default Basic;
