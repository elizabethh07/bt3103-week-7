<template>
  <div id="app">
    <nav>
    <ul id="routes">
    <li> <router-link to="/" exact>Home</router-link> </li>
    <li> <router-link to="/orders" exact>Orders</router-link> </li>
    <li> <router-link to="/dashboard" exact>Dashboard</router-link> </li>
    </ul>
    </nav>
    <div>
      <bar-chart></bar-chart>
      <line-chart></line-chart>
    </div>
  </div> 
</template>

<script>

import BarChart from './charts/BarChart.vue';
import LineChart from './LineChart.vue';

export default {
  name: 'Dashboard',  
  components: {
      BarChart,
      LineChart
  },
  data() {
    return {
    }
  },

}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}


</style>