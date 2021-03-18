<template>
  <div id="app">
    <button type="button" v-on:click='decrement'>-</button>   
    <span id="counter"> {{counter}} </span>
    <button type="button" v-on:click='increment'>+</button>
  </div>
</template>

<script>

export default {
  name: 'QuantityCounter',
  data() {
      return{
        counter:0,
      }
  },

  methods: {
      decrement: function() {
          if(this.counter > 0) {
            this.counter = this.counter - 1;
          }
          this.$emit('counter', this.item, this.counter);
      },
      increment: function() {
          if(this.counter >= 10) {
              alert("You cannot buy more than 10 items")
          } else {
            this.counter = this.counter + 1;
          }
          this.$emit('counter', this.item, this.counter);
      },
      
  },

  props: {
    item: Object,
  }
}
</script>

<style>
button {
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-align: center;
    background-color:pink;
    border-radius:10%;
    display: inline-block;
    font-size: 30px;
    width:30pt;
}
#counter {
  font-size: 35px;
}
</style>