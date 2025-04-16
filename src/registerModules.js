const configModules = import.meta.glob("./modules/**/config/app.js", { eager: true }); // prettier-ignore
const routeModules = import.meta.glob("./modules/**/routes.js", { eager: true }); // prettier-ignore
const globalLocales = import.meta.glob("./locales/*.json", { eager: true }); // prettier-ignore
const i18nModules = import.meta.glob("./modules/**/i18n/*.json", { eager: true }); // prettier-ignore

const routes = [];
const i18n = {};

for (const path in globalLocales) {
  const lang = path.split("/").pop().replace(".json", "");
  i18n[lang] = i18n[lang] || {};
  Object.assign(i18n[lang], globalLocales[path].default);
}

for (const config in configModules) {
  const moduleConfig = configModules[config].default;
  if (!moduleConfig.enabled) continue;

  const routePath = routeModules[`./modules/${moduleConfig.name}/routes.js`];
  if (routePath) routes.push(...(routePath.default ?? []));

  if (moduleConfig.i18n) {
    for (const path in i18nModules) {
      const lang = path.split("/").pop().replace(".json", "");
      const moduleName = moduleConfig.name.replace("-", "");
      Object.assign(i18n[lang], { [moduleName]: i18nModules[path].default });
    }
  }
}

export { routes, i18n };
