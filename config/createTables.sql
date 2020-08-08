CREATE TABLE
IF NOT EXISTS user (
    id VARCHAR
(36) PRIMARY KEY,
    name VARCHAR
(50) NOT NULL,
    email VARCHAR
(50),
    phone_number INT,
    is_verified BOOLEAN DEFAULT false,
    bio VARCHAR
(100),
    handle VARCHAR
(15) NOT NULL UNIQUE,
    image_url VARCHAR
(50)
);

CREATE TABLE
IF NOT EXISTS post
(
    id VARCHAR
(36) PRIMARY KEY,
    date DATE,
    user_id VARCHAR
(36) NOT NULL,
    description VARCHAR
(256),
    is_image VARCHAR
(50) DEFAULT true,
    image_url VARCHAR
(50),
    video_url VARCHAR
(50)
);

CREATE TABLE
IF NOT EXISTS comment
(
    id VARCHAR
(36) PRIMARY KEY,
    date DATE,
    user_id VARCHAR
(36) NOT NULL,
    post_id VARCHAR
(36) NOT NULL,
    data VARCHAR
(256),
    INDEX
(post_id)
);

CREATE TABLE
IF NOT EXISTS post_liker_map
(
    post_id VARCHAR
(36) PRIMARY KEY,
    user_id VARCHAR
(36) NOT NULL
);

CREATE TABLE
IF NOT EXISTS user_follower
(
    user_id VARCHAR
(36) PRIMARY KEY,
    follower_id VARCHAR
(36) NOT NULL,
    is_pending BOOLEAN NOT NULL DEFAULT TRUE
);


CREATE TABLE
IF NOT EXISTS user_following
(
    user_id VARCHAR
(36) PRIMARY KEY,
    following_id VARCHAR
(36) NOT NULL,
is_pending BOOLEAN NOT NULL DEFAULT TRUE
);
