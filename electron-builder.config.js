/**
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  productName: 'Template',
  // copyright: "", //应用版本
  directories: {
    output: 'dist/electron', // 构建后保存的位置
  },
  // 将源代码中的资源进行拷贝打包
  extraResources: [{
    from: './assets/',
    to: 'assets',
  }],
  win: {
    icon: './assets/logo_256.ico', // windows下应用的图标
    target: [
      {
        target: 'nsis', // 设置目标安装包工具
      },
    ],
  },
  nsis: {
    oneClick: false, // 是否一键安装
    allowElevation: false, // 允许请求提升 如果为false，则用户必须使用提升的权限重新启动安装程序
    allowToChangeInstallationDirectory: true, // 允许修改安装目录
    //installerIcon: './assets/logo_256.ico', // 安装图标
    //uninstallerIcon: './assets/logo_256.ico', // 卸载图标
    //installerHeaderIcon: './assets/logo_256.ico', // 安装时头部图标
    createDesktopShortcut: true, // 创建桌面图标
    createStartMenuShortcut: true, // 创建开始菜单图标
    //shortcutName: 'Template', // 快捷方式名称
  },
  publish: [
    {
      provider: 'github', // 打包上传到github
      //owner: 'flywer', // 仓库所有者
      //repo: 'repoName', // 仓库名称
      private: true, // 若是私有仓库，则将私有设置为true，同时添加token，反之不需要设置
      //token: 'ghp_LtN9gOS0zcC9pSqsw5ddXZKDB22OM4LNe60', // github的私有token
      releaseType: 'release', // 上传到github的版本类型（draft:草稿，prerelease:提前发行版，release:发行版）
    },
  ],
  npmRebuild: false,
  files: [
    'dist/main/**/*',
    'dist/preload/**/*',
    'dist/render/**/*',
  ],
}

module.exports = config
