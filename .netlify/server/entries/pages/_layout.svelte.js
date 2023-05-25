import { c as create_ssr_component, b as subscribe, d as add_attribute, v as validate_component } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
const app = "";
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentRoute;
  let innerWidth;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  currentRoute = $page.url.pathname;
  innerWidth = 0;
  $$unsubscribe_page();
  return `



<nav${add_attribute("class", `bg-navbar-main-color min-w-full h-14 text-2xl text-white font-mono flex shadow-xl absolute z-20 ${innerWidth > 700 ? "w-screen" : "min-w-screen"}`, 0)}>
    <ul${add_attribute("class", `flex`, 0)}><li><a href="/"><div class="bg-white w-24 h-14 absolute"><img src="../jeeps-logo.png" alt="jeeps-logo" class="-mx-0.5"></div></a></li>

    
    
    <li class="ml-24"><a href="/"><div${add_attribute("class", `mt-3 h-full w-full bg-navbar-highlight-color bg-opacity-0 hover:bg-opacity-100  ${currentRoute === "/" ? "bg-opacity-100" : "bg-opacity-0"}`, 0)}><img src="../gray-tag.png" alt="gray-tag" class="w-24 -mt-3 ">
        <img src="../red-tag.png" alt="red-tag"${add_attribute("class", ` w-24 -mt-13.5  ${currentRoute === "/" ? "opacity-100" : "opacity-0"} `, 0)}>
        <h1 class="-my-10 mx-5">HOME</h1></div></a></li></ul>  


    <ul class="flex ml-auto"><li><img src="../navbar-jeep.png" alt="navbar-jeep"${add_attribute("class", `  w-38 h-24 -mt-5 ${innerWidth > 700 ? "opacity-100" : "opacity-0"} `, 0)}></li></ul>     

    <ul${add_attribute("class", `flex ${innerWidth > 700 ? "ml-auto" : ""}`, 0)}>
    <li><a href="/faqPage"><div${add_attribute(
    "class",
    `mt-3 h-full w-full bg-navbar-highlight-color hover:bg-navbar-highlight-color  ${currentRoute === "/faqPage" ? "bg-opacity-100" : "bg-opacity-0"}`,
    0
  )}><img src="../gray-tag.png" alt="gray-tag" class="w-24 -mt-3 ">
        <img src="../green-tag.png" alt="green-tag"${add_attribute(
    "class",
    ` w-24 -mt-13.5  ${currentRoute === "/faqPage" ? "opacity-100" : "opacity-0"}`,
    0
  )}>
        <h1 class="-my-10 mx-7">FAQ</h1></div></a></li>

    
    <li><a href="/aboutPage"><div${add_attribute(
    "class",
    `mt-3 h-full w-full bg-navbar-highlight-color bg-opacity-0 hover:bg-opacity-100 ${currentRoute === "/aboutPage" ? "bg-opacity-100" : "bg-opacity-0"}`,
    0
  )}><img src="../gray-tag.png" alt="gray-tag" class="w-24 -mt-3 ">
        <img src="../yellow-tag.png" alt="yellow-tag"${add_attribute(
    "class",
    ` w-24 -mt-13.5 ${currentRoute === "/aboutPage" ? "opacity-100" : "opacity-0"}`,
    0
  )}>
        <h1 class="-my-10 mx-3">ABOUT</h1></div></a></li>

    
    <li${add_attribute("class", `${innerWidth > 900 ? "visible" : "hidden"}`, 0)}><a href="/loginPage"><div${add_attribute(
    "class",
    `mt-3 h-full w-full bg-navbar-highlight-color bg-opacity-0 hover:bg-opacity-100 ${currentRoute === "/loginPage" ? "bg-opacity-100" : "bg-opacity-0"}`,
    0
  )}><img src="../gray-tag.png" alt="gray-tag" class="w-24 -mt-3 ">
        <img src="../blue-tag.png" alt="yellow-tag"${add_attribute(
    "class",
    ` w-24 -mt-13.5 ${currentRoute === "/loginPage" ? "opacity-100" : "opacity-0"}`,
    0
  )}>
        <h1 class="-my-10 mx-3">LOGIN</h1></div></a></li></ul></nav>
`;
});
const Pagebase = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `
<div class="bg-navbar-highlight-color w-1/12 h-full fixed flex left-0"></div>



<div class="bg-navbar-highlight-color opacity-30 w-full h-full fixed flex "></div>


<div class="bg-navbar-highlight-color w-2/12 h-full fixed flex right-0">
    <img src="../oblation.png" alt="oblation" class="fixed bottom-0 object-contain w-2/12 px-4 center hover:animate-bounce"></div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
${validate_component(Pagebase, "Pagebase").$$render($$result, {}, {}, {})}

${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
