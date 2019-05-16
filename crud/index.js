const express = require('express');
const app = express();
const PORT = 4000; // <- change port here

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
    try {
        // open pool
        const client = await pool.connect();
        //save results of the query
        var usersResults = await client.query
            ("SELECT * FROM users");
        //query to database
        res.json(usersResults.rows);
        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

/* ==== GET BY ID ====  */
app.get('/users/:id', async (req, res) => {
    try {
        // open pool
        const client = await pool.connect();
        var usersResults = await client.query("SELECT * FROM users WHERE id=$1", [req.params.id]);
        // rows is to mark a amount of rows
        res.json(usersResults.rows[0]);
        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

/* ====== POST ======  */

app.post('/users', async (req, res) => {
    try {
        // open pool
        const client = await pool.connect();
        let AsName = req.body.name;
        let AsLastName = req.body.last_name;
        let AsEmail = req.body.email;
        let AsAuth0 = req.body.auth0_id;

        var existingUser = await client.query("SELECT * FROM users WHERE auth0_id=$1", [AsAuth0]);
        if (existingUser.rows && existingUser.rows.length > 0) {
            // This is an existing user.
            res.json(existingUser.rows[0]);
            // closed pool
            client.release();
        } else {
            //updateInfo
            var usersResults = await client.query("INSERT INTO users(name, last_name, email, auth0_id) VALUES($1, $2, $3, $4) RETURNING *", [AsName, AsLastName, AsEmail, AsAuth0]);
            res.json(usersResults.rows[0]);
            // closed pool
            client.release();
        }
    } catch (e) {
        console.log(e)
        res.send(500);
    }

}); // SELECT users WHERE auth0_id = AsAuth0
/* ====== PUT ======  */

app.put('/users/:id', async (req, res) => {
    try {
        // open pool
        const client = await pool.connect();
        let AsName = req.body.name;
        let AsLastName = req.body.last_name;
        let AsEmail = req.body.email;
        let AsAuth0 = req.body.auth0_id;
        //updateInfo
        var usersResults = await client.query("UPDATE users SET name=$1, last_name=$2, email=$3 WHERE id=$4 RETURNING *", [AsName, AsLastName, AsEmail, AsAuth0, req.params.id]);
        res.json(usersResults.rows[0]);
        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

/* ====== DELETE ======  */

app.delete('/users/:id', async (req, res) => {
    try {
        // open pool
        const client = await pool.connect();
        // delete the event using the query
        var usersResults = await client.query("DELETE FROM users WHERE id=$1 RETURNING *", [req.params.id]);
        // rows is to mark a amount of rows
        res.json(usersResults.rows[0]);
        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});


/* ====== TASKS TABLE ====== */
/* ====== GET ======  */

app.get('/tasks', async (req, res) => {
    try {
        // open pool
        const client = await pool.connect();
        //save results of the query
        var tasksResults = await client.query
            ("SELECT * FROM tasks ORDER BY ranking");
        //query to database
        res.json(tasksResults.rows);
        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

/* ==== GET BY ID ====  */
app.get('/tasks/:id', async (req, res) => {
    try {
        // open pool
        const client = await pool.connect();
        var tasksResults = await client.query("SELECT * FROM tasks WHERE users_id=$1", [req.params.id]);
        console.log("tasksResults", tasksResults);
        // rows is to mark a amount of rows
        res.json(tasksResults.rows);
        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

/* ====== POST ======  */

app.post('/tasks', async (req, res) => {
    try {
        // open pool
        const client = await pool.connect();
        let AsTasks = req.body.tasks;
        let AsTimeSet = `00:${req.body.time_set}:00`;
        let AsRanking = parseInt(req.body.ranking);
        let AsAuthId = req.body.auth0_id;

        //updateInfo
        var usersResults = await client.query("SELECT id FROM users WHERE auth0_id = $1", [AsAuthId]);
        var tasksResults = await client.query("INSERT INTO tasks(tasks, time_set, ranking, users_id) VALUES($1, $2, $3, $4) RETURNING *", [AsTasks, AsTimeSet, AsRanking, usersResults.rows[0].id]);
        res.json(tasksResults.rows[0]);
        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

/* ====== PUT ======  */

app.put('/tasks/:id', async (req, res) => {
    try {
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
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

/* ====== DELETE ======  */

app.delete('/tasks/:id', async (req, res) => {
    try {
        // open pool
        const client = await pool.connect();
        // delete the event using the query
        var tasksResults = await client.query("DELETE FROM tasks WHERE id=$1 RETURNING *", [req.params.id]);
        // rows is to mark a amount of rows
        res.json(tasksResults.rows[0]);
        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});


/* ====== RESULTS TABLE ====== */
/* ====== GET  ======  */

app.get('/results', async (req, res) => {
    try {
        // open pool
        let AsAuth0 = req.body.auth0_id;
        console.log('AsAuth0', AsAuth0);

        const client = await pool.connect();
        var existingUser = await client.query("SELECT * FROM users WHERE auth0_id=$1", [AsAuth0]);
        console.log('existingUser', existingUser);
        const userId = existingUser.userId;
        //save results of the query

        var allResults = await client.query
            ("SELECT * FROM results");
        //query to database
        res.json(allResults.rows);
        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

/* ====== GET By user ID ======  */

app.get('/results/:users_id', async (req, res) => {
    try {
        // open pool
        const client = await pool.connect();
        //console.log("results");
        //save results of the query
        var allResults = await client.query('SELECT DISTINCT T.id, U.id, R.id, T.tasks, T.users_id, R.total_time, R.created_at FROM users U JOIN tasks T ON T.users_id = U.id JOIN results R ON R.tasks_id = T.id WHERE users_id=$1 ORDER BY R.created_at DESC;', [req.params.users_id])
        console.log(allResults.rows);
        //query to database
        res.json(allResults.rows);

        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

/* ==== GET BY ID ====  */
app.get('/results/:id', async (req, res) => {
    try {
        // open pool
        const client = await pool.connect();
        var allResults = await client.query("SELECT * FROM results WHERE id=$1", [req.params.id]);

        // rows is to mark a amount of rows
        res.json(allResults.rows[0]);
        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});


/* ====== POST ======  */

app.post('/results', async (req, res) => {
    try {
        // open pool
        const client = await pool.connect();
        let AsTotalTime = req.body.total_time;
        let AsTasksId = req.body.tasks_id;

        //updateInfo
        var allResults = await client.query("INSERT INTO results(created_at, total_time, tasks_id) VALUES(now(), $1, $2) RETURNING *", [AsTotalTime, AsTasksId]);
        res.json(allResults.rows[0]);
        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

/* ====== PUT ======  */

app.put('/results/:id', async (req, res) => {
    try {
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
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

/* ====== DELETE ======  */

app.delete('/results/:id', async (req, res) => {
    try {
        // open pool
        const client = await pool.connect();
        // delete the event using the query
        var allResults = await client.query("DELETE FROM results WHERE id=$1 RETURNING *", [req.params.id]);
        // rows is to mark a amount of rows
        res.json(allResults.rows[0]);
        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});


/* ====== USER TIME TABLE ====== */
/* ====== GET ======  */

app.get('/user_time', async (req, res) => {
    try {
        // open pool
        const client = await pool.connect();
        //save results of the query
        var timeResults = await client.query
            ("SELECT * FROM user_time");
        //query to database
        res.json(timeResults.rows);
        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

/* ==== GET BY ID ====  */
app.get('/user_time/:id', async (req, res) => {
    try {
        // open pool
        const client = await pool.connect();
        var allResults = await client.query("SELECT * FROM user_time WHERE id=$1", [req.params.id]);

        // rows is to mark a amount of rows
        res.json(allResults.rows[0]);
        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

/* ====== POST ======  */

app.post('/user_time', async (req, res) => {
    try {
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
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

/* ====== PUT ======  */

app.put('/user_time/:id', async (req, res) => {
    try {
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
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

/* ====== DELETE ======  */

app.delete('/user_time/:id', async (req, res) => {
    try {
        // open pool
        const client = await pool.connect();
        // delete the event using the query
        var timeResults = await client.query("DELETE FROM user_time WHERE id=$1 RETURNING *", [req.params.id]);
        // rows is to mark a amount of rows
        res.json(timeResults.rows[0]);
        // closed pool
        client.release();
    } catch (e) {
        console.log(e)
        res.send(500);
    }
});

// PORTS
app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);
app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);