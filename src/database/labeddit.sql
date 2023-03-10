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
    FOREIGN KEY (creator_id) REFERENCES users(id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

SELECT * FROM posts;

DROP TABLE posts;


CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER DEFAULT (0) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE likes_dislikes;

SELECT * FROM likes_dislikes;

INSERT INTO users (id, name, email, password)
VALUES
('u001', 'Kanye West', 'kanyewest@email.com', 'yeezus123'), 
('u002', 'Tyler, the Creator', 'tylerthecreator@email.com', 'bastard123'),
('u003', 'Eminem', 'eminem@email.com', 'slimshady123');

INSERT INTO posts (id, creator_id, content)
VALUES
('p001', 'u001', 'texto qualquer'),
('p002', 'u002', 'texto qualquer'),
('p003', 'u003', 'texto qualquer'),
('p004', 'u001', 'texto qualquer'),
('p005', 'u002', 'texto qualquer');

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
('u002', 'p001', 1),
('u001', 'p002', 1),
('u002', 'p003', 1),
('u003', 'p004', 0),
('u001', 'p005', 0);

UPDATE posts
SET likes = 1
WHERE id = 'p001';

UPDATE posts
SET likes = 1
WHERE id = 'p002';

UPDATE posts
SET likes = 1
WHERE id = 'p003';

UPDATE posts
SET dislikes = 1
WHERE id = 'p004';

UPDATE posts
SET dislikes = 1
WHERE id = 'p005';

SELECT * FROM posts
LEFT JOIN users_posts
ON users_posts.post_id = posts.id
LEFT JOIN users
ON users_posts.post_id = posts.id;

