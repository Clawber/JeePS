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


<nav class={`bg-navbar-main-color min-w-full h-14 text-2xl text-white font-mono flex shadow-xl absolute z-20 ${innerWidth > 700 ? 'w-screen' : 'min-w-screen'}`}>
    <!--Logo-->
    <ul class={`flex`}>

    <li>
    <a href="/">
    <div class="bg-white w-24 h-14 absolute">
            <img src="../jeeps-logo.png" alt="jeeps-logo" class="-mx-0.5">
    </div>
    </a>
    </li>

    
    <!--Home Link-->
    <li class="ml-24">
    <a href="/" >
    <div class={`mt-3 h-full w-full bg-navbar-highlight-color bg-opacity-0 hover:bg-opacity-100  ${currentRoute === '/' ? 'bg-opacity-100' : 'bg-opacity-0'}`} >
        <img src="../gray-tag.png" alt="gray-tag" class="w-24 -mt-3 ">
        <img src="../red-tag.png" alt="red-tag" class={` w-24 -mt-13.5  ${currentRoute === '/' ? 'opacity-100' : 'opacity-0'} `}>
        <h1 class="-my-10 mx-5">HOME</h1>
    </div>
    </a>
    </li>  
    </ul>  


    <ul class="flex ml-auto">
    <li>
        <img src="../navbar-jeep.png" alt="navbar-jeep" class={`  w-38 h-24 -mt-5 ${innerWidth > 700 ? 'opacity-100' : 'opacity-0'} `}>
    </li>  
    </ul>     

    <ul class={`flex ${innerWidth > 700 ? 'ml-auto' : ''}`}>
    <!--FAQ Link-->
    <li>
    <a href="/faqPage">
    <div class={`mt-3 h-full w-full bg-navbar-highlight-color hover:bg-navbar-highlight-color  ${currentRoute === '/faqPage' ? 'bg-opacity-100' : 'bg-opacity-0'}`} >
        <img src="../gray-tag.png" alt="gray-tag" class="w-24 -mt-3 ">
        <img src="../green-tag.png" alt="green-tag" class={` w-24 -mt-13.5  ${currentRoute === '/faqPage' ? 'opacity-100' : 'opacity-0'}`}>
        <h1 class="-my-10 mx-7">FAQ</h1>
    </div>
    </a>
    </li>

    <!--About Link-->
    <li>
    <a href="/aboutPage">
    <div class={`mt-3 h-full w-full bg-navbar-highlight-color bg-opacity-0 hover:bg-opacity-100 ${currentRoute === '/aboutPage' ? 'bg-opacity-100' : 'bg-opacity-0'}`} >
        <img src="../gray-tag.png" alt="gray-tag" class="w-24 -mt-3 ">
        <img src="../yellow-tag.png" alt="yellow-tag" class={` w-24 -mt-13.5 ${currentRoute === '/aboutPage' ? 'opacity-100' : 'opacity-0'}`}>
        <h1 class="-my-10 mx-3">ABOUT</h1>
    </div>
    </a>
    </li>

    </ul>
</nav>
<!--
<div class="bg-gray-400 fixed w-full h-1 mt-14 z-10"></div>
<div class="h-1 m-0"></div>

<div class="bg-navbar-main-color w-full fixed h-1 mt-14 z-10"></div>
<div class="h-1 m-0"></div>-->


