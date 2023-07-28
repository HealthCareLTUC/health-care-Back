`use strict`
const express = require('express')

const RouteDB = express.Router()

const client = require('../client')





RouteDB.get("/GETDoctorid/:id", async (req, res, next) => {

    try {
        const { id } = req.params
        const sql = `SELECT * FROM doctor WHERE id=$1`
        await client.query(sql, [id]).then((doctor) => { res.status(200).send(doctor.rows) })

    }
    catch (e) {

        next("doctor name handler " + e);

    }


})



RouteDB.get("/DoctorName/:names", async (req, res, next) => {

    try {
        const { doctor_name } = req.params
        const sql = `SELECT * FROM doctor WHERE doctor_name=$1`
        await client.query(sql, [doctor_name]).then((doctor) => { res.status(200).send(doctor.rows) })

    }
    catch (e) {

        next("doctor name handler " + e);

    }


})

RouteDB.post("/insertDoctor", async (req, res, next) => {

    try {

        let doctor_name = req.body.n;
        let password=req.body.pa;
        let address = req.body.a;
        let specialty = req.body.s;
        let phone = req.body.p;

        let sql = (`INSERT INTO doctor(doctor_name,password,location,Specialty,phone,appointment) VALUES($1,$2,$3,$4,$5,$6)`);
        await client.query(sql, [doctor_name,password,address, specialty, phone, ""]);
        res.json(`Thank you ${doctor_name} for joining our staff in the department of ${specialty}`)
    }


    catch (e) {

        next("insert doctor handler " + e);
    }
})

RouteDB.put("/updateDoctor/:id", async (req, res, next) => {

    try {

        let doctor_name = req.body.n;
        let address = req.body.a;
        let specialty = req.body.s;
        let phone = req.body.p;
        let appointment = req.body.ap;
        let sql = `UPDATE doctor SET doctor_name=$1,location=$2,Specialty=$3,phone=$4,appointment=$5 WHERE id=${req.params.id} `;
        client.query(sql, [doctor_name, address, specialty, phone, appointment]).then(() => { res.send(`${doctor_name} you're data has been updated`) })

    }

    catch (e) {

        next("update doctor handler " + e);

    }

})







RouteDB.post("/insertdrug", async (req, res) => {
    let drug_name = req.body.drug_name;
    let generic_name = req.body.generic_name;
    let brand_name = req.body.brand_name;
    let dosage_form = req.body.dosage_form;
    let pharm_class = req.body.pharm_class;
    let sql = (`INSERT INTO drug(drug_name,generic_name, brand_name, dosage_form, pharm_class) VALUES ($1,$2,$3,$4,$5)`);
    await client.query(sql, [drug_name, generic_name, brand_name, dosage_form, pharm_class])
    res.status(201).send('Drug added to database');

})



RouteDB.get("/getPatient/:id", async (req, res, next) => {
    try {
        await client.query(`SELECT * FROM patient WHERE id=${req.params.id}`).then((dbresponse) => {
            res.status(200).send(dbresponse.rows);
        })
    } catch (e) {
        next("patient handler " + e);
    }
});

// RouteDB.get("getPatientName/:name", async(req,res,next)=>{

//     try {
//         await client.query(`SELECT * FROM patient WHERE name=${req.params.name}`).then((dbresponse) => {
//             res.status(200).send(dbresponse.rows);
//         })
//     } catch (e) {
//         next("patient handler " + e);
//     }

// })

RouteDB.get("/patientName/:patient_name", async (req, res, next) => {

    try {
        const { patient_name } = req.params
        const sql = `SELECT * FROM patient WHERE patient_name=$1`
        await client.query(sql, [patient_name]).then((patient) => { res.status(200).send(patient.rows) })

    }
    catch (e) {

        next("doctor name handler " + e);

    }
})


RouteDB.post("/insertPatenit", async (req, res, next) => {
    try {
        const { n,pa, h, ap, a } = req.body;
        const sql = (`INSERT INTO patient (patient_name, password,history,appointment,age) VALUES ($1,$2,$3,$4,$5)`)
        await client.query(sql, [n, pa,h, ap, a]).then(() => {
            res.status(201).json(` patient is added `);
        });
    } catch (e) {
        next("patient post handler " + e);
    }
});


