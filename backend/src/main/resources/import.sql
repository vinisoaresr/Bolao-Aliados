-- This file allow to write SQL commands that will be emitted in test and dev.

-- create user
insert into "user" (id, admin, avatar, created, mail, name, password, score) values (nextval('user_sequence'), true, null, CURRENT_TIMESTAMP, 'vinisoaresr@hotmail.com', 'Vinicius Soares Rodrigues', '$2a$10$Wj0SAmhVRvw1UwgVqqhkgOzPQlDSdor67BG2HjfFTX7U5yybPd/T2', 0);