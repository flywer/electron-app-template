import {Component, h} from "vue"
import {NIcon} from "naive-ui"

export const renderIcon = (icon: Component, size: number = 20) => {
    return () => h(NIcon, {size: size}, {default: () => h(icon)})
}
