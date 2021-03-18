<template>
  <div id="app">
    <div v-for="(count, name) in datapacket[0]" :key="count.index" >
        {{ name }} : {{ count }}
        <br><br>
        <input v-model="copy[name]"
          placeholder="0"
          type="number"
          min="0"
        /><br><br>
    </div>
    <button id="update" type="button" v-on:click="updateOrder()">Update Order</button>
  </div> 
</template>

<script>
import database from '../firebase.js'

export default {
  name: 'Modify',  
  
  data(){
    return{
       orderId:"",
       datapacket:[],
       lst:[],
       copy:{},
    }
  },
  methods: {
   fetchItems: function() {
        database.collection("orders").doc(this.orderId).get().then((snapshot) => {
            this.datapacket.push(snapshot.data())
        })
        database.collection("menu").get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
            this.lst.push(doc.data().name);
          });
        });
     },
    updateOrder: function() {
        if (Object.keys(this.copy).length == 0) {
            database.collection("orders").doc(this.orderId).delete()
        } else {
        //loop through to fill in order with zero quantity
            for(var i =0; i < this.lst.length; i++) {
                if(!(this.lst[i] in this.copy)) {
                    this.copy[this.lst[i]] = 0
                }
            }
            database.collection("orders").doc(this.orderId).set(this.copy);
        }
        this.$router.push({ path: "/orders" });
    }
    
  },
  created(){
    this.orderId = this.$route.params.id
    this.fetchItems()  
  }
}
</script>

<style scoped>
#update {
  text-align: center;
  background-color:pink;
  font-size: 16px;
  width:130px;
  height: 40px;
  border-radius: 10%;
}
</style>