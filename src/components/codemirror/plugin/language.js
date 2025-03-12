import { simpleMode } from '@codemirror/legacy-modes/mode/simple-mode';
import { StreamLanguage } from '@codemirror/language';

export const formulaLang = simpleMode({
  start: [
    { regex: /\/\/.*/, token: 'comment' },
    { regex: /\/\*/, token: 'comment', next: 'comment' },
    { regex: /[a-z$][\w$]*/, token: 'variable' },
    { regex: /[\u4e00-\u9fa5]+/, token: 'variable' },
    {
      // TODO
      // eslint-disable-next-line security/detect-unsafe-regex
      regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
      token: 'number',
    },
    {
      regex: /(?:IF|ELSE|THEN|ELSEIF|RETURN|END|AND|OR|LIKE)\b/,
      token: 'keyword',
    },
    { regex: /[-+/*=<>!'"()]/, token: 'operator' },
    {
      regex: /(?:SUM|MAX|MIN|NVL|AVG)/,
      token: 'labelName',
    },
  ],
  comment: [
    { regex: /.*?\*\//, token: 'comment', next: 'start' },
    { regex: /.*/, token: 'comment' },
  ],
  meta: {
    dontIndentStates: ['comment'],
    lineComment: '//',
  },
});

export const language = StreamLanguage.define(formulaLang);
