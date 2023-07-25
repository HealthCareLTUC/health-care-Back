
const express=require('express')
const Doctor=require('../function/Doctorfunction')
 const RouteAxios=express.Router()
 const axios=require('axios')
 const Drugs =require('../function/Drugsfunction')
 










 RouteAxios.get('/searchDoc/:specialty', async (req, res, next) => {
    try {
        const specialty = req.params.specialty;
        const response = await axios.get(`https://abarham97.github.io/doctorAPI/doctor.json?specialty=${specialty}`);
        let doctorInfo = response.data.filter(e => {
            const doctorSpecialty = e.Specialty.toLowerCase();
            return !specialty || doctorSpecialty === specialty.toLowerCase();
          }).map(e => new Doctor(e["Provider Name"], e.City + " " + e.Address, e.Specialty, e["رقم الهاتف"], ""));
          
          res.send(doctorInfo);
        } catch (error) {
          next(`searchDoc route: ${error}`);
        }
      });





      RouteAxios.get('/searchDocN', async (req, res, next) => {
        try {
          const name = req.query.name;
          const response = await axios.get('https://abarham97.github.io/doctorAPI/doctor.json', {
            params: {
              name: name 
            }
          });
          console.log("Response Data:", response.data); 
      
          let doctorInfo = response.data.filter(e => {
            const doctorName = e["Provider Name"].toLowerCase();
            console.log("Doctor Name:", doctorName); 
            return !name || doctorName.includes(name.toLowerCase());
          }).map(e => new Doctor(e["Provider Name"], e.City + " " + e.Address, e.Specialty, e["رقم الهاتف"], ""));
          console.log("Filtered Data:", doctorInfo); 
          res.send(doctorInfo);
        } catch (error) {
          next(`searchDoc route: ${error}`);
        }
      });



      RouteAxios.get(`/alldoctors`,async(req, res,next) =>{
      try{
        if (req.url == "/alldoctors") {
            let rawdata = await axios.get("https://abarham97.github.io/doctorAPI/doctor.json")
            let arr = []
            rawdata?.data.forEach(e => arr.push(new Doctor(e["Provider Name "], e.City + " " + e.Address, e.Specialty, e["رقم الهاتف"], "")));
            // rawdata?.data.forEach(e => {
            //     if ((client.query(`SELECT * FROM doctor WHERE phone=$1`,e["رقم الهاتف"]) != e["رقم الهاتف"])) {
            //         client.query(`INSERT INTO doctor(name,location,Specialty,phone,appointment) VALUES($1,$2,$3,$4,$5) `, [e["الجهة الطـبية"], e.City + " " + e.Address, e.Specialty, e["رقم الهاتف"], ""]).then(() => { res.send(`the movie ${title} has been added to database`) })
            //     }
            // })
            res.status(200).send(arr)}

        }
catch (error){
    next(`alldoctors route:${error}`)
}


    }    )


    RouteAxios.get("/search/:drug", async (req, res) => {
        const search = {
            method: 'GET',
            url: `https://drug-info-and-price-history.p.rapidapi.com/1/druginfo`,
            params: { drug: `${req.params.drug}` },
            headers: {
                'X-RapidAPI-Key': 'e9b52e44acmsh2391d840688a166p1ca125jsnf9fd519eee2e',
                'X-RapidAPI-Host': 'drug-info-and-price-history.p.rapidapi.com'
            }
        };
    
        try {
            const response = await axios.request(search);
            //     console.log(response.data);
            let drug = new Drugs(req.params.drug, response.data[0].generic_name, response.data[0].brand_name, response.data[0].dosage_form, response.data[0].pharm_class)
            res.send(drug);
            // res.send(response.data[0].generic_name);
        } catch (error) {
            console.error(error);
        }
    })


    module.exports=RouteAxios