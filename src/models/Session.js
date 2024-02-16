`


step1: CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES healthpersonnel(id),
    session_status Text,
    session_data JSON,
    start_time DATETIME,
    end_time DATETIME,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


step2: alter the healthpersonnel table
alter table healthpersonnel add column currentsession int;


{"id": 1, "status": "active", "userId": 1, "firstvisit": ["2023-10-27T10:00:00", "2023-10-28T15:30:00"], "returnvisit": []}

`;
