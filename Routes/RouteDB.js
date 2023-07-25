`use strict`
const express = require('express')

const RouteDB = express.Router()

const client = require('../client')









RouteDB.get("/DoctorName/:names", async (req, res, next) => {

    try {
        const { names } = req.params
        const sql = `SELECT * FROM doctor WHERE name=$1`
        await client.query(sql, [names]).then((doctor) => { res.status(200).send(doctor.rows) })

    }
    catch (e) {

        next("doctor name handler " + e);

    }


})

RouteDB.post("/insertDoctor", async (req, res, next) => {

    try {

        let name = req.body.n;
        let address = req.body.a;
        let specialty = req.body.s;
        let phone = req.body.p;

        let sql = (`INSERT INTO doctor(name,location,Specialty,phone,appointment) VALUES($1,$2,$3,$4,$5)`);
        await client.query(sql, [name, address, specialty, phone, ""]);
        res.send(`Thank you ${name} for joining our staff in the department of ${specialty}`)
    }


    catch (e) {

        next("insert doctor handler " + e);
    }
})

RouteDB.put("/updateDoctor/:id", async (req, res, next) => {

    try {

        let name = req.body.n;
        let address = req.body.a;
        let specialty = req.body.s;
        let phone = req.body.p;
        let appointment = req.body.ap;
        let sql = `UPDATE doctor SET name=$1,location=$2,Specialty=$3,phone=$4,appointment=$5 WHERE id=${req.params.id} `;
        client.query(sql, [name, address, specialty, phone, appointment]).then(() => { res.send(`${name} you're data has been updated`) })

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



RouteDB.get("/getPatient", async (req, res, next) => {
    try {
        await client.query(`SELECT * FROM patient`).then((dbresponse) => {
            res.status(200).send(dbresponse.rows);
        })
    } catch (e) {
        next("patient handler " + e);
    }
});


RouteDB.post("/insertPatenit", async (req, res, next) => {
    try {
        const { n, h, ap, a } = req.body;
        const sql = (`INSERT INTO patient (name, history,appointment,age) VALUES ($1,$2,$3,$4)`)
        await client.query(sql, [n, h, ap, a]).then(() => {
            res.status(201).send(` patient is added `);
        });
    } catch (e) {
        next("patient post handler " + e);
    }
});


RouteDB.put('/updatePatient/:id', async (req, res, next) => {
    try {
        let { name, history, appointment, age } = req.body;

        let sql = `UPDATE patient SET name=$1, history=$2, appointment=$3, age=$4  WHERE id=${req.params.id}`;
        await client.query(sql, [name, history, appointment, age]).then(() => res.status(200).json("updated patient data")
        )
    }

    catch (error) {
        next(`updatePatient: ${error}`)
    }
});




RouteDB.delete("/deletePatient/:n", async (req, res, next) => {
    try {
        const name = req.params.n.toLocaleLowerCase();
        await client
            .query(`DELETE FROM patient WHERE name='${name}'`)
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