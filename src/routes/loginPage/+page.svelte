<script>
    import { onMount } from "svelte"
    import { global_isloggedin, global_username, activeOperation, activeTable } from "../../components/store.js"
    import CrudButtons from "./CrudButtons.svelte";
    import TableButtons from "./TableButtons.svelte";

    const DEV = false;
    const LOGIN_URL =   DEV ? 'http://localhost:8080/api/users/login' : 'https://jeeps-alt.onrender.com/api/users/login'
    const SIGNUP_URL =  DEV ? 'http://localhost:8080/api/users/signup' : 'https://jeeps-alt.onrender.com/api/users/signup'
    const JEEPNEY_URL = DEV ? 'http://localhost:8080/api/jeeps/jeepney' :  'https://jeeps-alt.onrender.com/api/jeeps/jeepney'
    const DRIVER_URL =  DEV ? 'http://localhost:8080/api/jeeps/driver' : 'https://jeeps-alt.onrender.com/api/jeeps/driver'
    const ROUTE_URL =   DEV ? 'http://localhost:8080/api/jeeps/route' : 'https://jeeps-alt.onrender.com/api/jeeps/route'

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
    let login;
    let isloggedin;
    global_isloggedin.subscribe(value => {
        isloggedin = value;
    });
    console.log("Is logged in?", isloggedin);

    //get screen size
    $: innerWidth = 0;
    $: innerHeight = 0;

    //declare and set values
    $: login = true;
    let username = '', email = '', pw = '', cpw = '', key = '';
    let pw_not_same = false, pw_is_cpw = false;

    $: modifiable = false;

    // TODO: Security considerations: API key, and removing console.logs
    function SIGNUP() {
        if (username === '' || email === '' || pw === '' || cpw === '') {
            alert("Blank fields are not allowed.")
            return
        }
        if (pw === cpw) {
            pw_not_same = false;
            let data = JSON.stringify({ username, email, password: pw, key })
            fetch(SIGNUP_URL, {
                method: "POST",
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then((res) => {
                if (res.status === 201){
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

    function LOGIN() {
        if (username === '' || pw === '') {
            alert("Blank fields are not allowed.")
            return
        }
        let data = JSON.stringify({ username, password: pw })
        fetch(LOGIN_URL, {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            if (res.status === 201){
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
        pw_is_cpw = pw === cpw && pw !== '' && cpw !== '';
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

    // Ready files object for receiving path files
    let files;

    // ADD
    let jadd_platenum, jadd_capacity, jadd_driverid, jadd_route;
    let jadd_route_radio = 1;
    let dadd_firstname, dadd_lastname;
    let radd_routename, radd_color;

    // MODIFY
    let jmod_id=1, jmod_platenum, jmod_capacity, jmod_routeid, jmod_driverid;
    let dmod_id=1, dmod_firstname, dmod_lastname;
    let rmod_id=1, rmod_name, rmod_color;

    // DELETE
    let jdel_id, ddel_id, rdel_id; // These are all IDs

    //to backend developers: pls fetch the actual data
    let jeepneys =[
        {platenum : 'IKT001', capacity : 18, routename : 'IKOT', driverid : 1, coords : '(x,y)'},
    ];
    let drivers = [
        {id: '1', firstname : 'yenzy', lastname : 'hebron'},
    ];
    let routes = [
        {routename: 'IKOT', color : 'yellow', path : '71693812892939710247197423786981270129679125'},
    ];

    // TODO: Make it so that when you click Route Name, you're gonna fetch the list of
    // available routes from the database. Use dropdown.
    function ADDJEEPNEY(){
        // Remember that jeepney coords is nullable
        // Form validation done at the backend
        let data = JSON.stringify({
            platenumber: jadd_platenum,
            capacity: jadd_capacity,
            driverid: jadd_driverid,
            routeid: jadd_route,
            routename: jadd_route,
            routeoption: jadd_route_radio
        })

        fetch(JEEPNEY_URL, {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            res.json().then(msg => alert(msg.message))
        })
    }

    function ADDDRIVER(){
        let data = JSON.stringify({
            firstname: dadd_firstname,
            lastname: dadd_lastname
        })

        fetch(DRIVER_URL, {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            res.json().then(msg => alert(msg.message))
        })
    }

    // PATH PARSER
    function PATHPARSER() {
        return new Promise(resolve => {
            let path = '';
            if (files) {
                let file = files[0]
                let reader = new FileReader()
                reader.readAsText(file)
                reader.onload = function(event) {
                    let csvdata = event.target.result.split('\n')[1];
                    let firstNumberIndex = csvdata.search(/\d/)
                    if (firstNumberIndex) {
                        console.log(firstNumberIndex)
                        csvdata = csvdata.slice(firstNumberIndex)
                        let lastNumberIndex = csvdata.indexOf(')')
                        csvdata = csvdata.slice(0, lastNumberIndex)
                        csvdata = csvdata.split(',')
                        csvdata.forEach((elem) => {
                            let coords = '(' + elem.trim().replace(' ', ',') + '),'
                            path = path + coords
                        })
                        path = '(' + path.slice(0,path.length-1) + ')'
                        console.log(path)
                        resolve(path)
                    } else {
                        alert("Path file doesn't have any numbers.")
                    }
                }
            } else {
                alert("No file added. Make sure to modify later with a proper path.");
                resolve(null);
            }
        })
    }
    async function ADDROUTE(){
        // Note that path is nullable
        const path = await PATHPARSER();
        fetch(ROUTE_URL, {
            method: "POST",
            body: JSON.stringify({
                name: radd_routename,
                color: radd_color,
                path: path
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            res.json().then(msg => alert(msg.message))
        })
    }

    function DELETEJEEPNEY(){
        fetch(JEEPNEY_URL + `/${jdel_id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            res.json().then(msg => alert(msg.message))
        })
    }

    function DELETEDRIVER(){
        fetch(DRIVER_URL + `/${ddel_id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            res.json().then(msg => alert(msg.message))
        })
    }

    function DELETEROUTE(){
        fetch(ROUTE_URL + `/${rdel_id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            res.json().then(msg => alert(msg.message))
        })
    }

    function checkUndef(s) {
        return (s === 'null') ? null : s;
    }

    function MODIFYJEEPNEY(){
        // Remember that jeepney coords is nullable
        // Form validation done at the backend
        let data = JSON.stringify({
            platenumber: jmod_platenum ? jmod_platenum : undefined,
            capacity: jmod_capacity ? jmod_capacity : undefined,
            driverid: jmod_driverid ? checkUndef(jmod_driverid) : undefined,
            routeid: jmod_routeid ? checkUndef(jmod_routeid) : undefined
        })

        fetch(JEEPNEY_URL + `/${jmod_id}`, {
            method: "PUT",
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            res.json().then(msg => alert(msg.message))
            if (res.status === 201) {
                jmod_platenum ? document.getElementById("jmod_platenum").placeholder=jmod_platenum : null;
                jmod_capacity ? document.getElementById("jmod_capacity").placeholder=jmod_capacity : null;
                jmod_driverid ? document.getElementById("jmod_driverid").textContent=jmod_driverid : null;
                jmod_routeid ? document.getElementById("jmod_routeid").textContent=jmod_routeid : null;
            }
        })
    }

    function MODIFYDRIVER(){
        let data = JSON.stringify({
            firstname: dmod_firstname,
            lastname: dmod_lastname
        })

        fetch(DRIVER_URL + `/${dmod_id}`, {
            method: "PUT",
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            res.json().then(msg => alert(msg.message))
        })
    }

    async function MODIFYROUTE(){
        // Note that path is nullable
        console.log(rmod_id)
        console.log(files)
        const path = files ? await PATHPARSER() : undefined;
        fetch(ROUTE_URL + `/${rmod_id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: rmod_name,
                color: rmod_color,
                path: path
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            res.json().then(msg => alert(msg.message))
        })
    }

    function FETCHJEEPNEY(){
        return new Promise(resolve => {
            fetch(JEEPNEY_URL).then((res) => {
                res.json().then((data) => {
                    console.log(data.ret)
                    resolve(data.ret)
                })
            })
        })
    }

    function FETCHDRIVER(){
        return new Promise(resolve => {
            fetch(DRIVER_URL).then((res) => {
                res.json().then((data) => {
                    console.log(data.ret)
                    resolve(data.ret)
                })
            })
        })
    }

    function FETCHROUTE(){
        return new Promise(resolve => {
            fetch(ROUTE_URL).then((res) => {
                res.json().then((data) => {
                    console.log(data.ret)
                    resolve(data.ret)
                })
            })
        })
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
                <form on:submit|preventDefault={LOGIN}>
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
                <form on:submit|preventDefault={SIGNUP}>
                    <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[40px]">Username</h1>
                    <input label='username' class="absolute top-[90px] left-10" bind:value={username}>
                    <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[120px]">Email</h1>
                    <input label='email' class="absolute top-[170px] left-10" bind:value={email}>
                    <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[200px]">Password</h1>
                    <input label='password' type='password' class={`absolute top-[250px] left-10 ${pw_is_cpw ? 'bg-green-200' : ''} ${pw_not_same ? 'bg-red-200' : ''}`}
                            on:click={reset_col} on:keyup={check_pass} bind:value={pw}>
                    <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[280px]">Confirm Password</h1>
                    <input label='confirm password' type='password'  class={`absolute top-[330px] left-10 ${pw_is_cpw ? 'bg-green-200' : ''} ${pw_not_same ? 'bg-red-200' : ''}`}
                            on:click={reset_col} on:keyup={check_pass} bind:value={cpw}>
                    <h1 class="absolute text-s text-gray-300 mt-5 mb-5 left-10 top-[360px]">Admin Key</h1>
                    <input label='admin key' type='password'  class={`absolute top-[410px] left-10`} bind:value={key}>
                    <button type="submit" class="absolute top-[450px] left-10 bg-white rounded"><h1 class="m-0.5">Submit</h1></button>
                </form>
            </div>
            </div>


            <!-- logged in -->
            <div class={`w-full ${isloggedin === true ? 'visible' : 'hidden'}`}>
                <!--Logout button -->
                <div class="flex justify-center">
                    <button data-sveltekit-preload-data="tap" on:click={() => LOGOUT()} class="mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-[100px] h-[50px] drop-shadow-xl flex justify-center text-white"><h1 class="m-0.5 mt-3">Logout</h1></button>
                </div>

                <!--LIST-->
                <div class="flex justify-center">
                <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-10/12 h-full drop-shadow-xl ${$activeOperation === "list" ? 'visible' : 'hidden'}`}>
                    <CrudButtons/>
                    <TableButtons/>

                    <div class="flex flex-wrap justify-center my-5">
                    {#if ($activeTable === "jeepneys")}
                        <div class="bg-white opacity-70 h-full w-9/12 rounded-xl">
                            {#await FETCHJEEPNEY() then jeepneys}
                                {#each jeepneys as jeepney}
                                    <div class="flex flex-wrap">
                                        <p class="mx-12 mt-2">Jeepney ID : {jeepney.id}</p>
                                        <p class="mx-12 mt-2">Plate Number : {jeepney.platenumber}</p>
                                        <p class="ml-12 mt-2">Capacity : {jeepney.capacity}</p>
                                        <p class="ml-12 mt-2">Driver: {jeepney.Driver ? `${jeepney.Driver.firstname} ${jeepney.Driver.lastname}` : 'Undefined'}</p>
                                        <p class="ml-12 mt-2">Route: {jeepney.Route ? jeepney.Route.name : 'Undefined'}</p>
                                        <p class="ml-12 mt-2">Coords : {jeepney.coords ? `(${jeepney.coords.x}, ${jeepney.coords.y})` : 'Undefined'}</p>
                                    </div>
                                    <div class='bg-navbar-main-color w-full h-0.5 mt-2'></div>
                                {/each}
                            {/await}
                        </div>
                    {:else if ($activeTable === "drivers")}
                        <div class="bg-white opacity-70 h-full w-9/12 rounded-xl">
                            {#await FETCHDRIVER() then drivers}
                                {#each drivers as driver}
                                    <div class="flex flex-wrap">
                                        <p class="mx-12 mt-2">Driver ID : {driver.id}</p>
                                        <p class="ml-12 mt-2">Name : {driver.lastname}, {driver.firstname}</p>
                                    </div>
                                    <div class='bg-navbar-main-color w-full h-0.5 mt-2'></div>
                                {/each}
                            {/await}
                        </div>
                    {:else}
                        <div class="bg-white opacity-70 h-full w-9/12 rounded-xl">
                            {#await FETCHROUTE() then routes}
                                {#each routes as route}
                                    <div class="flex flex-wrap">
                                        <p class="mx-12 mt-2">Route ID : {route.id}</p>
                                        <p class="mx-12 mt-2">Route Name : {route.name}</p>
                                        <p class="ml-12 mt-2">Color : {route.color}</p>
                                        <p class="ml-12 mt-2">Path :
                                            <a class="underline text-blue-800" href={decodeURI(encodeURI(ROUTE_URL +`/${route.id}`))}>Download</a>
                                        </p>
                                    </div>
                                    <div class='bg-navbar-main-color w-full h-0.5 mt-2'></div>
                                {/each}
                            {/await}
                        </div>
                    {/if}
                    </div>

                </div>
                </div>

                <!--ADD  -->
                <div class="flex justify-center">
                    <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-10/12 h-full drop-shadow-xl ${$activeOperation === "add" ? 'visible' : 'hidden'}`}>
                    <CrudButtons/>
                    <TableButtons/>
                    <div class="flex flex-wrap justify-center my-5">
                    {#if ($activeTable === "jeepneys")}
                        <div class="flex flex-wrap justify-center my-5">
                            <form on:submit|preventDefault={ADDJEEPNEY}>
                                <h1 class="text-s text-gray-300 mt-5 ml-5">Plate Number</h1>
                                <input class="mt-3 ml-5" bind:value={jadd_platenum}>
                                <h1 class="text-s text-gray-300 mt-5 ml-5">Capacity</h1>
                                <input  class="mt-3 ml-5" bind:value={jadd_capacity}>
                                <h1 class="text-s text-gray-300 mt-5 ml-5">Driver ID</h1>
                                <input class="mt-3 ml-5" bind:value={jadd_driverid}>
                                <h1 class="text-s text-gray-300 mt-5 ml-5">Route</h1>
                                <div class="flex gap-10">
                                    <div class="inline-flex items-center">
                                        <label class="relative flex cursor-pointer items-center rounded-full p-3" for="jadd_route_id" data-ripple-dark="true">
                                            <input id="jadd_route_id" name="jadd_route" type="radio" bind:group={jadd_route_radio} value={1}
                                                   class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"/>
                                            <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                                </svg>
                                            </div>
                                        </label>
                                        <label class="mt-px cursor-pointer select-none font-light text-white" for="jadd_route_id">
                                            Route ID
                                        </label>
                                    </div>
                                    <div class="inline-flex items-center">
                                        <label class="relative flex cursor-pointer items-center rounded-full p-3" for="jadd_route_name" data-ripple-dark="true">
                                            <input id="jadd_route_name" name="jadd_route" type="radio" bind:group={jadd_route_radio} value={2}
                                                   class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"/>
                                            <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                                </svg>
                                            </div>
                                        </label>
                                        <label class="mt-px cursor-pointer select-none font-light text-white" for="jadd_route_name">
                                            Route Name
                                        </label>
                                    </div>
                                </div>
                                <input class="mt-3 ml-5" bind:value={jadd_route}>
                                <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">ADD</h1></button>
                            </form>

                        </div>
                    {:else if ($activeTable === "drivers")}
                    <div class="flex flex-wrap justify-center my-5">
                        <form on:submit|preventDefault={ADDDRIVER}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">First Name</h1>
                            <input class="mt-3 ml-5" bind:value={dadd_firstname}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Last Name</h1>
                            <input  class="mt-3 ml-5" bind:value={dadd_lastname}>
                            <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">ADD</h1></button>
                        </form>
                        </div>
                    {:else}
                    <div class="flex flex-wrap justify-center my-5">
                        <form on:submit|preventDefault={ADDROUTE}>
                            <h1 class="text-s text-gray-300 mt-5 ml-20">Route Name</h1>
                            <input class="mt-3 ml-20" bind:value={radd_routename}>
                            <h1 class="text-s text-gray-300 mt-5 ml-20">Color (example: #ffcd32)</h1>
                            <input class="mt-3 ml-20" bind:value={radd_color}>
                            <h1 class="text-s text-gray-300 mt-5 ml-20">Upload a Path file (.csv)</h1>
                            <label class="text-s text-gray-300 mt-5 ml-20">Use exports from <a href="https://google.com/maps/d/u/0/">google.com/maps/d/u/0/</a></label>
                            <input type="file" accept="text/csv" class="mt-3 ml-20 align-evenly text-gray-300" bind:files>
                            <button type="submit" class="bg-white rounded"><h1 class="m-0.5">ADD</h1></button>
                        </form>
                        </div>
                    {/if}
                    </div>
                </div>
                </div>

                <!--DELETE  -->
                <div class="flex justify-center">
                <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-10/12 h-full drop-shadow-xl ${$activeOperation === "delete" ? 'visible' : 'hidden'}`}>
                    <CrudButtons/>
                    <TableButtons/>
                    <div class="flex flex-wrap justify-center my-5">
                    {#if ($activeTable === "jeepneys")}
                        <div class="flex flex-wrap justify-center my-5">
                            <form on:submit|preventDefault={DELETEJEEPNEY}>
                                <h1 class="text-s text-gray-300 mt-5 ml-5">Jeepney ID</h1>
                                <input class="mt-3 ml-5" bind:value={jdel_id}>
                                <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">DELETE</h1></button>
                            </form>

                        </div>
                    {:else if ($activeTable === "drivers")}
                    <div class="flex flex-wrap justify-center my-5">
                        <form on:submit|preventDefault={DELETEDRIVER}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Driver ID</h1>
                            <input class="mt-3 ml-5" bind:value={ddel_id}>
                            <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">DELETE</h1></button>
                        </form>
                        </div>
                    {:else}
                    <div class="flex flex-wrap justify-center my-5">
                        <form on:submit|preventDefault={DELETEROUTE}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Route ID</h1>
                            <input class="mt-3 ml-5" bind:value={rdel_id}>
                            <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">DELETE</h1></button>
                        </form>
                        </div>
                    {/if}
                    </div>
                </div>
                </div>

                <!--MODIFY  -->
                <div class="flex justify-center">
                    <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-10/12 h-full drop-shadow-xl ${$activeOperation === "modify" ? 'visible' : 'hidden'}`}>
                        <CrudButtons/>
                        <TableButtons/>
                    <div class="flex flex-wrap justify-center my-5">
                    {#if ($activeTable === "jeepneys")}
                        <div class="flex flex-wrap justify-center my-5">
                            <form on:submit|preventDefault={MODIFYJEEPNEY}>
                                <!--<input on:keydown={FETCHJEEPNEY(mplatenum)} class="mt-3 ml-5" bind:value={mplatenum}>-->
                                {#await FETCHJEEPNEY() then jeepneys}
                                    <h1 class="text-s text-gray-300 mt-5 ml-5">Jeepney ID (required)</h1>
                                    <select class="mt-3 ml-5" bind:value={jmod_id} on:change={() => console.log(jmod_id)}>
                                        {#each jeepneys as jeepney}
                                            <option value="{jeepney.id}">{jeepney.id}</option>
                                        {/each}
                                    </select>
                                    {#await jeepneys.find(jeep => jeep.id === jmod_id) then jeep}
                                        <h1 class="text-s text-gray-300 mt-5 ml-5">Plate Number</h1>
                                        <input  class="mt-3 ml-5" bind:value={jmod_platenum} id="jmod_platenum" placeholder={jeep.platenumber}>
                                        <h1 class="text-s text-gray-300 mt-5 ml-5">Capacity</h1>
                                        <input  class="mt-3 ml-5" bind:value={jmod_capacity} id="jmod_capacity" placeholder={jeep.capacity}>
                                        <h1 class="text-s text-gray-300 mt-5 ml-5">Driver ID (current: <span id="jmod_driverid">{jeep.driverid}</span>)</h1>
                                        <select class="mt-3 ml-5" bind:value={jmod_driverid} on:change={() => {console.log(jmod_driverid)}}>
                                            {#await FETCHDRIVER() then drivers}
                                                {#each drivers as driver}
                                                    {#if driver.id === jeep.driverid}
                                                        <option value="{driver.id}" selected>{driver.id} - {driver.firstname} {driver.lastname}</option>
                                                    {:else}
                                                        <option value="{driver.id}">{driver.id} - {driver.firstname} {driver.lastname}</option>
                                                    {/if}
                                                {/each}
                                                {#if jeep.driverid === null}
                                                    <option value=null selected>None</option>
                                                {:else}
                                                    <option value=null>None</option>
                                                {/if}
                                            {/await}
                                        </select>
                                        <h1 class="text-s text-gray-300 mt-5 ml-5">Route ID (current: <span id="jmod_routeid">{jeep.routeid}</span>)</h1>
                                        <select class="mt-3 ml-5" bind:value={jmod_routeid} on:change={() => console.log(jmod_driverid)}>
                                            {#await FETCHROUTE() then routes}
                                                {#each routes as route}
                                                    {#if route.id === jeep.routeid}
                                                        <option value="{route.id}" selected>{route.id} - {route.name}</option>
                                                    {:else}
                                                        <option value="{route.id}">{route.id} - {route.name}</option>
                                                    {/if}
                                                {/each}
                                                {#if jeep.driverid === null}
                                                    <option value=null selected>None</option>
                                                {:else}
                                                    <option value=null>None</option>
                                                {/if}
                                            {/await}
                                        </select>
                                        <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">MODIFY</h1></button>
                                    {/await}
                                {/await}
                            </form>

                        </div>
                    {:else if ($activeTable === "drivers")}
                    <div class="flex flex-wrap justify-center my-5">
                        <form on:submit|preventDefault={MODIFYDRIVER}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Driver ID (required)</h1>
                            <input class="mt-3 ml-5" bind:value={dmod_id}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">First Name</h1>
                            <input class="mt-3 ml-5" bind:value={dmod_firstname}>
                            <h1 class="text-s text-gray-300 mt-5 ml-5">Last Name</h1>
                            <input  class="mt-3 ml-5" bind:value={dmod_lastname}>
                            <button type="submit" class="mt-3 ml-5 bg-white rounded"><h1 class="m-0.5">MODIFY</h1></button>
                        </form>
                        </div>
                    {:else}
                    <div class="flex flex-wrap justify-center my-5">
                        <form on:submit|preventDefault={MODIFYROUTE}>
                            <h1 class="text-s text-gray-300 mt-5 ml-20">Route ID (required)</h1>
                            <input class="mt-3 ml-20" bind:value={rmod_id}>
                            <h1 class="text-s text-gray-300 mt-5 ml-20">Name</h1>
                            <input class="mt-3 ml-20" bind:value={rmod_name}>
                            <h1 class="text-s text-gray-300 mt-5 ml-20">Color (example: #ffcd32)</h1>
                            <input class="mt-3 ml-20" bind:value={rmod_color}>
                            <h1 class="text-s text-gray-300 mt-5 ml-20">Upload an updated Path file (.csv)</h1>
                            <label class="text-s text-gray-300 mt-5 ml-20">Use exports from <a href="https://google.com/maps/d/u/0/">google.com/maps/d/u/0/</a></label>
                            <input type="file" accept="text/csv" class="mt-3 ml-20 align-evenly text-gray-300" bind:files>
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