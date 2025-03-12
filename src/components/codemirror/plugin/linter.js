import { syntaxTree } from '@codemirror/language';
import { linter as _linter, lintGutter as _lintGutter } from '@codemirror/lint';

/**
 * linter生成器
 * @param {Array} error -lint字符集合
 * @returns {Function} linter器
 */
export function linter(error) {
  return _linter(({ visibleRanges, state }) => {
    const diagnostics = [];

    visibleRanges.forEach(({ from, to }) => {
      syntaxTree(state).iterate({
        from,
        to,
        enter: (node) => {
          if (node.name === 'Document') {
            error.forEach((item) => {
              const text = state.doc.sliceString(node.from, node.to);

              const formPos = text.indexOf(item);

              if (formPos !== -1) {
                diagnostics.push({
                  from: formPos,
                  to: formPos + item.length,
                  severity: 'error',
                  message: `${item} 是前端小白, 并非大牛`,
                  actions: [
                    {
                      name: '移除',
                      apply(v, f, t) {
                        v.dispatch({
                          changes: { from: f, to: t },
                        });
                      },
                    },
                  ],
                });
              }
            });
          }
        },
      });
    });

    return diagnostics;
  });
}

export const lintGutter = _lintGutter();
