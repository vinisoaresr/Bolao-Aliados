-- This file allow to write SQL commands that will be emitted in test and dev.

-- truncate tables
truncate table "team" restart identity cascade;
truncate table "match" restart identity cascade;
truncate table "group" restart identity cascade;

-- create sequences
create sequence if not exists "group_sequence";
create sequence if not exists "team_sequence";
create sequence if not exists "match_sequence";
create sequence if not exists "user_sequence";

-- create groups
insert into "group" (id, name, created, updated) values (1, 'Grupo A', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into "group" (id, name, created, updated) values (2, 'Grupo B', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into "group" (id, name, created, updated) values (3, 'Grupo C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into "group" (id, name, created, updated) values (4, 'Grupo D', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into "group" (id, name, created, updated) values (5, 'Grupo E', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into "group" (id, name, created, updated) values (6, 'Grupo F', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into "group" (id, name, created, updated) values (7, 'Grupo G', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into "group" (id, name, created, updated) values (8, 'Grupo H', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Group A 1 2 3 4
insert into team (id, name, active, created, iconpath, updated, group_id) values (1, 'Catar', true, null, '/assets/flags/1x1/qa.svg', null, 1);
insert into team (id, name, active, created, iconpath, updated, group_id) values (2, 'Equador', true, null, '/assets/flags/1x1/ec.svg', null, 1);
insert into team (id, name, active, created, iconpath, updated, group_id) values (3, 'Holanda', true, null, '/assets/flags/1x1/nl.svg', null, 1);
insert into team (id, name, active, created, iconpath, updated, group_id) values (4, 'Senegal', true, null, '/assets/flags/1x1/sn.svg', null, 1);
-- Matches Group A
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221121  0700',  'YYYYMMDDHH24MI'), 0, 0, 1, 4, 3); --  Senegal x holanda
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221121  1300',  'YYYYMMDDHH24MI'), 0, 0, 1, 1, 2); --  Catar x Equador
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221125  1000',  'YYYYMMDDHH24MI'), 0, 0, 1, 1, 4); --  Catar x Senegal
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221125  1300',  'YYYYMMDDHH24MI'), 0, 0, 1, 3, 2); --  holanda x Equador
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221129  1200',  'YYYYMMDDHH24MI'), 0, 0, 1, 3, 1); --  holanda x Catar
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221129  1200',  'YYYYMMDDHH24MI'), 0, 0, 1, 2, 4); --  Equador x Senegal

-- Group B 5 6 7 8
insert into team (id, name, active, created, iconpath, updated, group_id) values (5, 'Estados Unidos', true, null, '/assets/flags/1x1/us.svg', null, 2);
insert into team (id, name, active, created, iconpath, updated, group_id) values (6, 'Inglaterra', true, null, '/assets/flags/1x1/gb-eng.svg', null, 2);
insert into team (id, name, active, created, iconpath, updated, group_id) values (7, 'Ir??', true, null, '/assets/flags/1x1/ir.svg', null, 2);
insert into team (id, name, active, created, iconpath, updated, group_id) values (8, 'Pa??s de Gales', true, null, '/assets/flags/1x1/gb-wls.svg', null, 2);
-- Matches Group B
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221121  1000',  'YYYYMMDDHH24MI'), 0, 0, 2, 6, 7); --  Inglaterra x Ir??
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221121  1600',  'YYYYMMDDHH24MI'), 0, 0, 2, 5, 8); --  Estados Unidos x Gales
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221125  0700',  'YYYYMMDDHH24MI'), 0, 0, 2, 8, 7); --  Gales x Ir??
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221125  1600',  'YYYYMMDDHH24MI'), 0, 0, 2, 6, 5); --  Inglaterra x Estados Unidos
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221129  1600',  'YYYYMMDDHH24MI'), 0, 0, 2, 8, 6); --  Gales x Inglaterra
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221129  1600',  'YYYYMMDDHH24MI'), 0, 0, 2, 7, 5); --  Ir?? x Estados Unidos

-- Group C 9 10 11 12
insert into team (id, name, active, created, iconpath, updated, group_id) values (9, 'Ar??bia Saudita', true, null, '/assets/flags/1x1/sa.svg', null, 3);
insert into team (id, name, active, created, iconpath, updated, group_id) values (10, 'Argentina', true, null, '/assets/flags/1x1/ar.svg', null, 3);
insert into team (id, name, active, created, iconpath, updated, group_id) values (11, 'M??xico', true, null, '/assets/flags/1x1/mx.svg', null, 3);
insert into team (id, name, active, created, iconpath, updated, group_id) values (12, 'Pol??nia', true, null, '/assets/flags/1x1/pl.svg', null, 3);
-- Matches group C
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221122  0700',  'YYYYMMDDHH24MI'), 0, 0, 3, 10, 9); --  Argentina x Ar??bia Saudita 
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221122  1300',  'YYYYMMDDHH24MI'), 0, 0, 3, 11, 12); --  M??xico x Pol??nia
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221126  1000',  'YYYYMMDDHH24MI'), 0, 0, 3, 12, 9); --  Pol??nia x Ar??bia Saudita
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221126  1600',  'YYYYMMDDHH24MI'), 0, 0, 3, 10, 11); --  Argentina x M??xico
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221130  1600',  'YYYYMMDDHH24MI'), 0, 0, 3, 9, 11); --  Ar??bia Saudita x M??xico 
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221130  1600',  'YYYYMMDDHH24MI'), 0, 0, 3, 12, 10); --  Pol??nia x Argentina

-- Group D 13 14 15 16
insert into team (id, name, active, created, iconpath, updated, group_id) values (13, 'Austr??lia', true, null, '/assets/flags/1x1/au.svg', null, 4);
insert into team (id, name, active, created, iconpath, updated, group_id) values (14, 'Dinamarca', true, null, '/assets/flags/1x1/dk.svg', null, 4);
insert into team (id, name, active, created, iconpath, updated, group_id) values (15, 'Fran??a', true, null, '/assets/flags/1x1/fr.svg', null, 4);
insert into team (id, name, active, created, iconpath, updated, group_id) values (16, 'Tun??sia', true, null, '/assets/flags/1x1/tn.svg', null, 4);
-- Matches group D
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221122  1000',  'YYYYMMDDHH24MI'), 0, 0, 4, 14, 16); --  Dinamarca x Tun??sia
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221122  1600',  'YYYYMMDDHH24MI'), 0, 0, 4, 15, 13); --  Fran??a x Austr??lia
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221126  0700',  'YYYYMMDDHH24MI'), 0, 0, 4, 16, 13); --  Tun??sia x Austr??lia
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221126  1300',  'YYYYMMDDHH24MI'), 0, 0, 4, 15, 14); --  Fran??a x Dinamarca
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221130  1200',  'YYYYMMDDHH24MI'), 0, 0, 4, 16, 15); --  Tun??sia x Fran??a
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221130  1200',  'YYYYMMDDHH24MI'), 0, 0, 4, 13, 14); --  Austr??lia x Dinamarca

-- Group E 17 18 19 20
insert into team (id, name, active, created, iconpath, updated, group_id) values (17, 'Alemanha', true, null, '/assets/flags/1x1/de.svg', null, 5);
insert into team (id, name, active, created, iconpath, updated, group_id) values (18, 'Costa Rica', true, null, '/assets/flags/1x1/cr.svg', null, 5);
insert into team (id, name, active, created, iconpath, updated, group_id) values (19, 'Espanha', true, null, '/assets/flags/1x1/es.svg', null, 5);
insert into team (id, name, active, created, iconpath, updated, group_id) values (20, 'Jap??o', true, null, '/assets/flags/1x1/jp.svg', null, 5);
-- Matches group E
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221123  1000',  'YYYYMMDDHH24MI'), 0, 0, 5, 17, 20); --  Alemana x Jap??o
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221123  1300',  'YYYYMMDDHH24MI'), 0, 0, 5, 19, 18); --  Espana x Costa Rica ou Nova Zel??ndia
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221127  0700',  'YYYYMMDDHH24MI'), 0, 0, 5, 20, 18); --  Jap??o x Costa Rica ou Nova Zel??ndia
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221127  1600',  'YYYYMMDDHH24MI'), 0, 0, 5, 19, 17); --  Espana x Alemana
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221201  1600',  'YYYYMMDDHH24MI'), 0, 0, 5, 20, 19); --  Jap??o x Espana
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221201  1600',  'YYYYMMDDHH24MI'), 0, 0, 5, 18, 17); --  Costa Rica ou Nova Zel??ndia x Alemana

-- Group F 21 22 23 24
insert into team (id, name, active, created, iconpath, updated, group_id) values (21, 'B??lgica', true, null, '/assets/flags/1x1/be.svg', null, 6);
insert into team (id, name, active, created, iconpath, updated, group_id) values (22, 'Canad??', true, null, '/assets/flags/1x1/ca.svg', null, 6);
insert into team (id, name, active, created, iconpath, updated, group_id) values (23, 'Cro??cia', true, null, '/assets/flags/1x1/hr.svg', null, 6);
insert into team (id, name, active, created, iconpath, updated, group_id) values (24, 'Marrocos', true, null, '/assets/flags/1x1/ma.svg', null, 6);
-- Matches grupo F
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221123  0700',  'YYYYMMDDHH24MI'), 0, 0, 6, 24, 23); --  Marrocos x Cro??cia
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221123  1600',  'YYYYMMDDHH24MI'), 0, 0, 6, 21, 22); --  B??lgica x Canad??
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221127  1000',  'YYYYMMDDHH24MI'), 0, 0, 6, 21, 24); --  B??lgica x Marrocos
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221127  1300',  'YYYYMMDDHH24MI'), 0, 0, 6, 23, 22); --  Cro??cia x Canad??
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221201  1200',  'YYYYMMDDHH24MI'), 0, 0, 6, 23, 21); --  Cro??cia x B??lgica
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221201  1200',  'YYYYMMDDHH24MI'), 0, 0, 6, 22, 24); --  Canad?? x Marrocos

-- Group G 25 26 27 28
insert into team (id, name, active, created, iconpath, updated, group_id) values (25, 'Brasil', true, null, '/assets/flags/1x1/br.svg', null, 7);
insert into team (id, name, active, created, iconpath, updated, group_id) values (26, 'Camar??es', true, null, '/assets/flags/1x1/cm.svg', null, 7);
insert into team (id, name, active, created, iconpath, updated, group_id) values (27, 'S??rvia', true, null, '/assets/flags/1x1/rs.svg', null, 7);
insert into team (id, name, active, created, iconpath, updated, group_id) values (28, 'Su????a', true, null, '/assets/flags/1x1/ch.svg', null, 7);
-- Matches group G
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221124  0700',  'YYYYMMDDHH24MI'), 0, 0, 7, 28, 26); --  Su????a x Camar??es
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221124  1600',  'YYYYMMDDHH24MI'), 0, 0, 7, 25, 27); --  Brasil x S??rvia
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221128  0700',  'YYYYMMDDHH24MI'), 0, 0, 7, 26, 27); --  Camar??es x S??rvia
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221128  1300',  'YYYYMMDDHH24MI'), 0, 0, 7, 25, 28); --  Brasil x Su????a
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221202  1600',  'YYYYMMDDHH24MI'), 0, 0, 7, 26, 25); --  Camar??es x Brasil
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221202  1600',  'YYYYMMDDHH24MI'), 0, 0, 7, 27, 28); --  S??rvia x Su????a


-- Group H 29 30 31 32
insert into team (id, name, active, created, iconpath, updated, group_id) values (29, 'Coreia do Sul', true, null, '/assets/flags/1x1/kr.svg', null, 8);
insert into team (id, name, active, created, iconpath, updated, group_id) values (30, 'Gana', true, null, '/assets/flags/1x1/gh.svg', null, 8);
insert into team (id, name, active, created, iconpath, updated, group_id) values (31, 'Portugal', true, null, '/assets/flags/1x1/pt.svg', null, 8);
insert into team (id, name, active, created, iconpath, updated, group_id) values (32, 'Uruguai', true, null, '/assets/flags/1x1/uy.svg', null, 8);
-- Matches group H
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221124  1000',  'YYYYMMDDHH24MI'), 0, 0, 8, 32, 29); --  Uruguai x Coreia do Sul
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221124  1300',  'YYYYMMDDHH24MI'), 0, 0, 8, 31, 30); --  Portugal x Gana
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221128  1000',  'YYYYMMDDHH24MI'), 0, 0, 8, 29, 30); --  Coreia do Sul x Gana
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221128  1600',  'YYYYMMDDHH24MI'), 0, 0, 8, 31, 32); --  Portugal x Uruguai
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221202  1200',  'YYYYMMDDHH24MI'), 0, 0, 8, 29, 31); --  Coreia do Sul x Portugal
insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221202  1200',  'YYYYMMDDHH24MI'), 0, 0, 8, 30, 32); --  Gana x Uruguai

--------------------
--Oitavas de final
-- insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221203 1200', 'YYYYMMDDHH24MI'), 0, 0, null, 33, 34); --  1??A x 2??B  jogo 49
-- insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221203 1600', 'YYYYMMDDHH24MI'), 0, 0, null, 33, 34); --  1??C x 2??D  jogo 50
-- insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221204 1200', 'YYYYMMDDHH24MI'), 0, 0, null, 33, 34); --  1??D x 2??C  jogo 52
-- insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221204 1600', 'YYYYMMDDHH24MI'), 0, 0, null, 33, 34); --  1??B x 2??A  jogo 51
-- insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221205 1200', 'YYYYMMDDHH24MI'), 0, 0, null, 33, 34); --  1??E x 2??F  jogo 53
-- insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221205 1600', 'YYYYMMDDHH24MI'), 0, 0, null, 33, 34); --  1??G* x 2??  jogo 54
-- insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221206 1200', 'YYYYMMDDHH24MI'), 0, 0, null, 33, 34); --  1??F x 2??E  jogo 55
-- insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221206 1600', 'YYYYMMDDHH24MI'), 0, 0, null, 33, 34); --  1?? x 2??G*  jogo 56
-- -- Quartas de final
-- insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221209 1600',  'YYYYMMDDHH24MI'), 0, 0, null, 33, 34); --  Vencedor 53 x Vencedor 54
-- insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221209 1200',  'YYYYMMDDHH24MI'), 0, 0, null, 33, 34); --  Vencedor 49 x Vencedor 50
-- insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221210 1600',  'YYYYMMDDHH24MI'), 0, 0, null, 33, 34); --  Vencedor 55 x Vencedor 56
-- insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221210 1200',  'YYYYMMDDHH24MI'), 0, 0, null, 33, 34); --  Vencedor 51 x Vencedor 52
-- -- Semifinais
-- insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221213 1600',  'YYYYMMDDHH24MI'), 0, 0, null, 33, 34); --  Vencedores das quartas do dia 09-12 ***
-- insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221214 1600',  'YYYYMMDDHH24MI'), 0, 0, null, 33, 34); --  Vencedores das quartas do dia 10-12 ***
-- -- Disputa de terceiro lugar
-- insert into match (id, date, goals_a, goals_b, group_id, team_a_id, team_b_id) values (nextval('match_sequence'), TO_TIMESTAMP('20221217 1200',  'YYYYMMDDHH24MI'), 0, 0, null, 33, 34); --  Perdedores das semifinais

-- create default user
truncate table "user" restart identity cascade;
create sequence if not exists "user_sequence";
insert into "user" (id, admin, avatar, created, mail, name, password, score) values (nextval('user_sequence'), true, null, CURRENT_TIMESTAMP, 'vinisoaresr@hotmail.com', 'Vinicius Soares Rodrigues', '$2a$10$Wj0SAmhVRvw1UwgVqqhkgOzPQlDSdor67BG2HjfFTX7U5yybPd/T2', 0);