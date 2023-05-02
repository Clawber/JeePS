<script>
    //get current route; to be used for knowing which link is active
    import { page } from "$app/stores";
    $:currentRoute = $page.url.pathname;

    //get screen size
    $: innerWidth = 0;
    $: innerHeight = 0;
    
</script>


<!--get screen size-->
<svelte:window bind:innerWidth bind:innerHeight />

<div>
<nav class="bg-navbar-main-color min-w-max w-full ml-0 mr-0 h-14 text-2xl text-white font-mono flex shadow-2xl absolute z-20">
    <!--Logo-->
    <div class="bg-white w-24 h-14 absolute">
        <img src="../src/assets/jeeps-logo.png" alt="jeeps-logo" class="-mx-0.5">
    </div>
    
    <!--Home Link-->
    <ul class="flex ml-24">
    <li class={`p-3 bg-navbar-highlight-color bg-opacity-0 hover:bg-opacity-100  ${currentRoute === '/' ? 'bg-opacity-100' : 'bg-opacity-0'}`} >
    <a href="/" >
        <img src="../src/assets/gray-tag.png" alt="gray-tag" class="w-24 -mt-3">
        <img src="../src/assets/red-tag.png" alt="red-tag" class={` w-24 -mt-13.5 ${currentRoute === '/' ? 'opacity-100' : 'opacity-0'} `}>
        <h1 class="-my-10 mx-5">HOME</h1>
    </a>
    </li>
    </ul>

    <ul class="flex mx-auto">
    <img src="../src/assets/navbar-jeep.png" alt="navbar-jeep" class={`  w-38 h-24 -mt-5 ${innerWidth > 700 ? 'opacity-100' : 'opacity-0'} `}>
    </ul>

    <ul class="flex ml-auto">
    <!--FAQ Link-->
    <li class={`p-3 bg-navbar-highlight-color hover:bg-navbar-highlight-color  ${currentRoute === '/faqPage' ? 'bg-opacity-100' : 'bg-opacity-0'}`} >
    <a href="/faqPage">
        <img src="../src/assets/gray-tag.png" alt="gray-tag" class="w-24 -mt-3">
        <img src="../src/assets/green-tag.png" alt="green-tag" class={` w-24 -mt-13.5 ${currentRoute === '/faqPage' ? 'opacity-100' : 'opacity-0'}`}>
        <h1 class="-my-10 mx-7">FAQ</h1>
    </a>
    </li>

    <!--About Link-->
    <li class={`p-3 bg-navbar-highlight-color bg-opacity-0 hover:bg-opacity-100 ${currentRoute === '/aboutPage' ? 'bg-opacity-100' : 'bg-opacity-0'}`} >
    <a href="/aboutPage">
        <img src="../src/assets/gray-tag.png" alt="gray-tag" class="w-24 -mt-3">
        <img src="../src/assets/yellow-tag.png" alt="yellow-tag" class={` w-24 -mt-13.5 ${currentRoute === '/aboutPage' ? 'opacity-100' : 'opacity-0'}`}>
        <h1 class="-my-10 mx-4">ABOUT</h1>
    </a>
    </li>
    </ul>
</nav>
<!--
<div class="bg-gray-400 fixed w-full h-1 mt-14 z-10"></div>
<div class="h-1 m-0"></div>

<div class="bg-navbar-main-color w-full fixed h-1 mt-14 z-10"></div>
<div class="h-1 m-0"></div>-->
</div>

