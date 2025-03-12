import { autocompletion as _autocompletion } from '@codemirror/autocomplete';

/**
 * 自动补全override 按@ 自动不全
 * @param {object} context -编辑器上下文
 * @param {Array} autocompleteOptions -自动补全选项
 * @returns {object} -自动补全选项
 */
function override(context, autocompleteOptions) {
  if (autocompleteOptions.length) {
    const matchAllOptionsWord = context.matchBefore(/@/);

    const options = autocompleteOptions.map((row) => {
      return {
        ...row,
        label: `@${row.displayName}`,
        apply: row.displayName,
        displayLabel: row.displayName,
      };
    });

    if (matchAllOptionsWord) {
      // 以@开头，引出模糊搜索
      return {
        from: matchAllOptionsWord.from,
        options,
      };
    }

    const matchOptionsWord = context.matchBefore(/[\u4e00-\u9fa5\w\s]+/);

    if (matchOptionsWord) {
      // 文本输入模糊搜索
      return {
        from: matchOptionsWord.from,
        options,
      };
    }
  }

  return null;
}

/**
 * 自动补全生成器
 * @param {Array} autocompleteOptions 补全器选项
 * @returns {Function} -自动补全器
 */
export function autocompletion(autocompleteOptions) {
  return _autocompletion({
    override: [(context) => override(context, autocompleteOptions)],
    tooltipClass: () => 'codemirror-tooltip', // 样式在root目录下
    optionClass: () => 'codemirror-option', // 样式在root目录下
    addToOptions: [
      {
        render: (option) => {
          const {
            prefix: { text, color },
          } = option;

          const prefixNode = document.createElement('div');

          prefixNode.innerText = text;

          prefixNode.style.color = color;

          prefixNode.style.minWidth = '3rem';

          prefixNode.style.textAlign = 'right';

          return prefixNode;
        },
        position: 20,
      },
    ],
  });
}
