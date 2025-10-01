const app = require('express')();
const parser = require('body-parser');

// configuring the body-parser middleware
app.use(parser.json());

// creating a route/ endpoints for the backend server
app.get('/hi',async(req,res)=>{
    // res.send("<h1>Hello from the backend server</h1>");
    // res.status(200).send("<h1>Hello from the backend server</h1>")
    res.json({message: "Hello from the backend server"})
})

app.get('/exchange/:dollar',async(req,res)=>{
    let dol = req.params.dollar;
    let inr = dollar * 82;
    res.json({message: `${dol} dollar is equal to ${inr} inr`})
})

app.get('/bmi/:weight/:height',async(req,res)=>{
    let wt = req.params.weight;
    let ht = req.params.height/100;
    let bmi = wt / (ht * ht);
    let category = "";
    if(bmi < 18.5){
        category = "Underweight";
    }else if(bmi >= 18.5 && bmi < 24.9){
        category = "Normal weight";
    }else if(bmi >= 25 && bmi < 29.9){
        category = "Overweight";
    }else{
        category = "Obesity";
    }
    res.json({message: `Your BMI is ${bmi} and you are categorized as ${category}`})
})

app.post('/body-bmi',async(req,res)=>{
    let wt = req.body.weight;
    let ht = req.body.height/100;
    let bmi = wt / (ht * ht);
    let category = "";
    if(bmi < 18.5){
        category = "Underweight";
    }else if(bmi >= 18.5 && bmi < 24.9){
        category = "Normal weight";
    }else if(bmi >= 25 && bmi < 29.9){
        category = "Overweight";
    }else{
        category = "Obesity";
    }
    res.json({message: `Your BMI is ${bmi} and you are categorized as ${category}`})
})

// configuring the backend server running port
app.listen(1234, ()=>{
    console.log("Server started at 1234");
})