RouteDB.put('/updatePatient/:id', async (req, res, next) => {
    try {
        let { patient_name, history, appointment, age } = req.body;

        let sql = `UPDATE patient SET patient_name=$1, history=$2, appointment=$3, age=$4  WHERE id=${req.params.id}`;
        await client.query(sql, [patient_name, history, appointment, age]).then(() => res.status(200).json("updated patient data")
        )
    }

    catch (error) {
        next(`updatePatient: ${error}`)
    }
});




RouteDB.delete("/deletePatient/:n", async (req, res, next) => {
    try {
        const patient_name = req.params.n.toLocaleLowerCase();
        await client
            .query(`DELETE FROM patient WHERE patient_name='${patient_name}'`)
            .then(() => { res.status(200).send(`Record is deleted`); })
    } catch (e) {
        next("patient delete handler " + e);
    }
});






RouteDB.put('/updateAppointment/:id',async (req, res, next) => {
    try {
        let { patient_id, doctor_id, reservation_date, reservation_time, report } = req.body;
        // let {  reservation_date, reservation_time, report } = req.body;
        let sql = `UPDATE appointment SET patient_id=$1, doctor_id=$2, reservation_date=$3, reservation_time=$4,report=$5  WHERE appointment_id=${req.params.id}`;
        // let sql = `UPDATE appointment SET  reservation_date=$3, reservation_time=$4,report=$5  WHERE id=${req.params.id}`;
        // client.query(sql, [ reservation_date, reservation_time, report]).then(() => res.status(200).json("updated Appointment ")

       await client.query(sql, [patient_id, doctor_id, reservation_date, reservation_time, report])
         res.status(200).json("updated Appointment ")
    }
       


    catch (error) {
        next(`updateAppointment: ${error}`)
    }
});



RouteDB.get("/getAllAppointment", (req, res, next) => {
    try {
        let sql = `SELECT * FROM appointment`;
        client.query(sql).then((AppointmentData) => {
            res.status(200).send(AppointmentData.rows);
        });

    } catch (error) {
        next(`getAllAppointment:${error}`)
    }

})

RouteDB.get("getAppointment/:id",(req,res,next)=>{

    try {
        let sql = `SELECT * FROM appointment WHERE Doctor_id=${req.params.id}`;
        client.query(sql).then((AppointmentData) => {
            res.status(200).send(AppointmentData.rows);
        });

    } catch (error) {
        next(`getAllAppointment:${error}`)
    }


})

RouteDB.get("/getpatientAppointment/:id",(req,res,next)=>{

    try {
        let sql = `SELECT * FROM appointment WHERE patient_id=${req.params.id}`;
        client.query(sql).then((AppointmentData) => {
            res.status(200).send(AppointmentData.rows);
        });

    } catch (error) {
        next(`getAllAppointment:${error}`)
    }


})
//patient_id

RouteDB.post("/insertappointment", async (req, res, next) => {
    try {
      let patient_id = req.body.patient_id; 
      let Doctor_id = req.body.Doctor_id; 
      let reservation_date = req.body.reservation_date;
      let reservation_time = req.body.reservation_time;
      let report = req.body.report;
  
      let sql = `INSERT INTO appointment (patient_id,Doctor_id, reservation_date, reservation_time, report) VALUES ($1, $2, $3, $4,$5)`;
      await client.query(sql, [patient_id,Doctor_id, reservation_date, reservation_time, report]);
      res.status(201).send(`Appointment added to the database`);
    } catch (e) {
      next(`insert Appointment + ${e}`);
    }
  });

RouteDB.delete('/delAppointment/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        let sql = `DELETE FROM appointment WHERE appointment_id =${id}`
        await client.query(sql)
        res.status(204).end()
    }
    catch (error) {
        next(`Delete Appointment + ${error}`)
    }
})


module.exports = RouteDB