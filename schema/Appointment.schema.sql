create table if not exists appointment(
    appointment_id serial primary key,
    patient_id integer,
    foreign KEY (patient_id) references patient(id),
    patient_name varchar(200),
    Doctor_id integer,
    foreign KEY (Doctor_id) REFERENCES doctor(id),
    doctor_name varchar(200),
    reservation_date varchar(200) not null,
    reservation_time varchar(200) not null,
    report varchar(1000) 
);






