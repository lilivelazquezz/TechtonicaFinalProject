const express = require('express');
const app = express();
const PORT = 3000; // <- change port here

app.use(express.json());

const {
    Pool
} = require('pg')
const pool = new Pool({
    host: 'localhost',
    database: 'leave_by',
    port: 5432
})
pool.connect();

/* ====== USERS TABLE ====== */
/* ====== GET ======  */

app.get('/users', async (req, res) => {
    // open pool
    const client = await pool.connect();
    //save results of the query
    var usersResults = await client.query
        ("SELECT * FROM users");
    //query to database
    res.json(usersResults.rows);
    // closed pool
    client.release();
});

/* ==== GET BY ID ====  */
app.get('/users/:id', async (req, res) => {
    // open pool
    const client = await pool.connect();
    var usersResults = await client.query("SELECT * FROM users WHERE id=$1", [req.params.id]);

    // rows is to mark a amount of rows
    res.json(usersResults.rows[0]);
    // closed pool
    client.release();
});


/* ====== POST ======  */

app.post('/users', async (req, res) => {
    // open pool
    const client = await pool.connect();
    let AsName = req.body.name;
    let AsLastName = req.body.last_name;
    let AsEmail = req.body.email;

    //updateInfo
    var usersResults = await client.query("INSERT INTO users(name, last_name, email) VALUES($1, $2, $3) RETURNING *", [AsName, AsLastName, AsEmail]);
    res.json(usersResults.rows[0]);
    // closed pool
    client.release();
});

/* ====== PUT ======  */

app.put('/users/:id', async (req, res) => {
    // open pool
    const client = await pool.connect();
    let AsName = req.body.name;
    let AsLastName = req.body.last_name;
    let AsEmail = req.body.email;
    //updateInfo
    var usersResults = await client.query("UPDATE users SET name=$1, last_name=$2, email=$3 WHERE id=$4 RETURNING *", [AsName, AsLastName, AsEmail, req.params.id]);
    res.json(usersResults.rows[0]);
    // closed pool
    client.release();
});

/* ====== DELETE ======  */

app.delete('/users/:id', async (req, res) => {
    // open pool
    const client = await pool.connect();
    // delete the event using the query
    var usersResults = await client.query("DELETE FROM users WHERE id=$1 RETURNING *", [req.params.id]);
    // rows is to mark a amount of rows
    res.json(usersResults.rows[0]);
    // closed pool
    client.release();
});


/* ====== TASKS TABLE ====== */
/* ====== GET ======  */

app.get('/tasks', async (req, res) => {
    // open pool
    const client = await pool.connect();
    //save results of the query
    var tasksResults = await client.query
        ("SELECT * FROM tasks ORDER BY ranking");
    //query to database
    res.json(tasksResults.rows);
    // closed pool
    client.release();
});



/* ==== GET BY ID ====  */
app.get('/tasks/:id', async (req, res) => {
    // open pool
    const client = await pool.connect();
    var tasksResults = await client.query("SELECT * FROM tasks WHERE id=$1", [req.params.id]);

    // rows is to mark a amount of rows
    res.json(tasksResults.rows[0]);
    // closed pool
    client.release();
});

/* ====== POST ======  */

app.post('/tasks', async (req, res) => {
    // open pool
    const client = await pool.connect();
    let AsTasks = req.body.tasks;
    let AsTimeSet = req.body.time_set;
    let AsRanking = req.body.ranking;
    let AsUsersId = req.body.users_id;

    //updateInfo
    var usersResults = await client.query("INSERT INTO tasks(tasks, time_set, ranking, users_id) VALUES($1, $2, $3, $4) RETURNING *", [AsTasks, AsTimeSet, AsRanking, AsUsersId]);
    res.json(usersResults.rows[0]);
    // closed pool
    client.release();
});

/* ====== PUT ======  */

app.put('/tasks/:id', async (req, res) => {
    // open pool
    const client = await pool.connect();
    let AsTasks = req.body.tasks;
    let AsTimeSet = req.body.time_set;
    let AsRanking = req.body.ranking;
    let AsUsersId = req.body.users_id;
    //updateInfo
    var tasksResults = await client.query("UPDATE tasks SET tasks=$1, time_set=$2, ranking=$3, users_id=$4 WHERE id=$5 RETURNING *", [AsTasks, AsTimeSet, AsRanking, AsUsersId, req.params.id]);
    res.json(tasksResults.rows[0]);
    // closed pool
    client.release();
});

/* ====== DELETE ======  */

app.delete('/tasks/:id', async (req, res) => {
    // open pool
    const client = await pool.connect();
    // delete the event using the query
    var tasksResults = await client.query("DELETE FROM tasks WHERE id=$1 RETURNING *", [req.params.id]);
    // rows is to mark a amount of rows
    res.json(tasksResults.rows[0]);
    // closed pool
    client.release();
});


