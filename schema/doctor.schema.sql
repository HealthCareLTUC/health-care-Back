CREATE TABLE IF NOT EXISTS doctor(
  id          SERIAL PRIMARY KEY,
  doctor_name        varchar(200) NOT NULL,
  password    varchar (200) NOT NULL,
  location    varchar(200) NOT NULL,
  Specialty   varchar(200) NOT NULL,
  phone       varchar(200)  NOT NULL,
  appointment varchar(200) 
)