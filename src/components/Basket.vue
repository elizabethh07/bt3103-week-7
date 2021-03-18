<template>
  <div id="app">
    <div id="shoppingBasket">
    Menu: <br>
    <ul>
      <li id="lst"  v-for="item in itemsSelected" v-bind:key="item.name">     
      {{item[0]}} x {{item[1]}}
      </li>
    </ul>
    <button id="calc" type="button" v-on:click="findTotal(), sendOrder()"> Add Order </button>
    <p v-show="clicked"> Subtotal: ${{subtotal}} <br><br> Grand Total: ${{total}}</p>
    </div>
  </div>
</template>

<script>
import database from '../firebase.js'

export default {
  name: 'Basket',
  props: {
    itemsSelected: {type:Array}
  },
  data() {
    return {
      subtotal:0,
      total:0,
      clicked:false,
      lst:[]
    }
  },
  methods: {
      
    fetchItems: function() {
        database.collection("menu").get().then((snapshot) => {
            snapshot.docs.forEach((doc) => {
            this.lst.push(doc.data().name);
          });
        });
     },

    findTotal: function(){
      this.subtotal = 0;
      if(this.itemsSelected.length > 0) {
        for(let i = 0; i < this.itemsSelected.length; i++){
          this.subtotal += this.itemsSelected[i][1] * this.itemsSelected[i][2]
        }
      }
      this.clicked = true
    },
  sendOrder: function() {
      var order = {}
      if(this.itemsSelected.length > 0) {
        for(let i = 0; i < this.itemsSelected.length; i++) {
            var item = this.itemsSelected[i]
            order[item[0]] = item[1]
        }
        // loop thru to fill in order with 0 qty
        for(let j = 0; j < this.lst.length; j++) {
            if(!(this.lst[j] in order)) {
                order[this.lst[j]] = 0
            }
        }

        database.collection('orders').add(order).then(() => {location.reload()})
      }
  }
},

  watch:{
    subtotal:function(val) {
      this.total = (1.07 * val).toFixed(2) //fixed amount to 2dp
    }
  },
  created() {
      this.fetchItems()
  }
}

</script>

<style>
#lst {
  list-style-type: disc;
  color:black;
  border: none; 
}
#calc {
  text-align: center;
  background-color:pink;
  font-size: 20px;
  width:130px;
  height: 40px;
  border-radius: 10%;
}

</style>