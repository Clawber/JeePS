<script>
    import { onMount } from "svelte"
    import { global_isloggedin, global_username } from "../../components/store.js"

    //save the value of global_isloggedin
    let savestore = false;
    $: if (savestore && $global_isloggedin) {
        window.sessionStorage.setItem("global_isloggedin", JSON.stringify($global_isloggedin));
    }
    
    onMount(async () => {
        let ses = window.sessionStorage.getItem("global_isloggedin");
        if (ses) {
            console.log("sob-- ~ loading ses", ses);
            $global_isloggedin = JSON.parse(ses);
        }
        savestore = true;
    })

    //check if currently logged in
    let isloggedin;
    global_isloggedin.subscribe(value => {
        isloggedin = value;
    });
    console.log(isloggedin);

    

    //get screen size
    $: innerWidth = 0;
    $: innerHeight = 0;


    //declare and set values
    $: login = true;
    let username = '', email = '', pw = '', cpw = '', key = '';
    let pw_not_same = false, pw_is_cpw = false;

    $: modifiable = false;    

    // replaced showlist, show add, boolean with the ff:
    $: activeOperation = "list"     // list, add delete or modify
    $: activeTable = "jeepneys"     // jeepneys, drivers, routes
    

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
            }).then((res) => {
            if (res.status == 201){
                global_isloggedin.set(true);
                global_username.set(username);
            }
            return res.text();
        }).then(data => alert(`${data}`));
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
        // }).then((res) => res.text()
        //  ).then(data => alert(`${data}`));
        // global_isloggedin.set(true);
        // global_username.set(username);
        }).then((res) => {
            if (res.status == 401){
                global_isloggedin.set(true);
                global_username.set(username);
            }
            return res.text()
        }).then(data => alert(`${data}`));
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

    function LOGOUT(){
        //set the value of global_isloggedin and global_username
        global_isloggedin.set(false);
        global_username.set('LOGIN');
        window.sessionStorage.setItem("global_isloggedin", JSON.stringify($global_isloggedin));
        async () => {
        let ses = window.sessionStorage.getItem("global_isloggedin");
        if (ses) {
            console.log("sob-- ~ loading ses", ses);
            $global_isloggedin = JSON.parse(ses);
        }
        }
        window.sessionStorage.setItem("global_username", JSON.stringify($global_isloggedin));
        async () => {
        let ses = window.sessionStorage.getItem("global_username");
        if (ses) {
            console.log("sob-- ~ loading ses", global_username);
            $global_username = JSON.parse(ses);
        }
        }
        savestore = true;

    }

    //add
    let jplatenum = '', jcapacity = '', jroutename = '', jdriverid = '';
    let did = '',dfirstname = '', dlastname;
    let rroutename = '', rcolor = '', rpath = '';
    //modify
    let mplatenum = '', mcapacity = '', mroutename = '', mdriverid = '';
    let mid = '',mfirstname = '', mlastname;
    let mroute = '', mcolor = '', mpath = '';
    //delete
    let delete_jeepney = '', delete_driver = '', delete_route= '';

    //to backend developers: pls fetch the actual data
    let jeepneys =[
        {platenum : 'IKT001', capacity : 18, routename : 'IKOT', driverid : 1, coords : '(x,y)'},
        {platenum : 'IKT001', capacity : 18, routename : 'IKOT', driverid : 1, coords : '(x,y)'},
        {platenum : 'IKT001', capacity : 18, routename : 'IKOT', driverid : 1, coords : '(x,y)'},
        {platenum : 'IKT001', capacity : 18, routename : 'IKOT', driverid : 1, coords : '(x,y)'},
        {platenum : 'IKT001', capacity : 18, routename : 'IKOT', driverid : 1, coords : '(x,y)'},
        {platenum : 'IKT001', capacity : 18, routename : 'IKOT', driverid : 1, coords : '(x,y)'},
        {platenum : 'IKT001', capacity : 18, routename : 'IKOT', driverid : 1, coords : '(x,y)'},
        {platenum : 'IKT001', capacity : 18, routename : 'IKOT', driverid : 1, coords : '(x,y)'},
        {platenum : 'IKT001', capacity : 18, routename : 'IKOT', driverid : 1, coords : '(x,y)'},
        {platenum : 'IKT001', capacity : 18, routename : 'IKOT', driverid : 1, coords : '(x,y)'},
        {platenum : 'IKT001', capacity : 18, routename : 'IKOT', driverid : 1, coords : '(x,y)'},
        {platenum : 'IKT001', capacity : 18, routename : 'IKOT', driverid : 1, coords : '(x,y)'}
    ];
    let drivers = [
        {id: '1', firstname : 'yenzy', lastname : 'hebron'},
        {id: '1', firstname : 'yenzy', lastname : 'hebron'},
        {id: '1', firstname : 'yenzy', lastname : 'hebron'}
    ];
    let routes = [
        {routename: 'IKOT', color : 'yellow', path : '71693812892939710247197423786981270129679125'},
        {routename: 'IKOT', color : 'yellow', path : '71693812892939710247197423786981270129679125'},
        {routename: 'IKOT', color : 'yellow', path : '71693812892939710247197423786981270129679125, 916279367891737912467138753812583178629'}

    ];

    function ADDJEEPNEY(){
        //to backend developers: pls add codes
    }
    
    function ADDDRIVER(){
        //to backend developers: pls add codes
    }

    function ADDROUTE(){
        //to backend developers: pls add codes
    }

    function DELETEJEEPNEY(){
        //to backend developers: pls add codes
    }

    function DELETEDRIVER(){
        //to backend developers: pls add codes
    }

    function DELETEROUTE(){
        //to backend developers: pls add codes
    }

    function MODIFYJEEPNEY(){
        //to backend developers: pls add codes
    }

    function MODIFYDRIVER(){
        //to backend developers: pls add codes
    }

    function MODIFYROUTE(){
        //to backend developers: pls add codes
    }

    function FETCHJEEPNEY(platenum){
        //to backend developers: pls add codes
        //if input is invalid, make sure to empty the value of jcapacity = '', jroutename = '', jdriverid = ''; dfirstname = '', dlastname; rcolor = '', rpath = '';
        console.log(platenum);
    }

    function FETCHDRIVER(){
        //to backend developers: pls add codes
    }

    function FETCHROUTE(){
        //to backend developers: pls add codes
    }

    function MODIFYCLEAR(){
        mplatenum = '', mcapacity = '', mroutename = '', mdriverid = '';
        mid = '',mfirstname = '', mlastname;
        mroute = '', mcolor = '', mpath = '';
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
            <!-- not logged in -->
            <div class={`${isloggedin === false ? 'visible' : 'hidden'}`}>
            <!-- Login Form -->
            <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-[560px] h-[260px] drop-shadow-xl ${login === true ? 'visible' : 'hidden'}`}>
                <img src="../navbar-jeep.png" alt="" class="absolute h-[250px] -right-[50px] top-[20px]">
                <button on:click={() => login=true} class={`absolute text-lg font-bold text-gray-200 left-10 top-[20px] ${login === true ? 'underline' : ''}`}>LOGIN</button>
                <button on:click={() => login=false} class={`absolute text-lg font-bold text-gray-200 left-32 top-[20px] ${login === false ? 'underline' : ''}`}>SIGN UP</button>
                <form on:submit|preventDefault={LOGIN(username, pw)}>
                    <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[40px]">Username</h1>
                    <input label='username' class="absolute top-[90px] left-10" bind:value={username}>
                    <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[120px]">Password</h1>
                    <input label='Password' type='password'  class="absolute top-[170px] left-10" bind:value={pw}>
                    <button type="submit" class="absolute top-[210px] left-10 bg-white rounded"><h1 class="m-0.5">Submit</h1></button>
                </form>
            </div>

            <!--Signup Form -->
            <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-[560px] h-[500px] drop-shadow-xl ${login === false ? 'visible' : 'hidden'}`}>
                <img src="../navbar-jeep.png" alt="" class="absolute h-[250px] -right-[50px] top-[20px]">
                <button on:click={() => login=true} class={`absolute text-lg font-bold text-gray-200 left-10 top-[20px] ${login === true ? 'underline' : ''}`}>LOGIN</button>
                <button on:click={() => login=false} class={`absolute text-lg font-bold text-gray-200 left-32 top-[20px] ${login === false ? 'underline' : ''}`}>SIGN UP</button>
                <form on:submit|preventDefault={SIGNUP(username, email, pw, cpw)}>    
                    <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[40px]">Username</h1>
                    <input label='username' class="absolute top-[90px] left-10" bind:value={username}>
                    <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[120px]">Email</h1>
                    <input label='email' class="absolute top-[170px] left-10" bind:value={email}>
                    <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[200px]">Password</h1>
                    <input label='Password' type='password' class={`absolute top-[250px] left-10 ${pw_is_cpw ? 'bg-green-200' : ''} ${pw_not_same ? 'bg-red-200' : ''}`}
                            on:click={reset_col} on:keyup={check_pass} bind:value={pw}>
                    <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[280px]">Confirm Password</h1>
                    <input label='Password' type='password'  class={`absolute top-[330px] left-10 ${pw_is_cpw ? 'bg-green-200' : ''} ${pw_not_same ? 'bg-red-200' : ''}`}
                            on:click={reset_col} on:keyup={check_pass} bind:value={cpw}>
                    <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[360px]">Admin Key</h1>
                    <input label='Password' type='password'  class={`absolute top-[410px] left-10`} on:click={reset_col} on:keyup={check_pass} bind:value={key}>
                    <button type="submit" class="absolute top-[450px] left-10 bg-white rounded"><h1 class="m-0.5">Submit</h1></button>
                </form>
            </div>
            </div>


            <!-- logged in -->
            <div class={`w-full ${isloggedin === true ? 'visible' : 'hidden'}`}>
                <!--Logout button -->
                <div class="flex justify-center">
                <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-[100px] h-[50px] drop-shadow-xl flex justify-center`}>
                    <button data-sveltekit-preload-data="tap" on:click={() => LOGOUT()} class="h-[30px] mt-[10px] bg-white rounded"><h1 class="m-0.5">Logout</h1></button>
                </div>
                </div>
                
                <!--Show list  -->
                <div class="flex justify-center">
                <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-10/12 h-full drop-shadow-xl ${activeOperation == "list" ? 'visible' : 'hidden'}`}>
                    <div class="flex flex-wrap justify-center">
                    <button on:click={() => {activeOperation = "list"}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "list" ? 'underline' : ''}`}>LIST</button>
                    <button on:click={() => {activeOperation = "add"}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "add" ? 'underline' : ''}`}>ADD</button>
                    <button on:click={() => {activeOperation = "delete"}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "delete" ? 'underline' : ''}`}>DELETE</button>
                    <button on:click={() => {activeOperation = "modify"; MODIFYCLEAR();}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "modify" ? 'underline' : ''}`}>MODIFY</button>
                    </div>

                    <div class="flex flex-wrap justify-center">
                        <button on:click={() => {activeTable = "jeepneys"}} class={`mx-10 text-lg font-bold text-gray-400 mt-5 ${(activeTable == "jeepneys") ? 'underline' : ''}`}>JEEPNEYS</button>
                        <button on:click={() => {activeTable = "drivers"}} class={`mx-10 text-lg font-bold text-gray-400 mt-5 ${(activeTable == "drivers") ? 'underline' : ''}`}>DRIVERS</button>
                        <button on:click={() => {activeTable = "routes"}} class={`mx-10 text-lg font-bold text-gray-400 mt-5 ${(activeTable == "routes") ? 'underline' : ''}`}>ROUTES</button>
                    </div>
                    <div class="flex flex-wrap justify-center my-5">
                        <!-- list of jeepneys -->
                    {#if (activeTable == "jeepneys")}
                        <div class="bg-white opacity-70 h-full w-9/12 rounded-xl">
                        {#each jeepneys as jeepney}
                            <div class="flex flex-wrap">
                            <p class="mx-12 mt-2">Plate Number : {jeepney.platenum}</p>
                            <p class="ml-12 mt-2">Driver ID : {jeepney.driverid}</p>
                            <p class="ml-12 mt-2">Capacity : {jeepney.capacity}</p>
                            <p class="ml-12 mt-2">Route : {jeepney.routename}</p>
                            <p class="ml-12 mt-2">GPS Coordinates : {jeepney.coords}</p>
                            </div>
                            <div class='bg-navbar-main-color w-full h-0.5 mt-2'></div>
                        {/each}
                        </div>
                        <!-- list of drivers -->
                    {:else if (activeTable == "drivers")}
                    <div class="bg-white opacity-70 h-full w-9/12 rounded-xl">
                        {#each drivers as driver}
                            <div class="flex flex-wrap">
                            <p class="mx-12 mt-2">Driver ID : {driver.id}</p>
                            <p class="ml-12 mt-2">Name : {driver.lastname}, {driver.firstname}</p>
                            </div>
                            <div class='bg-navbar-main-color w-full h-0.5 mt-2'></div>
                        {/each}
                        </div>
                        <!-- list of routes -->
                    {:else}
                    <div class="bg-white opacity-70 h-full w-9/12 rounded-xl">
                        {#each routes as route}
                            <div class="flex flex-wrap">
                            <p class="mx-12 mt-2">Route : {route.routename}</p>
                            <p class="ml-12 mt-2">Color : {route.color}</p>
                            <p class="ml-12 mt-2">Path : {route.path}</p>
                            </div>
                            <div class='bg-navbar-main-color w-full h-0.5 mt-2'></div>
                        {/each}
                        </div>
                    {/if}
                    </div>
                    
                </div>
                </div>

                <!--ADD  -->
                <div class="flex justify-center">
                    <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-10/12 h-full drop-shadow-xl ${activeOperation == "add" ? 'visible' : 'hidden'}`}>
                    <div class="flex flex-wrap justify-center">
                        <button on:click={() => {activeOperation = "list"}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "list" ? 'underline' : ''}`}>LIST</button>
                        <button on:click={() => {activeOperation = "add"}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "add" ? 'underline' : ''}`}>ADD</button>
                        <button on:click={() => {activeOperation = "delete"}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "delete" ? 'underline' : ''}`}>DELETE</button>
                        <button on:click={() => {activeOperation = "modify"; MODIFYCLEAR();}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "modify" ? 'underline' : ''}`}>MODIFY</button>
                    </div>
                    <div class="flex flex-wrap justify-center">
                        <button on:click={() => {activeTable = "jeepneys"}} class={`mx-10 text-lg font-bold text-gray-400 mt-5 ${(activeTable == "jeepneys") ? 'underline' : ''}`}>JEEPNEYS</button>
                        <button on:click={() => {activeTable = "drivers"}} class={`mx-10 text-lg font-bold text-gray-400 mt-5 ${(activeTable == "drivers") ? 'underline' : ''}`}>DRIVERS</button>
                        <button on:click={() => {activeTable = "routes"}} class={`mx-10 text-lg font-bold text-gray-400 mt-5 ${(activeTable == "routes") ? 'underline' : ''}`}>ROUTES</button>
                    </div>
                    <div class="flex flex-wrap justify-center my-5">
                        <!-- list of jeepneys -->
                    {#if (activeTable == "jeepneys")}
                        <div class="flex flex-wrap justify-center my-5">
                            <form on:submit|preventDefault={ADDJEEPNEY()}>
                                <h1 class="text-s text-gray-300 mt-5 ml-5">Plate Number</h1>
                                <input class="mt-3 ml-5" bind:value={jplatenum}>
                                <h1 class="text-s text-gray-300 mt-5 ml-5">Driver ID</h1>
                                <input class="mt-3 ml-5" bind:value={jdriverid}>
                                <h1 class="text-s text-gray-300 mt-5 ml-5">Capacity</h1>
                                <input  class="mt-3 ml-5" bind:value={jcapacity}>
                                <h1 class="text-s text-gray-300 mt-5 ml-5">Route</h1>
                                <input class="mt-3 ml-5" bind:value={jroutename}>
                                <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">ADD</h1></button>
                            </form>
                        
                        </div>
                        <!-- list of drivers -->
                    {:else if (activeTable == "drivers")}
                    <div class="flex flex-wrap justify-center my-5">
                        <form on:submit|preventDefault={ADDDRIVER()}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Driver ID</h1>
                            <input class="mt-3 ml-5" bind:value={did}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">First Name</h1>
                            <input class="mt-3 ml-5" bind:value={dfirstname}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Last Name</h1>
                            <input  class="mt-3 ml-5" bind:value={dlastname}>
                            <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">ADD</h1></button>
                        </form>
                        </div>
                        <!-- list of routes -->
                    {:else}
                    <div class="flex flex-wrap justify-center my-5">
                        <form on:submit|preventDefault={ADDROUTE()}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Route Name</h1>
                            <input class="mt-3 ml-5" bind:value={rroutename}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Color</h1>
                            <input class="mt-3 ml-5" bind:value={rcolor}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Path</h1>
                            <input  class="mt-3 ml-5" bind:value={rpath}>
                            <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">ADD</h1></button>
                        </form>
                        </div>
                    {/if}
                    </div>


                        
                </div>
                </div>

                <!--DELETE  -->
                <div class="flex justify-center">
                <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-10/12 h-full drop-shadow-xl ${activeOperation == "delete" ? 'visible' : 'hidden'}`}>
                    <div class="flex flex-wrap justify-center">
                        <button on:click={() => {activeOperation = "list"}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "list" ? 'underline' : ''}`}>LIST</button>
                        <button on:click={() => {activeOperation = "add"}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "add" ? 'underline' : ''}`}>ADD</button>
                        <button on:click={() => {activeOperation = "delete"}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "delete" ? 'underline' : ''}`}>DELETE</button>
                        <button on:click={() => {activeOperation = "modify"; MODIFYCLEAR();}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "modify" ? 'underline' : ''}`}>MODIFY</button>
                    </div>
                    <div class="flex flex-wrap justify-center">
                        <button on:click={() => {activeTable = "jeepneys"}} class={`mx-10 text-lg font-bold text-gray-400 mt-5 ${(activeTable == "jeepneys") ? 'underline' : ''}`}>JEEPNEYS</button>
                        <button on:click={() => {activeTable = "drivers"}} class={`mx-10 text-lg font-bold text-gray-400 mt-5 ${(activeTable == "drivers") ? 'underline' : ''}`}>DRIVERS</button>
                        <button on:click={() => {activeTable = "routes"}} class={`mx-10 text-lg font-bold text-gray-400 mt-5 ${(activeTable == "routes") ? 'underline' : ''}`}>ROUTES</button>
                    </div>
                    <div class="flex flex-wrap justify-center my-5">
                        <!-- list of jeepneys -->
                    {#if (activeTable == "jeepneys")}
                        <div class="flex flex-wrap justify-center my-5">
                            <form on:submit|preventDefault={DELETEJEEPNEY()}>
                                <h1 class="text-s text-gray-300 mt-5 ml-5">Plate Number</h1>
                                <input class="mt-3 ml-5" bind:value={delete_jeepney}>
                                <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">DELETE</h1></button>
                            </form>
                        
                        </div>
                        <!-- list of drivers -->
                    {:else if (activeTable == "drivers")}
                    <div class="flex flex-wrap justify-center my-5">
                        <form on:submit|preventDefault={DELETEDRIVER()}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Driver ID</h1>
                            <input class="mt-3 ml-5" bind:value={delete_driver}>
                            <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">DELETE</h1></button>
                        </form>
                        </div>
                        <!-- list of routes -->
                    {:else}
                    <div class="flex flex-wrap justify-center my-5">
                        <form on:submit|preventDefault={DELETEROUTE()}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Route Name</h1>
                            <input class="mt-3 ml-5" bind:value={delete_route}>
                            <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">DELETE</h1></button>
                        </form>
                        </div>
                    {/if}
                    </div>



                
                    
                </div>
                </div>



                <!--MODIFY  -->
                <div class="flex justify-center">
                    <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-10/12 h-full drop-shadow-xl ${activeOperation == "modify" ? 'visible' : 'hidden'}`}>
                    <div class="flex flex-wrap justify-center">
                        <button on:click={() => {activeOperation = "list"}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "list" ? 'underline' : ''}`}>LIST</button>
                        <button on:click={() => {activeOperation = "add"}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "add" ? 'underline' : ''}`}>ADD</button>
                        <button on:click={() => {activeOperation = "delete"}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "delete" ? 'underline' : ''}`}>DELETE</button>
                        <button on:click={() => {activeOperation = "modify"; MODIFYCLEAR();}} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "modify" ? 'underline' : ''}`}>MODIFY</button>
                    </div>
                    <div class="flex flex-wrap justify-center">
                        <button on:click={() => {activeTable = "jeepneys"}} class={`mx-10 text-lg font-bold text-gray-400 mt-5 ${(activeTable == "jeepneys") ? 'underline' : ''}`}>JEEPNEYS</button>
                        <button on:click={() => {activeTable = "drivers"}} class={`mx-10 text-lg font-bold text-gray-400 mt-5 ${(activeTable == "drivers") ? 'underline' : ''}`}>DRIVERS</button>
                        <button on:click={() => {activeTable = "routes"}} class={`mx-10 text-lg font-bold text-gray-400 mt-5 ${(activeTable == "routes") ? 'underline' : ''}`}>ROUTES</button>
                    </div>
                    <div class="flex flex-wrap justify-center my-5">
                        <!-- list of jeepneys -->
                    {#if (activeTable == "jeepneys")}
                        <div class="flex flex-wrap justify-center my-5">
                            <form on:submit|preventDefault={MODIFYJEEPNEY()}>
                                <h1 class="text-s text-gray-300 mt-5 ml-5">Plate Number (answer first)</h1>
                                <input on:keydown={FETCHJEEPNEY(mplatenum)} class="mt-3 ml-5" bind:value={mplatenum}>
                                <h1 class="text-s text-gray-300 mt-5 ml-5">Driver ID</h1>
                                <input class="mt-3 ml-5" bind:value={mdriverid}>
                                <h1 class="text-s text-gray-300 mt-5 ml-5">Capacity</h1>
                                <input  class="mt-3 ml-5" bind:value={mcapacity}>
                                <h1 class="text-s text-gray-300 mt-5 ml-5">Route</h1>
                                <input class="mt-3 ml-5" bind:value={mroutename}>
                                <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">MODIFY</h1></button>
                            </form>
                        
                        </div>
                        <!-- list of drivers -->
                    {:else if (activeTable == "drivers")}
                    <div class="flex flex-wrap justify-center my-5">
                        <form on:submit|preventDefault={MODIFYDRIVER()}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Driver ID (answer first)</h1>
                            <input on:keydown={FETCHDRIVER(mid)} class="mt-3 ml-5" bind:value={mid}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">First Name</h1>
                            <input class="mt-3 ml-5" bind:value={mfirstname}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Last Name</h1>
                            <input  class="mt-3 ml-5" bind:value={mlastname}>
                            <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">MODIFY</h1></button>
                        </form>
                        </div>
                        <!-- list of routes -->
                    {:else}
                    <div class="flex flex-wrap justify-center my-5">
                        <form on:submit|preventDefault={MODIFYROUTE()}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Route Name (answer first)</h1>
                            <input on:keydown={FETCHROUTE(mroute)} class="mt-3 ml-5" bind:value={mroute}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Color</h1>
                            <input class="mt-3 ml-5" bind:value={mcolor}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Path</h1>
                            <input  class="mt-3 ml-5" bind:value={mpath}>
                            <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">MODIFY</h1></button>
                        </form>
                        </div>
                    {/if}
                    </div>
                </div>
                </div>



            </div>
        </ul>
    
    </div>
    
    <!--space on left-->
    <div class="w-2/12 absolute h-full right-0">
    </div>
</body>