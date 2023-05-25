<script>

    //get screen size
    $: innerWidth = 0;
    $: innerHeight = 0;
    $: login = true;
    
    let name = '';
    let pw = '';
    let cpw ='';
    let Name = "Username";

    function LOGIN(){
        console.log(name);
        console.log(pw);

    }

    function SIGNUP(){
        console.log(name);
        console.log(pw);

    }
	
</script>

<!--get screen size-->
<svelte:window bind:innerWidth bind:innerHeight />


<body class="flex">
    <!--space on left-->
    <div class="w-1/12 absolute h-full">
    </div>
    
    
    <!--actual space-->
    <div class="absolute ml-[8.6%] w-9/12 mt-14">
        <ul class="flex flex-wrap justify-center">
            <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-[560px] h-[260px] drop-shadow-xl ${login === true ? 'visible' : 'hidden'}`}>
                <img src="../navbar-jeep.png" alt="" class="absolute h-[250px] -right-[50px] top-[20px]">
                <button on:click={() => login=true} class={`absolute text-lg font-bold text-gray-200 left-10 top-[20px] ${login === true ? 'underline' : ''}`}>LOGIN</button>
                <button on:click={() => login=false} class={`absolute text-lg font-bold text-gray-200 left-32 top-[20px] ${login === false ? 'underline' : ''}`}>SIGN UP</button>
                <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[40px]">Username</h1>
                <input label={Name} class="absolute top-[90px] left-10" bind:value={name}>
                <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[120px]">Password</h1>
                <input label='Password' type='password'  class="absolute top-[170px] left-10" bind:value={pw}>
                <button on:click={LOGIN} class="absolute top-[210px] left-10 bg-white rounded"><h1 class="m-0.5">Submit</h1></button>
            </div>

            <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-[560px] h-[340px] drop-shadow-xl ${login === false ? 'visible' : 'hidden'}`}>
                <img src="../navbar-jeep.png" alt="" class="absolute h-[250px] -right-[50px] top-[20px]">
                <button on:click={() => login=true} class={`absolute text-lg font-bold text-gray-200 left-10 top-[20px] ${login === true ? 'underline' : ''}`}>LOGIN</button>
                <button on:click={() => login=false} class={`absolute text-lg font-bold text-gray-200 left-32 top-[20px] ${login === false ? 'underline' : ''}`}>SIGN UP</button>
                <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[40px]">Username</h1>
                <input label={Name} class="absolute top-[90px] left-10" bind:value={name}>
                <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[120px]">Password</h1>
                <input label='Password' type='password'  class="absolute top-[170px] left-10" bind:value={pw}>
                <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[200px]">Confirm Password</h1>
                <input label='Password' type='password'  class="absolute top-[250px] left-10" bind:value={cpw}>
                <button on:click={SIGNUP} class="absolute top-[290px] left-10 bg-white rounded"><h1 class="m-0.5">Submit</h1></button>
            </div>
        </ul>
    
    </div>
    
    <!--space on left-->
    <div class="w-2/12 absolute h-full right-0">
    </div>
    </body>