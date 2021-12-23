drop table table_test purge;

create table table_test
(
    tt_id_nb integer,
    tt_name varchar2(30),
    tt_count integer,
    constraint tt_pkey primary key(tt_id_nb)
);

CREATE OR REPLACE TRIGGER tt_trigger AFTER
    UPDATE ON table_test
        FOR EACH ROW

        BEGIN
            UPDATE table_test SET tt_count=:new.tt_count + 1 where tt_id_nb=:new.tt_id_nb;
        END;


insert into table_test values(0001,'Cimetiere marin',0);
insert into table_test values(0002,'Le dormeur du val',0);
insert into table_test values(0003,'L albatros',0);

update table_test set tt_name='L''albatros';

select * from table_test;