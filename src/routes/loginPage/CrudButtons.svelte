<script>
  import { activeOperation } from "../../components/store.js";

  function showList() {
    activeOperation.set("list")
  }

  function showAdd() {
    activeOperation.set("add")
  }

  function showDelete() {
    activeOperation.set("delete")
  }

  function showModify() {
    activeOperation.set("modify")
  }
</script>


<div class="flex flex-wrap justify-center">
  <button on:click={showList()} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "list" ? 'underline' : ''}`}>LIST</button>
  <button on:click={showAdd()} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "add" ? 'underline' : ''}`}>ADD</button>
  <button on:click={showDelete()} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "delete" ? 'underline' : ''}`}>DELETE</button>
  <button on:click={showModify()} class={`mx-10 text-lg font-bold text-gray-200 mt-5 ${activeOperation == "modify" ? 'underline' : ''}`}>MODIFY</button>
  <!-- modify clear bug -->
</div>

<!-- showModify(); MODIFYCLEAR(); -->