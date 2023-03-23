<template>
  <!-- Basic Navbar with important links -->
  <v-toolbar color="primary" app id="nav-bar">
    <!-- Left Side -->
    <v-toolbar-items>
      <!-- Homepage link -->
      <v-btn to="/" class="white--text" flat>Diskover++</v-btn>
      <!-- Button for displaying GPS configuration modals -->
      <v-btn class="white--text" flat @click="openGpsModal">Configure GPS</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>

    <!-- Right Side -->
    <!-- Desktop Version -->
    <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
      <!-- JeePS link -->
      <v-btn href="http://127.0.0.1:5501/public/index.html" flat class="white--text">
        <span class="white--text">JeePS</span>
      </v-btn>
      <!--<a href="/C:\Users\Cielo\Desktop\JeePS-main\public\index.html" flat class="white--text">
        <span class="white--text">JeePS</span>
      </a>-->
      <!-- Map link -->
      <v-btn to="/map" flat class="white--text" @click="showFullMap">
        <span class="white--text">MAP</span>
      </v-btn>
      <!-- FAQs link -->
      <v-btn to="/faq" flat class="white--text">
        <span class="white--text">HELP</span>
      </v-btn>
      <AdminDropdown/>
    </v-toolbar-items>

    <!-- Mobile Version -->
    <v-toolbar-items v-else>
      <v-menu
        attach="#nav-bar"
        bottom
        left
        offset-y
        min-width="300px"
        z-index="1003"
        :close-on-content-click="false"
      >
        <v-toolbar-side-icon dark slot="activator" id="nav-dropdown-activator"/>
        <v-list id="nav-dropdown">
          <!-- JeePS link -->
          <v-btn href="http://127.0.0.1:5501/public/index.html" flat class="white--text">
            <span class="white--text">JeePS</span>
          </v-btn>
          <!-- Map link -->
          <v-list-tile to="/map" active-class="primary-text list-active">
              <v-list-tile-title class="white--text" @click="showFullMap">MAP</v-list-tile-title>
          </v-list-tile>
          <!-- FAQs link -->
          <v-list-tile to="/faq" active-class="primary-text list-active">
              <v-list-tile-title class="white--text">HELP</v-list-tile-title>
          </v-list-tile>
          
          <AdminDropdown/>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    // tuck sideDrawer In to show full map
    showFullMap() {
      this.$store.commit("setSideDrawer", false);
    },
    // trigger event for gps modals to react to and open
    openGpsModal() {
      this.$eventBus.$emit("open-gps-bottom-modal");
    }
  }
};
</script>

<style>
* {
  font-family: roboto, sans-serif;
}

#nav-dropdown {
  background-color: var(--v-primary-base) !important;
  overflow: visible !important;
}

.list-active {
  color: white !important;
  background-color: var(--v-primary-lighten1) !important;
}

#nav-bar {
  z-index: 1001 !important;
  padding-left: 0px !important;
}
</style>
