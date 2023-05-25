<script>

    //get screen size
    $: innerWidth = 0;
    $: innerHeight = 0;
    $: login = true;
    
    let username, email, password, confirmPassword;
    
    // TODO: ADD CLIENT-SIDE VALIDATION
    // TODO: ADD EMAIL FIELD
    // TODO: Security considerations: API key, and removing console.logs
    function SIGNUP(username, password, email, confirmPassword) {
        if (password === confirmPassword) {
            let data = JSON.stringify(username, email, password)
            fetch("https://jeeps-alt.onrender.com/api/users/signup", {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            }).then((res) => res.json())
            .then((json) => console.log(json))
        }
    }
    
    function LOGIN(username, password) {
        let data = JSON.stringify({ username, email, password })
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
            <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-[560px] h-[260px] drop-shadow-xl ${login === true ? 'visible' : 'hidden'}`}>
                <img src="../navbar-jeep.png" alt="" class="absolute h-[250px] -right-[50px] top-[20px]">
                <button on:click={() => login=true} class={`absolute text-lg font-bold text-gray-200 left-10 top-[20px] ${login === true ? 'underline' : ''}`}>LOGIN</button>
                <button on:click={() => login=false} class={`absolute text-lg font-bold text-gray-200 left-32 top-[20px] ${login === false ? 'underline' : ''}`}>SIGN UP</button>
                <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[40px]">Username</h1>
                <input label="username" class="absolute top-[90px] left-10" bind:value={username}>
                <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[120px]">Password</h1>
                <input label='password' type='password'  class="absolute top-[170px] left-10" bind:value={password}>
                <button on:click={LOGIN(username, password)} class="absolute top-[210px] left-10 bg-white rounded"><h1 class="m-0.5">Submit</h1></button>
            </div>

            <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-[560px] h-[340px] drop-shadow-xl ${login === false ? 'visible' : 'hidden'}`}>
                <img src="../navbar-jeep.png" alt="" class="absolute h-[250px] -right-[50px] top-[20px]">
                <button on:click={() => login=true} class={`absolute text-lg font-bold text-gray-200 left-10 top-[20px] ${login === true ? 'underline' : ''}`}>LOGIN</button>
                <button on:click={() => login=false} class={`absolute text-lg font-bold text-gray-200 left-32 top-[20px] ${login === false ? 'underline' : ''}`}>SIGN UP</button>
                <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[40px]">Username</h1>
                <input label="username" class="absolute top-[90px] left-10" bind:value={username}>
                <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[40px]">Email Address</h1>
                <input label="email" class="absolute top-[90px] left-10" bind:value={email}>
                <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[120px]">Password</h1>
                <input label='password' type='password'  class="absolute top-[170px] left-10" bind:value={password}>
                <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[200px]">Confirm Password</h1>
                <input label='confirmPassword' type='password'  class="absolute top-[250px] left-10" bind:value={confirmPassword}>
                <button on:click={SIGNUP(username, email, password, confirmPassword)} class="absolute top-[290px] left-10 bg-white rounded"><h1 class="m-0.5">Submit</h1></button>
            </div>
        </ul>
    
    </div>
    
    <!--space on left-->
    <div class="w-2/12 absolute h-full right-0">
    </div>
    </body>