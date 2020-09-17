CREATE TABLE IF NOT EXISTS user 
  ( 
     id           VARCHAR (36) PRIMARY KEY, 
     google_id    VARCHAR(36),
     name         VARCHAR (50) NOT NULL, 
     email        VARCHAR (50), 
     phone_number INT, 
     is_verified  BOOLEAN DEFAULT false, 
     bio          VARCHAR (100), 
     handle       VARCHAR (15) NOT NULL UNIQUE, 
     image_url    VARCHAR (50),
     INDEX (google_id) 
  ); 

CREATE TABLE IF NOT EXISTS post 
  ( 
     id          VARCHAR (36) PRIMARY KEY, 
     date        DATE, 
     user_id     VARCHAR (36) NOT NULL, 
     description VARCHAR (256), 
     is_image    VARCHAR (50) DEFAULT true, 
     image_url   VARCHAR (50), 
     video_url   VARCHAR (50) 
  ); 

CREATE TABLE IF NOT EXISTS comment 
  ( 
     id      VARCHAR (36) PRIMARY KEY, 
     date    DATE, 
     user_id VARCHAR (36) NOT NULL, 
     post_id VARCHAR (36) NOT NULL, 
     data    VARCHAR (256), 
     INDEX (post_id) 
  ); 

CREATE TABLE IF NOT EXISTS post_liker_map 
  ( 
     post_id VARCHAR (36) PRIMARY KEY, 
     user_id VARCHAR (36) NOT NULL 
  ); 

CREATE TABLE IF NOT EXISTS user_follower 
  ( 
     id           VARCHAR (36) PRIMARY KEY, 
     user_id     VARCHAR (36) NOT NULL, 
     follower_id VARCHAR (36) NOT NULL, 
     is_pending  BOOLEAN NOT NULL DEFAULT true,
     INDEX (user_id) 
  ); 

CREATE TABLE IF NOT EXISTS user_following 
  ( 
     id           VARCHAR (36) PRIMARY KEY, 
     user_id      VARCHAR (36) NOT NULL, 
     following_id VARCHAR (36) NOT NULL, 
     is_pending   BOOLEAN NOT NULL DEFAULT true,
     INDEX (user_id) 
  ); 