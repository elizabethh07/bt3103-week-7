<template>
  <div id="app">
      <nav>
        <ul id="routes" >
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/orders" exact>Orders</router-link></li>
        <li> <router-link to="/dashboard" exact>Dashboard</router-link> </li>
        </ul>
        </nav>

    <div>
      <ul>
          <li v-for="order in orders" v-bind:key="order.ids">
            <div style= "margin-left: 70%">
                <button class="button2" v-bind:id="order[0]" v-on:click="deleteItem($event)">Delete</button>
                <button class="button2 " v-bind:id="order[0]" v-on:click="route($event)">Modify</button>
            </div>
        <div id ="orderlst" v-for="(count, name) in order[1]" :key="count.index" >
            {{ name }} : {{ count }}
        </div>
        </li>
    </ul>
    </div> 
  </div>
</template>

<script>
import database from "../firebase.js"

export default {
    name: 'Orders',

    data() {
        return{
            orders:[]
        }
    },
    methods: {

    fetchItems: function() {
        database.collection('orders').get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                this.orders.push([doc.id, doc.data()])
            })
        })
    },

    deleteItem: function(event) {
        let doc_id = event.target.getAttribute("id")
        database.collection('orders').doc(doc_id).delete()
        .then(()=>{location.reload()});
    },
    
    route: function(event) {
        let doc_id = event.target.getAttribute("id")
        this.$router.push({name:"modify", params:{id:doc_id}})
    }
  },

    created() {
        this.fetchItems()
    }
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

.button2 {
  width: 65px;
  height: 30px;
  background-color: pink;
  border-radius: 10px;
  border-width: 1px;
  font-size: 14px;
}



</style>