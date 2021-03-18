import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [], //timestamp
            datasets: [
              { 
                label:"west",
                data:[],
                fill: false,
                borderColor:"red",
              }, 
              {
                label:"national",
                data:[],
                fill: false,
                borderColor:"orange",
              },
              { 
                label:"east",
                data:[],
                fill: false,
                borderColor:"yellow",
              }, 
              { 
                label:"central",
                data:[],
                fill: false,
                borderColor:"blue",
              }, 
              { 
                label:"south",
                data:[],
                fill: false,
                borderColor:"green",
              }, 
              { 
                label:"north",
                data:[],
                fill: false,
                borderColor:"purple",
              }
            ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            response.data.items.forEach(info => {
                let direction = info["readings"]["psi_twenty_four_hourly"]
                this.datacollection.datasets[0].data.push(direction["west"])
                this.datacollection.datasets[1].data.push(direction["national"])
                this.datacollection.datasets[2].data.push(direction["east"])
                this.datacollection.datasets[3].data.push(direction["central"])
                this.datacollection.datasets[4].data.push(direction["south"])
                this.datacollection.datasets[5].data.push(direction["north"])
                this.datacollection.labels.push(info["timestamp"])
            })
            this.renderChart(this.datacollection, this.options)
    })}
  },
  created () {
    this.fetchItems()
  }
}