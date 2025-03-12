import { createTheme } from 'thememirror';
import { tags as t } from '@lezer/highlight';

export const theme = createTheme({
  variant: 'dark',
  settings: {
    background: '#000',
    foreground: '#80C6E2',
    caret: '#fff',
    selection: '#16a4c0',
    lineHighlight: '#8a91991a',
    // gutterBackground: '#000',
    gutterForeground: '#f2f2f2',
  },
  styles: [
    {
      tag: t.comment,
      color: '#787b8099',
    },
    {
      tag: t.variableName,
      color: '#80C6E2',
    },
    {
      tag: t.number,
      color: '#A974CB',
    },
    {
      tag: t.keyword,
      color: '#FAAE16',
    },
    {
      tag: t.operator,
      color: '#52C718',
    },
    {
      tag: t.labelName,
      color: '#5fddab',
    },
  ],
});
