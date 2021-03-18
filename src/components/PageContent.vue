<template>
  <div id="app">
      <nav>
          <ul id="routes" style ="width:70%">
          <li><router-link to="/" exact>Home</router-link></li>
          <li><router-link to="/" exact>Orders</router-link></li>
          <li> <router-link to="/dashboard" exact>Dashboard</router-link> </li>
          </ul>
          </nav>

    <div>
      <ul id="itemsList">
        <li  v-for="item in itemsList" v-bind:key="item.id">  
        <p id="itemName"> {{item.name}} </p>
        <img v-bind:src="item.imageURL"> 
        <p id="price">${{item.price}}</p>
        <QuantityCounter v-bind:item="item" v-on:counter="onCounter"></QuantityCounter>
        </li>
      </ul>
      </div>
      <Basket  v-bind:itemsSelected="itemsSelected"></Basket>
  </div> 
</template>

<script>
import QuantityCounter from './QuantityCounter'
import Basket from './Basket'
import database from '../firebase.js'

export default {
  name: 'PageContent',
   
  components: {
      QuantityCounter:QuantityCounter,
      Basket:Basket,
  },
  data(){
    return{
      itemsSelected:[], // create empty list
      itemsList:[],
    }
  },
  methods: {
    onCounter: function(item, count) {
      if(this.itemsSelected.length === 0 && count > 0) {
        //if there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count,item.price]);
      } else {
        for(let i = 0; i < this.itemsSelected.length; i++){
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];

          // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
          if(item_name == item.name && count > 0) {
            this.itemsSelected[i].splice(1,1,count); //update the count
            return;
          // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
          } else if(item_name == item.name && count == 0) {
            this.itemsSelected.splice(i,1);
            return; 
          // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
          } else if(i == this.itemsSelected.length - 1) {
            this.itemsSelected.push([item.name,count,item.price]);
          }
        } 
      }
    },
    fetchItems: function() { 
        database.collection('menu').get().then((snapshot) => {
            let item = {}
            snapshot.docs.forEach((doc) => {
                item = doc.data()
                this.itemsList.push(item)

                console.log(item);
            })
        })
    },
    },
    // use created lifecycle hook
    created() {
        this.fetchItems()
    }
}
</script>

<style>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 240px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}

</style>