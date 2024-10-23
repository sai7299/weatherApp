const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const cron = require('node-cron');
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
//const APIKEY = 'a2c797172a2d4970e9a5de131fa36bfb';
const Mongodburl = "mongodb+srv://saieswar281:LJJJZJIbIkqFgNdv@cluster0.a35tp.mongodb.net/ProShop"
const weatherSchema = require("./weatherSchema")

const connectDb = async ()=>{
    try{
        const conn = await mongoose.connect(Mongodburl);
        console.log("mogodb connection successful");
    }catch(err){
        console.log("mogodb connection error");
        process.exit(1);
    }
} 
connectDb();
// Simple route for testing
const getData = async  () => {
    try{
       const response = await axios.get("http://api.openweathermap.org/data/2.5/group?id=1176734,1277333,1275004,1275339,1264527,1273294&units;=metric&appid=a2c797172a2d4970e9a5de131fa36bfb");
       const list = response?.data?.list
       let data = {
        hyderabad: [],
        bengaluru: [],
        delhi: [],
        kolkata: [],
        mumbai: [],
        chennai: []
    };
       list.forEach(element => {
        console.log('Processing element:', element); 
        const cityName = element.name.toLowerCase();
            if(data[cityName]){
                data[cityName].push(
                    {
                        weather: element.weather[0].description,
                        min_temp: element.main.temp_min,
                        max_temp: element.main.temp_max,
                        temp: element.main.temp,
                    }
                )
            }
       });
       console.log(data);
       await weatherSchema.create(data)
       return console.log("fetched successfully");

    }catch(err){
        return console.log("error in fetching");
    }
}
setInterval(getData,  5 * 60 * 1000);


app.get("/getData", async (req, res) => {
    try {
        const latestData = await weatherSchema.findOne().sort({ _id: -1 });
        console.log(latestData);
        return res.status(200).json({
            "status": "success",
            "data": latestData
        });
    } catch (err) {
        console.error("Error fetching latest data:", err);
        return res.status(500).send({ error: err.message });
    }
});
async function deletePreviousRecords() {
    const startOfYesterday = new Date();
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    startOfYesterday.setHours(0, 0, 0, 0); // Start of the previous day
  
    const endOfYesterday = new Date();
    endOfYesterday.setDate(endOfYesterday.getDate() - 1);
    endOfYesterday.setHours(23, 59, 59, 999); // End of the previous day
  
    try {
      const result = await weatherSchema.deleteMany({
        createdAt: { $gte: startOfYesterday, $lt: endOfYesterday }
      });
      console.log(`Deleted ${result.deletedCount} records from yesterday.`);
    } catch (error) {
      console.error('Error deleting records:', error);
    }
  }
cron.schedule('0 0 * * *', deletePreviousRecords);
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
// Server setup
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
