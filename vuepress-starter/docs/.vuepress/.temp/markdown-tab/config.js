import { CodeTabs } from "/home/batyr_ashim/Рабочий стол/Diploma/client/tennis/vuepress-starter/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "/home/batyr_ashim/Рабочий стол/Diploma/client/tennis/vuepress-starter/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "/home/batyr_ashim/Рабочий стол/Diploma/client/tennis/vuepress-starter/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
