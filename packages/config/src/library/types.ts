/*
 * Every plugin accepts a generic config `C`, and an `expandConfig` function to expand `C`.
 * To distinguish plugins from each other in TypeScript, they also define a unique `id` string.
 */
export interface MudPlugin {
  id: string;
  expandConfig: (config: any) => any;
}

/**
 * The core config only expects a map of plugins.
 * The config is later expanded by calling the expandConfig method of each
 * plugin in order of appearance in the map. We use a map instead of an array,
 * because it makes it easier to type check for the existence of expected
 * plugins in the map. Object keys order is guaranteed since ES2015, see
 * https://www.stefanjudis.com/today-i-learned/property-order-is-predictable-in-javascript-objects-since-es2015/
 */
export type Config = { plugins: Plugins };
export type Plugins = Record<string, MudPlugin>;

/*
 * Helper type to turn a strongly typed config into a union of
 * all `expandConfig` functions defined in the config
 *
 * Usage:
 * ```
 * const _typedExpandConfig = expandConfig as ExpandConfig<typeof config>;
 * type ExpandedConfig = MergeReturnType<typeof _typedExpandConfig<typeof config>>;
 * const expandedConfig = expandConfig(config) as ExpandedConfig;
 * ```
 */
export type ExpandConfig<C extends { plugins: Plugins }> = C["plugins"][keyof C["plugins"]]["expandConfig"];
