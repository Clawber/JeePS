import { c as create_ssr_component, d as add_attribute, f as each, e as escape } from "../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let innerWidth;
  let persons = [
    {
      name: "Prinz Romeo O. Gan",
      email: "pogan3@up.edu.ph",
      role: "Developer"
    },
    {
      name: "Yenzy Urson S. Hebron",
      email: "yshebron@up.edu.ph",
      role: "Developer"
    },
    {
      name: "Carl David B. Ragunton",
      email: "cbragunton@up.edu.ph",
      role: "Developer"
    },
    {
      name: "John Erick S. Sarenas",
      email: "jssarenas@up.edu.ph",
      role: "Developer"
    },
    {
      name: "Dr. Ligaya Leah Lara-Figueroa",
      email: "llfigueroa@up.edu.ph",
      role: "Instructor and Client"
    }
  ];
  let i = 0;
  function ALTERNATETAG(faq) {
    let mod = i % 4;
    i += 1;
    let tag;
    if (mod == 0) {
      tag = "../blue-tag-vibrant.png";
    } else if (mod == 1) {
      tag = "../green-tag-vibrant.png";
    } else if (mod == 2) {
      tag = "../yellow-tag-vibrant.png";
    } else if (mod == 3) {
      tag = "../red-tag-vibrant.png";
    }
    return tag;
  }
  innerWidth = 0;
  return `


<body class="flex">
<div class="w-1/12 absolute h-full"></div>



<div class="absolute ml-[8.6%] w-9/12 mt-14"><ul${add_attribute("class", `flex flex-wrap justify-center`, 0)}>${each(persons, (person) => {
    return `<div${add_attribute(
      "class",
      `mt-10 bg-navbar-main-color rounded-2xl opacity-80  min-h-full text-justify drop-shadow-xl ${innerWidth > 700 ? "flex flex-wrap justify-center w-4/12 mx-11 flex-grow" : "w-11/12 flex flex-wrap"}`,
      0
    )}><div class="min-w-full"><img${add_attribute("src", ALTERNATETAG(), 0)} alt="" class="absolute w-16 -ml-2 -mt-5 drop-shadow-xl -rotate-12">
            <img src="../navbar-jeep.png" alt="" class="absolute w-32 right-0 top-2 drop-shadow-xl scale-x-[-1] flex-none">
            <h1 class="text-lg font-bold text-gray-200 mx-2 mt-16 flex justify-center">${escape(person.name)}</h1>
            <h1 class="text-s text-gray-300 mx-5 mt-5 mb-5 flex justify-center">${escape(person.email)}</h1>
            <h1 class="text-s text-gray-300 mx-5 mb-7 flex justify-center">${escape(person.role)}</h1></div>  

        </div>`;
  })}</ul></div>


<div class="w-2/12 absolute h-full right-0"></div></body>`;
});
export {
  Page as default
};
