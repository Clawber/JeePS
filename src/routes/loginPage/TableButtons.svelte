<script>
  import { activeTable } from "../../components/store.js";

  function jeepneysClick() {
    activeTable.set("jeepneys")
  }

  function driversClick() {
    activeTable.set("drivers")
  }

  function routesClick() {
    activeTable.set("routes")
  }
</script>


<div class="flex flex-wrap justify-center">
  <button on:click={() => {jeepneysClick()}} class={`mx-10 text-lg font-bold text-gray-400 mt-5 ${($activeTable == "jeepneys") ? 'underline' : ''}`}>JEEPNEYS</button>
  <button on:click={() => {driversClick()}} class={`mx-10 text-lg font-bold text-gray-400 mt-5 ${($activeTable == "drivers") ? 'underline' : ''}`}>DRIVERS</button>
  <button on:click={() => {routesClick()}} class={`mx-10 text-lg font-bold text-gray-400 mt-5 ${($activeTable == "routes") ? 'underline' : ''}`}>ROUTES</button>
</div>

<!-- showModify(); MODIFYCLEAR(); -->