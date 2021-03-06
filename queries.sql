

CREATE DATABASE leave_by;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(15),
last_name VARCHAR(15),
email VARCHAR(50),
auth0_id text NOT NULL UNIQUE
);


INSERT INTO users ( name, last_name, email)
VALUES ('Liliana', 'Velazquez', 'lilivelazquezz@gmail.com');

SELECT * FROM users;


CREATE TABLE tasks(
id SERIAL PRIMARY KEY,
tasks VARCHAR(25),
time_set TIME,
ranking INT,
users_id INTEGER NOT NULL,
CONSTRAINT users_id_fk 
FOREIGN KEY (users_id)
REFERENCES users(id)
);


INSERT INTO tasks ( tasks, time_set, ranking, users_id )
VALUES ('shower', '00:15:30', 1, 1);

SELECT * FROM tasks;

CREATE TABLE results(
id SERIAL PRIMARY KEY,
created_at TIMESTAMPTZ,
total_time TIME,
tasks_id INT NOT NULL, 
CONSTRAINT tasks_id_fk 
FOREIGN KEY (tasks_id)
REFERENCES tasks(id)
);

INSERT INTO results( created_at, total_time, tasks_id)
VALUES ('2019-04-30T01:39:42.042Z', '00:20:30', 1);
VALUES ('2019-04-30T01:45:42.042Z', '00:20:30', 2);
VALUES ('2019-04-30T01:55:42.042Z', '00:20:30', 3);

INSERT INTO results( created_at, total_time, tasks_id)
VALUES ('2019-04-30T02:00:42.042Z', '00:5:00', 4);

SELECT * FROM results;

CREATE TABLE user_time(
id SERIAL PRIMARY KEY,
wake_up_time TIME,
leave_by TIME,
users_id INTEGER NOT NULL,
CONSTRAINT users_id_fk 
FOREIGN KEY (users_id)
REFERENCES users(id)
);

INSERT INTO user_time( wake_up_time, leave_by, users_id)
VALUES ('6:00:00', '8:00:00', 1);

SELECT * FROM user_time;


DROP TABLE users;
DROP TABLE users cascade;


SELECT users.name,users.last_name,
user_time.wake_up_time, user_time.leave_by
FROM users,user_time
WHERE  users.id = user_time.id
AND user_time.users_id='1';

SELECT users.name,users.last_name,
tasks.tasks, tasks.time_set, tasks.ranking
FROM users,tasks
WHERE  users.name ='Liliana'
AND users.last_name='Velazquez';

SELECT users.name,users.last_name,
tasks.tasks, tasks.time_set, tasks.ranking
FROM users,tasks
WHERE  users.id = users_id
AND users.id =1 
ORDER BY tasks.ranking;

SELECT users.name,users.last_name,
tasks.tasks, tasks.time_set, tasks.ranking
FROM users,tasks
WHERE  users.id = users_id
AND users.id =2;

SELECT users.name,users.last_name,
tasks.tasks, tasks.time_set, tasks.ranking
FROM users,tasks
WHERE  users.id =2;


///
alter table users add column avatar VARCHAR;


DROP TABLE users;


SELECT results.total_time,results.tasks_id,
tasks.tasks
FROM results,tasks
WHERE  tasks.id = tasks_id;


SELECT results.id, tasks.tasks, results.total_time
FROM results
INNER JOIN tasks
ON results.tasks_id=tasks.id;


SELECT results.id, tasks.tasks, tasks.users_id, results.total_time
FROM results
INNER JOIN tasks
ON results.tasks_id=tasks.id
WHERE tasks.users_id = users.id;


SELECT U.id, R.id, T.tasks, T.users_id, R.total_time
  FROM users U 
  JOIN tasks T ON T.users_id = U.id 
  JOIN results R ON R.tasks_id = T.id;




update tasks set time_set = '00:05:00' WHERE id = 2;
update tasks set time_set = '00:03:00' WHERE id = 3;
update tasks set time_set = '00:04:00' WHERE id = 4;
update tasks set time_set = '00:02:00' WHERE id = 8;
update tasks set tasks = 'meditate' WHERE id = 9; 
update tasks set time_set = '00:02:00' WHERE id = 8;  
update tasks set time_set = '00:03:00' WHERE id = 9;  
update tasks set tasks = 'Drink Coffee' WHERE id = 8; 

DELETE FROM tasks WHERE id= 9;
















