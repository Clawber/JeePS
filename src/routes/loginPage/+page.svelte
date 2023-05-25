<script>
    //get screen size
    $: innerWidth = 0;
    $: innerHeight = 0;
    $: login = true;
    
    let username = '', email = '', pw = '', cpw = '';
    let pw_not_same = false, pw_is_cpw = false;
    
    // TODO: COMPLETE CLIENT-SIDE VALIDATION (email and stuff)
    // TODO: Security considerations: API key, and removing console.logs
    function SIGNUP(username, email, pw, cpw) {
        if (username == '' || email == '' || pw == '' || cpw == '') {
            alert("Blank fields are not allowed.")
            return
        }
        if (pw === cpw) {
            pw_not_same = false;
            let data = JSON.stringify({ username, email, password: pw })
            fetch("https://jeeps-alt.onrender.com/api/users/signup", {
                method: "POST",
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then((res) => res.text()).then(data => {alert(`${data}`)})
        } else {
            pw_not_same = true;
            alert("Password and confirm password do not match.")
        }
    }
    
    function LOGIN(username, pw) {
        if (username == '' || pw == '') {
            alert("Blank fields are not allowed.")
            return
        }
        let data = JSON.stringify({ username, password: pw })
        fetch("https://jeeps-alt.onrender.com/api/users/login", {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => res.text()).then(data => alert(`${data}`))
    }

    function reset_col() {
        pw_not_same = false;
    }

    function check_pass() {
        if (pw === cpw && pw !== '' && cpw !== '') {
            pw_is_cpw = true;
        } else {
            pw_is_cpw = false;
        }
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
                {#if login === true}
                <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-[560px] h-[260px] drop-shadow-xl`}>
                    <form on:submit|preventDefault={LOGIN(username, pw)}>
                        <img src="../navbar-jeep.png" alt="" class="absolute h-[250px] -right-[50px] top-[20px]">
                        <button on:click={() => login=true} class={`absolute text-lg font-bold text-gray-200 left-10 top-[20px] ${login === true ? 'underline' : ''}`}>LOGIN</button>
                        <button on:click={() => login=false} class={`absolute text-lg font-bold text-gray-200 left-32 top-[20px] ${login === false ? 'underline' : ''}`}>SIGN UP</button>
                        <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[40px]">Username</h1>
                        <input label='username' class="absolute top-[90px] left-10" bind:value={username}>
                        <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[120px]">Password</h1>
                        <input label='Password' type='password'  class="absolute top-[170px] left-10" bind:value={pw}>
                        <button type="submit" class="absolute top-[210px] left-10 bg-white rounded"><h1 class="m-0.5">Submit</h1></button>
                    </form>
                </div>
                {:else}
                <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-[560px] h-[420px] drop-shadow-xl ${login === false ? 'visible' : 'hidden'}`}>
                    <form on:submit|preventDefault={SIGNUP(username, email, pw, cpw)}>    
                        <img src="../navbar-jeep.png" alt="" class="absolute h-[250px] -right-[50px] top-[20px]">
                        <button on:click={() => login=true} class={`absolute text-lg font-bold text-gray-200 left-10 top-[20px] ${login === true ? 'underline' : ''}`}>LOGIN</button>
                        <button on:click={() => login=false} class={`absolute text-lg font-bold text-gray-200 left-32 top-[20px] ${login === false ? 'underline' : ''}`}>SIGN UP</button>
                        <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[40px]">Username</h1>
                        <input label='username' class="absolute top-[90px] left-10" bind:value={username}>
                        <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[120px]">Email</h1>
                        <input label='email' class="absolute top-[170px] left-10" bind:value={email}>
                        <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[200px]">Password</h1>
                        <input label='Password' type='password' class={`absolute top-[250px] left-10 ${pw_is_cpw ? 'bg-green-200' : ''}
                            ${pw_not_same ? 'bg-red-200' : ''}`}
                            on:click={reset_col} on:keyup={check_pass} bind:value={pw}>
                        <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[280px]">Confirm Password</h1>
                        <input label='Password' type='password'  class={`absolute top-[330px] left-10 ${pw_is_cpw ? 'bg-green-200' : ''}
                            ${pw_not_same ? 'bg-red-200' : ''}`}
                            on:click={reset_col} on:keyup={check_pass} bind:value={cpw}>
                        <button type="submit" class="absolute top-[370px] left-10 bg-white rounded"><h1 class="m-0.5">Submit</h1></button>
                    </form>
                </div>
                {/if}
        </ul>
    
    </div>
    
    <!--space on left-->
    <div class="w-2/12 absolute h-full right-0">
    </div>
</body>