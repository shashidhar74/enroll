const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require("cors");
const bodyParser = require("body-parser");
var nm = require('nodemailer');


const pool1 = new Pool({
  user: 'keycloak_user',
  host: 'localhost',
  database: 'keycloak',
  password: 'keycloak123',
  port: 5432, 
});
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'New_db',
  password: 'root',
  port: 5432, 
});



var corsOptions = {
  origin: "http://localhost:4200" 
};

app.use(cors()); 
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const transporter = nm.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'sshashidhar709@gmail.com',
    pass: 'xdmjkzkqskztchie'
  }
});

app.post('/send-email', (req, res) => {
  const { fullName, emailAddress, phoneNumber, eventCode, eventName, eventLocation } = req.body;
  console.log('Request body:', req.body); 
  
  const mailOptions = {
    from: 'sshashidhar709@gmail.com',
    to: emailAddress,
    subject: 'Enrollment Confirmation',
    text: `Dear ${fullName},\n\nYou have successfully enrolled in the event.\n\nEvent Details:\nEvent Code: ${eventCode}\nEvent Name: ${eventName}\nEvent Location: ${eventLocation}\n\nThank you for enrolling!`
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  });


pool.connect();
app.get('/api/userdata',(req,res)=>{
  console.log('node requrst',req)
  pool.query('SELECT * FROM user_entity', (err, result) => {
    if (err) {
      //console.error(err);
      res.status(500).json({ message: 'Error fetching data from the database' });
    } else {
      res.json(result.rows);
    }
  });
})

app.get('/api/userdataByUser',(req,res)=>{
  debugger;
  const username = req.query.username;
  //console.log('email from js',userEmail);
  const query = {
    text: 'SELECT * FROM user_entity WHERE username = $1',
    values: [username],
  };
  console.log('Request query:', req.query);
  pool.query(query, (error, result) => {
    if (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Error fetching data from the database' });
    } else {
      res.json(result.rows); 
    }
  });
});

app.post('/api/userdata',(req,res)=>{
  const { first_name, last_name, email, phone, dob, gender, password, confpassword } = req.body;
  pool.query('INSERT INTO user_db (first_name, last_name, email, phone, dob, gender, password, confirm_password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
  [first_name, last_name, email, phone, dob, gender, password, confpassword],
  (error, result) => {
    console.log('node result-',result)
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Error inserting data into the database' });
    } else {
      res.status(201).json({ message: 'Data inserted successfully' });
    }
  }
  );
})




app.put('/api/userdata/:email', (req, res) => {
  const userEmail = req.params.email; 
  const { first_name, last_name, email, phone, dob, gender, password, confpassword } = req.body;

  const query = {
    text: `UPDATE user_db
           SET first_name = $1, last_name = $2, email = $3, phone = $4, dob = $5, gender = $6, password = $7, confirm_password = $8
           WHERE email = $9`, 
    values: [first_name, last_name, email, phone, dob, gender, password, confpassword, userEmail],
  };

  pool.query(query, (error, result) => {
    if (error) {
      console.error('Error updating user data:', error);
      res.status(500).json({ message: 'Error updating user data in the database' });
    } else {
      res.status(200).json({ message: 'User data updated successfully' });
    }
  });
});

//------------------------------------------------------------
app.post('/api/createEvent', async (req, res) => {
  try {
    const {
      eventcode,
      eventName,
      eventDate,
      eventType,
      eventLocation,
      eventOrganizer,
      eventDescription,
    } = req.body;

    const query = `
      INSERT INTO events (eventcode, eventname, eventdate, eventtype, eventlocation, eventorganizer, eventdescription)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      eventcode,
      eventName,
      eventDate,
      eventType,
      eventLocation,
      eventOrganizer,
      eventDescription,
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing SQL query', error);
    res.status(500).send('Internal Server Error');
  }
});


app.delete('/api/deleteEvent/:eventcode', async (req, res) => {
  try {
    const eventcode = req.params.eventcode;

    const query = `
      DELETE FROM events
      WHERE eventcode = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [eventcode]);

    if (result.rows.length === 0) {
      // No event found with the given eventcode
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error executing SQL query', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/getEvents',(req,res)=>{
  console.log('node requrst',req)
  pool.query('SELECT * FROM events', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching data from the database' });
    } else {
      res.json(result.rows);
    }
  });
})

app.put('/api/updateEvent/:eventcode', async (req, res) => {
  try {
    const eventcode = req.params.eventcode;
    const {
      eventname,
      eventdate,
      eventtype,
      eventlocation,
      eventorganizer,
      eventdescription,
    } = req.body;

    const query = `
      UPDATE events
      SET eventname = $1, 
          eventdate = $2, 
          eventtype = $3, 
          eventlocation = $4, 
          eventorganizer = $5, 
          eventdescription = $6
      WHERE eventcode = $7
      RETURNING *;
    `;

    const values = [
      eventname,
      eventdate,
      eventtype,
      eventlocation,
      eventorganizer,
      eventdescription,
      eventcode,
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      // No event found with the given eventcode
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error executing SQL query', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/api/enroll', async (req, res) => {
  try {
    const {
      fullName,
      emailAddress,
      phoneNumber,
      eventCode,
      eventName,
      eventLocation,
    } = req.body;

    const query = `
      INSERT INTO newenroll (fullname, email, phone, eventcode, eventname, eventlocation)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      fullName,
      emailAddress,
      phoneNumber,
      eventCode,
      eventName,
      eventLocation,
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing SQL query', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/getEnrolls',(req,res)=>{
  console.log('node requrst',req)
  pool.query('SELECT * FROM newenroll', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching data from the database' });
    } else {
      res.json(result.rows);
    }
  });
})

app.get('/api/getEvent/:eventcode', async (req, res) => {
  try {
    const eventCode = req.params.eventcode;

    const query = `
      SELECT * FROM events
      WHERE eventcode = $1;
    `;
    const result = await pool.query(query, [eventCode]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error('Error executing SQL query', error);
    res.status(500).send('Internal Server Error');
  }
});



const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

