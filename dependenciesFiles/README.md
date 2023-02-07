## 1.项目打包

> 在我们在打包的时候会发现，报错下载失败，因为它的打包文件有几个是在git下载的，由于网络原因，下载不下来，导致出错。

### 步骤

将`electron.7z`，`electron-builder.7z`解压放在`%LOCALAPPDATA%`目录下即可，若存在可直接覆盖

目录结构为
`%LOCALAPPDATA%/electron/Cache/..`
`%LOCALAPPDATA%/electron-builder/Cache/..`

## 2.VUE-DEVTOOLS安装

> 默认使用electron-devtools-installer的vue-devtools为beta版本，会报`api.now is not function` 的错误

### 步骤

将`nhdogjmejiglipccpnnnanhbledajbpd.zip`，解压到

`C:\Users\用户名\AppData\Roaming\Electron\extensions`目录下

然后改代码

```typescript
///应用启动后的操作
app.whenReady().then(async () => {
    if (isDev) {
        // Install Vue Devtools
        try {
            //不能用beta版
            const vue_devtools = {id: "nhdogjmejiglipccpnnnanhbledajbpd", electron: ">=1.2.1"}
            const result = await installExtension(vue_devtools)
            if (result) {
                console.log("success load : " + result)
            }
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
})
```
