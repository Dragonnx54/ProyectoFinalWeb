<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" id="nav">
      <b-navbar-nav align="center" class="flex-grow-1" variant="ligth">
        <b-nav-item to="/">Inicio</b-nav-item>
        <b-nav-item to="/categorias/">Categorias</b-nav-item>
        <b-nav-item to="/personal/">Personal</b-nav-item>
        <b-nav-item to="/tickets/">Tickets</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view class="container mt-3" />
    <notifications position="bottom right" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  /* background-color:#273649 ; */
  background-color:darkslategrey ;
}

#nav {
  /* padding: 30px; */
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
*{
  color:black;
}
</style>
