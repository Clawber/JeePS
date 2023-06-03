<script>
    //get screen size
    $: innerWidth = 0;
    $: innerHeight = 0;

    let persons = [
		{name: 'Prinz Romeo O. Gan', email: 'pogan3@up.edu.ph', role:'Developer'},
        {name: 'Yenzy Urson S. Hebron', email: 'yshebron@up.edu.ph', role:'Developer'},
        {name: 'Carl David B. Ragunton', email: 'cbragunton@up.edu.ph', role:'Developer'},
        {name: 'John Erick S. Sarenas', email: 'jssarenas@up.edu.ph', role:'Developer'},
        {name: 'Dr. Ligaya Leah Lara-Figueroa', email: 'llfigueroa@up.edu.ph', role:'Instructor and Client'}
    ]
    let i = 0;

    function ALTERNATETAG(faq){
        let mod = i % 4;
        i+=1;
        let tag;
        if (mod ==0 ){
            tag = "../blue-tag-vibrant.png";
        }
        else if (mod == 1){
            tag = "../green-tag-vibrant.png";
        }
        else if (mod == 2){
            tag = "../yellow-tag-vibrant.png";
        }
        else if (mod == 3){
            tag = "../red-tag-vibrant.png";
        }
        return tag;
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

    <ul class={`flex flex-wrap justify-center`}>
        {#each persons as person}
        <div class={`mt-10 bg-navbar-main-color rounded-2xl opacity-80  min-h-full text-justify drop-shadow-xl ${innerWidth > 700 ? 'flex flex-wrap justify-center w-4/12 mx-11 flex-grow' : 'w-11/12 flex flex-wrap'}`}>
            <div class="min-w-full">
            <img src={ALTERNATETAG(person)} alt="" class="absolute w-16 -ml-2 -mt-5 drop-shadow-xl -rotate-12">
            <img src="../navbar-jeep.png" alt="" class="absolute w-32 right-0 top-2 drop-shadow-xl scale-x-[-1] flex-none">
            <h1 class="text-lg font-bold text-gray-200 mx-2 mt-16 flex justify-center">{person.name}</h1>
            <h1 class="text-s text-gray-300 mx-5 mt-5 mb-5 flex justify-center">{person.email}</h1>
            <h1 class="text-s text-gray-300 mx-5 mb-7 flex justify-center">{person.role}</h1>
            </div>  

        </div>
        {/each}
    </ul>

</div>

<!--space on left-->
<div class="w-2/12 absolute h-full right-0">
</div>
</body>