/* ====== RESULTS TABLE ====== */
/* ====== GET ======  */

app.get('/results', async (req, res) => {
    // open pool
    const client = await pool.connect();
    //save results of the query
    var allResults = await client.query
        ("SELECT * FROM results");
    //query to database
    res.json(allResults.rows);
    // closed pool
    client.release();
});

/* ==== GET BY ID ====  */
app.get('/results/:id', async (req, res) => {
    // open pool
    const client = await pool.connect();
    var allResults = await client.query("SELECT * FROM results WHERE id=$1", [req.params.id]);

    // rows is to mark a amount of rows
    res.json(allResults.rows[0]);
    // closed pool
    client.release();
});

/* ====== POST ======  */

app.post('/results', async (req, res) => {
    // open pool
    const client = await pool.connect();
    let AsCreatedAt = req.body.created_at;
    let AsTotalTime = req.body.total_time;
    let AsTasksId = req.body.tasks_id;

    //updateInfo
    var allResults = await client.query("INSERT INTO results(created_at, total_time, tasks_id) VALUES($1, $2, $3) RETURNING *", [AsCreatedAt, AsTotalTime, AsTasksId]);
    res.json(allResults.rows[0]);
    // closed pool
    client.release();
});

/* ====== PUT ======  */

app.put('/results/:id', async (req, res) => {
    // open pool
    const client = await pool.connect();
    let AsCreatedAt = req.body.created_at;
    let AsTotalTime = req.body.total_time;
    let AsTasksId = req.body.tasks_id;

    //updateInfo
    var allResults = await client.query("UPDATE results SET created_at=$1, total_time=$2, tasks_id=$3 WHERE id=$4 RETURNING *", [AsCreatedAt, AsTotalTime, AsTasksId, req.params.id]);
    res.json(allResults.rows[0]);
    // closed pool
    client.release();
});

/* ====== DELETE ======  */

app.delete('/results/:id', async (req, res) => {
    // open pool
    const client = await pool.connect();
    // delete the event using the query
    var allResults = await client.query("DELETE FROM results WHERE id=$1 RETURNING *", [req.params.id]);
    // rows is to mark a amount of rows
    res.json(allResults.rows[0]);
    // closed pool
    client.release();
});


/* ====== USER TIME TABLE ====== */
/* ====== GET ======  */

app.get('/user_time', async (req, res) => {
    // open pool
    const client = await pool.connect();
    //save results of the query
    var timeResults = await client.query
        ("SELECT * FROM user_time");
    //query to database
    res.json(timeResults.rows);
    // closed pool
    client.release();
});

/* ==== GET BY ID ====  */
app.get('/user_time/:id', async (req, res) => {
    // open pool
    const client = await pool.connect();
    var allResults = await client.query("SELECT * FROM user_time WHERE id=$1", [req.params.id]);

    // rows is to mark a amount of rows
    res.json(allResults.rows[0]);
    // closed pool
    client.release();
});

/* ====== POST ======  */

app.post('/user_time', async (req, res) => {
    // open pool
    const client = await pool.connect();
    let AsWakeUpTime = req.body.wake_up_time;
    let AsLeaveBy = req.body.leave_by;
    let AsUsersId = req.body.users_id;

    //updateInfo
    var timeResults = await client.query("INSERT INTO user_time(wake_up_time, leave_by, users_id) VALUES($1, $2, $3) RETURNING *", [AsWakeUpTime, AsLeaveBy, AsUsersId]);
    res.json(timeResults.rows[0]);
    // closed pool
    client.release();
});

/* ====== PUT ======  */

app.put('/user_time/:id', async (req, res) => {
    // open pool
    const client = await pool.connect();
    let AsWakeUpTime = req.body.wake_up_time;
    let AsLeaveBy = req.body.leave_by;
    let AsUsersId = req.body.users_id;

    //updateInfo
    var timeResults = await client.query("UPDATE user_time SET wake_up_time=$1, leave_by=$2, users_id=$3 WHERE id=$4 RETURNING *", [AsWakeUpTime, AsLeaveBy, AsUsersId, req.params.id]);
    res.json(timeResults.rows[0]);
    // closed pool
    client.release();
});

/* ====== DELETE ======  */

app.delete('/user_time/:id', async (req, res) => {
    // open pool
    const client = await pool.connect();
    // delete the event using the query
    var timeResults = await client.query("DELETE FROM user_time WHERE id=$1 RETURNING *", [req.params.id]);
    // rows is to mark a amount of rows
    res.json(timeResults.rows[0]);
    // closed pool
    client.release();
});



// PORTS
app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);
app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);