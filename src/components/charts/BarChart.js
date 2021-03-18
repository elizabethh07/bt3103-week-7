import {Bar} from 'vue-chartjs'
import database from '../../firebase.js';

export default {
    extends: Bar,
    data: function() {
        return {
            datacollection: {
                labels: ['Cereal Prawn', 'Dry Beef Hor Fun','Mapo Tofu','Pork Fried Rice', 'Prawn omelette', 'Sambal KangKung'],
                datasets: [
                { 
                label: 'Quantity',
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#F0E68C"],
                data: [0.5, 0, 0, 0, 0, 0],
                borderWidth:1.0,
                borderColor:"#000"
                }
            ]
            
          },
          
          options: {
            legend: { display: false },
            title:{
                  display:true,
                  text:'Total number of each dish',
                  fontColor:'Black',
                  fontSize:15
  
              },
              responsive: true,
              maintainAspectRatio: false,
              scales:{
                  yAxes:[{
                      ticks:{
                          min:0
                      }
                   }]
                   
              }
          }
        }  
    },
    methods: {
        fetchItems: function() {
          database.collection('orders').onSnapshot((snapshot) => {
              let order = {}
              snapshot.docs.forEach((doc) => {
                  order = doc.data()
                  let dataset = this.datacollection.datasets[0].data
                  dataset[0] += order["Cereal Prawn"]
                  dataset[1] += order["Dry Beef Hor Fun"]
                  dataset[2] += order["Mapo Tofu"]
                  dataset[3] += order["Pork Fried Rice"]
                  dataset[4] += order["Prawn omelette"]
                  dataset[5] += order["Sambal KangKung"]
              })
              this.renderChart(this.datacollection, this.options)
              console.log(this.datacollection.datasets[0].data)
          })
        },
    },
    created() {
        this.fetchItems()
    }
}