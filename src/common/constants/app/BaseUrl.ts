import {app} from "electron";
import {join} from "path";

export const BASE_URL = app.isPackaged
    ? `file://${join(app.getAppPath(), 'dist/render/index.html')}#/`
    : process.env["DS_RENDERER_URL"] + '/#/'
