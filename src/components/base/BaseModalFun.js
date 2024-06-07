/* 该组件可以对模态框语法糖的属性统一修改，根据UI规范可自行修改 */

// 公共的方法
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";

// 确认弹窗
export function baseConfirm(options) {
    if (Object.prototype.toString.call(options) !== "[object Object]") {
        console.error('aAlert方法参数应该是 Object，传入的是：', Object.prototype.toString.call(options).slice(8, -1));
        return;
    }
    const defaultProps = {
        title: "确认",
        content: "确定执行此操作吗？",
        icon: createVNode(ExclamationCircleOutlined),
        okText: "确定",
        cancelText: "取消",
    }

    Modal.confirm(Object.assign(defaultProps, options));
}

// 信息提示 info success error warning 参考antd-vue
export function baseAlert(type, options) {
    if (Object.prototype.toString.call(options) !== "[object Object]") {
        console.error('aAlert方法参数应该是 Object，传入的是：', Object.prototype.toString.call(options).slice(8, -1));
        return;
    }
    const defaultProps = {
        okText: "确定",
    }
    Modal[type](Object.assign(defaultProps, options));
}

