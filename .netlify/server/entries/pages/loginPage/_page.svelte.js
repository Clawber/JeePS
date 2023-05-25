import { c as create_ssr_component, d as add_attribute } from "../../../chunks/index.js";
let Name = "Username";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let name = "";
  let pw = "";
  return `



<body class="flex">
    <div class="w-1/12 absolute h-full"></div>
    
    
    
    <div class="absolute ml-[8.6%] w-9/12 mt-14"><ul class="flex flex-wrap justify-center"><div class="mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-[560px] h-[260px] drop-shadow-xl"><img src="../navbar-jeep.png" alt="" class="absolute h-[250px] -right-[50px] top-[20px]">
                <h1 class="absolute text-lg font-bold text-gray-200 left-10 top-[20px]">Login</h1>
                <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[40px]">Username</h1>
                <input${add_attribute("label", Name, 0)} class="absolute top-[90px] left-10"${add_attribute("value", name, 0)}>
                <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[120px]">Password</h1>
                <input label="Password" type="password" class="absolute top-[170px] left-10"${add_attribute("value", pw, 0)}>
                
                <button class="absolute top-[210px] left-10 bg-white rounded"><h1 class="m-0.5">Submit</h1></button></div></ul></div>
    
    
    <div class="w-2/12 absolute h-full right-0"></div></body>`;
});
export {
  Page as default
};
