DROP TABLE IF EXISTS images;
CREATE TABLE images (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `image_url` VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `score` INT NULL
);


INSERT INTO images (image_url) VALUES
 ('/poses/firstPose.png'),
 ('/poses/secondPose.png'),
 ('/poses/thirdPose.png'),
 ('/poses/forthPose.png');



