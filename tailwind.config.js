module.exports = {
  // 禁用预加载，修复tailwind样式 与 naive-ui button等样式等冲突问题
  corePlugins: {
    preflight: false,
  },
  /* 在生产构建中对未使用的样式进行摇树优化 */
  content: [
    './index.html', './src/**/*.{vue,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      lineHeight: {
        0: '0',
      },
      padding: {
        5.5: '1.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
