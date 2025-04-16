// Config
const configModules = import.meta.glob("../../modules/**/config/app.js", { eager: true }); // prettier-ignore
// Routes
const globalRoutes = import.meta.glob("../routes/routes.js", { eager: true }); // prettier-ignore
const routeModules = import.meta.glob("../../modules/**/routes.js", { eager: true }); // prettier-ignore
// Locales
const globalLocales = import.meta.glob("../i18n/locales/*.json", { eager: true }); // prettier-ignore
const i18nModules = import.meta.glob("../../modules/**/i18n/*.json", { eager: true }); // prettier-ignore

const routes = [];
const i18n = {};

for (const path in globalRoutes) {
  const module = globalRoutes[path];
  if (module.default && Array.isArray(module.default)) {
    routes.push(...module.default);
  }
}

for (const path in globalLocales) {
  const lang = path.split("/").pop().replace(".json", "");
  i18n[lang] = i18n[lang] || {};
  Object.assign(i18n[lang], globalLocales[path].default);
}

for (const config in configModules) {
  const moduleConfig = configModules[config].default;
  if (!moduleConfig.enabled) continue;

  const routeFileName = `../../modules/${moduleConfig.name}/routes.js`;
  const routePath = routeModules[routeFileName];
  if (routePath) routes.push(...(routePath.default ?? []));

  if (moduleConfig.i18n) {
    for (const path in i18nModules) {
      const expectedPath = `/modules/${moduleConfig.name}/i18n/`;
      if (!path.includes(expectedPath)) continue;

      const lang = path.split("/").pop().replace(".json", "");
      const moduleName = moduleConfig.name.replace("-", "");
      const i18nClone = structuredClone(i18nModules[path].default);

      i18n[lang] = i18n[lang] || {};
      i18n[lang][moduleName] = {
        ...(i18n[lang][moduleName] || {}),
        ...i18nClone,
      };
    }
  }
}

export { routes, i18n };
