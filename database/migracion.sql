DROP TABLE IF EXISTS skaters;

CREATE TABLE skaters (
    id SERIAL PRIMARY KEY, 
    email VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(25) NOT NULL, 
    password VARCHAR(50) NOT NULL, 
    anos_experiencia INT NOT NULL,
    especialidad VARCHAR(50) NOT NULL,
    foto VARCHAR(255) NOT NULL, 
    estado BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO skaters(email,nombre,password,anos_experiencia,especialidad,foto,estado) VALUES
('toni@skater.com','Tony Hawk','123',12,'kickflip','Danny.jpg', TRUE),
('ton1i@skater.com','evelin','123',12,'kickflip','Evelien.jpg', FALSE),
('ton2i@skater.com','Tony Hawk','123',12,'kickflip','tony.jpg', TRUE);
