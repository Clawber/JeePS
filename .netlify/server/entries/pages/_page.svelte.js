import { c as create_ssr_component, o as onDestroy, d as add_attribute, v as validate_component } from "../../chunks/index.js";
const Map_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import 'leaflet/dist/leaflet.css';main.svelte-7514g div.svelte-7514g{height:800px}",
  map: null
};
const Map = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mapElement;
  onDestroy(async () => {
  });
  $$result.css.add(css);
  return `<main class="svelte-7514g"><div class="svelte-7514g"${add_attribute("this", mapElement, 0)}></div>
</main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="pt-14">${validate_component(Map, "LeafletMap").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
