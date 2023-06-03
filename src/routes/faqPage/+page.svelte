<script>
    //get screen size
    $: innerWidth = 0;
    $: innerHeight = 0;
    
    let faqs = [
		{question: 'Why is the IKOT route only the route shown in the JeePS site?', answer: 'Other jeep routes go outside the vicinity of the university. It would be difficult to monitor all of their location. Furthermore, this project is on its prototype stage. Other routes and more jeepneys may be added if someone decides to continue this project.'},
        {question: 'How to navigate through the map?', answer: 'The map will be initialized to the position of the University of the Philippines. In package, you can zoom in and out using the buttons on the upper left of the map. You can also use the + and - buttons in the keyboard. For mobile devices, you can drag and pinch the map in order to traverse it' },
        {question: 'Is Project JeePS related to Diskover?', answer: 'JeePS is originally developed to be an extension of Diskover. Due to unforseen problems, it is now a standalone site that is connected to Diskover through a hyperlink.'},
        {question: 'Why is the IKOT route only the route shown in the JeePS site?', answer: 'Other jeep routes go outside the vicinity of the university. It would be difficult to monitor all of their location. Furthermore, this project is on its prototype stage. Other routes and more jeepneys may be added if someone decides to continue this project.'},
        {question: 'How to navigate through the map?', answer: 'The map will be initialized to the position of the University of the Philippines. In package, you can zoom in and out using the buttons on the upper left of the map. You can also use the + and - buttons in the keyboard. For mobile devices, you can drag and pinch the map in order to traverse it' },
        {question: 'Is Project JeePS related to Diskover?', answer: 'JeePS is originally developed to be an extension of Diskover. Due to unforseen problems, it is now a standalone site that is connected to Diskover through a hyperlink.'}
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

    <ul class="flex flex-wrap justify-center">
        {#each faqs as faq}
        <div class="mt-10 bg-navbar-main-color rounded-2xl opacity-80 w-11/12 min-h-full text-justify drop-shadow-xl">
            <img src={ALTERNATETAG(faq)} alt="" class="absolute w-16 -ml-2 -mt-5 drop-shadow-xl -rotate-12">
            <img src="../navbar-jeep.png" alt="" class="absolute w-32 right-0 top-2 drop-shadow-xl scale-x-[-1]">
            <h1 class="text-lg font-bold text-gray-200 mx-5 mt-16">{faq.question}</h1>
            <h1 class="text-s text-gray-300 mx-5 mt-5 mb-7">{faq.answer}</h1>

        </div>
        {/each}
    </ul>

</div>

<!--space on left-->
<div class="w-2/12 absolute h-full right-0">
</div>
</body>