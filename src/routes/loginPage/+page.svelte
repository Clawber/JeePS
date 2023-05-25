<script>

    //get screen size
    $: innerWidth = 0;
    $: innerHeight = 0;
    
    let username = '';
    let password = '';
    let Name = "Username";

    function SUBMIT(username, password) {
        let data = JSON.stringify({ username, password })
        fetch("https://jeeps-alt.onrender.com/api/users/login", {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => res.json())
        .then((json) => console.log(json))
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
            <div class="mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-[560px] h-[260px] drop-shadow-xl">
                <img src="../navbar-jeep.png" alt="" class="absolute h-[250px] -right-[50px] top-[20px]">
                <h1 class="absolute text-lg font-bold text-gray-200 left-10 top-[20px]">Login</h1>
                <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[40px]">Username</h1>
                <input label={Name} class="absolute top-[90px] left-10" bind:value={username}>
                <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[120px]">Password</h1>
                <input label='Password' type='password'  class="absolute top-[170px] left-10" bind:value={password}>
                <!-- <PasswordInput labelText={pw} placeholder="Password" class="absolute top-[80px] left-10" /> -->
                <button on:click={SUBMIT(username, password)} class="absolute top-[210px] left-10 bg-white rounded"><h1 class="m-0.5">Submit</h1></button>
        
            </div>
        </ul>
    
    </div>
    
    <!--space on left-->
    <div class="w-2/12 absolute h-full right-0">
    </div>
    </body>