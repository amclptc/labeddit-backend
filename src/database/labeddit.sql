-- Active: 1678379172327@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

SELECT * FROM users;

DROP TABLE users;

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL, 
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL, 
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    posted_at TEXT DEFAULT (DATETIME()) NOT NULL
);

SELECT * FROM posts;

DROP TABLE posts;


CREATE TABLE likes_dislikes (
    user_id NOT NULL,
    post_id NOT NULL,
    like INTEGER DEFAULT (0) NOT NULL
);

DROP TABLE likes_dislikes;

SELECT * FROM likes_dislikes;

INSERT INTO users (id, name, email, password)
VALUES
('u001', 'Kanye West', 'kanyewest@email.com', 'yeezus123'), 
('u002', 'Tyler, the Creator', 'tylerthecreator@email.com', 'bastard123'),
('u003', 'Eminem', 'eminem@email.com', 'slimshady123');

INSERT INTO posts (id, creator_id, content, likes, dislikes)
VALUES
('p001', 'u001', 'texto qualquer', 0, 0),
('p002', 'u002', 'texto qualquer', 0, 0),
('p003', 'u003', 'texto qualquer', 0, 0),
('p004', 'u001', 'texto qualquer', 0, 0),
('p005', 'u002', 'texto qualquer', 0, 0);

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
('u001', 'p001', 0),
('u002', 'p002', 0),
('u003', 'p003', 0),
('u001', 'p004', 0),
('u002', 'p005', 0);

