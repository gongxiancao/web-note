--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.1
-- Dumped by pg_dump version 9.3.1
-- Started on 2014-04-02 16:38:10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 172 (class 3079 OID 11750)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 1943 (class 0 OID 0)
-- Dependencies: 172
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 171 (class 1259 OID 83643)
-- Name: note; Type: TABLE; Schema: public; Owner: public_user; Tablespace: 
--

CREATE TABLE note (
    id bigint NOT NULL,
    parent bigint,
    subject text NOT NULL,
    content text,
    created_by bigint NOT NULL,
    modified_by bigint,
    template text,
    note_ts tsvector
);


ALTER TABLE public.note OWNER TO public_user;

--
-- TOC entry 170 (class 1259 OID 83641)
-- Name: note_id_seq; Type: SEQUENCE; Schema: public; Owner: public_user
--

CREATE SEQUENCE note_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.note_id_seq OWNER TO public_user;

--
-- TOC entry 1944 (class 0 OID 0)
-- Dependencies: 170
-- Name: note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: public_user
--

ALTER SEQUENCE note_id_seq OWNED BY note.id;


--
-- TOC entry 1824 (class 2604 OID 83646)
-- Name: id; Type: DEFAULT; Schema: public; Owner: public_user
--

ALTER TABLE ONLY note ALTER COLUMN id SET DEFAULT nextval('note_id_seq'::regclass);


--
-- TOC entry 1826 (class 2606 OID 98820)
-- Name: note_pk; Type: CONSTRAINT; Schema: public; Owner: public_user; Tablespace: 
--

ALTER TABLE ONLY note
    ADD CONSTRAINT note_pk PRIMARY KEY (id);


--
-- TOC entry 1827 (class 1259 OID 98822)
-- Name: note_ts_idx; Type: INDEX; Schema: public; Owner: public_user; Tablespace: 
--

CREATE INDEX note_ts_idx ON note USING gin (note_ts);


--
-- TOC entry 1828 (class 2620 OID 98825)
-- Name: note_ts_update_trigger; Type: TRIGGER; Schema: public; Owner: public_user
--

CREATE TRIGGER note_ts_update_trigger BEFORE INSERT OR UPDATE OF subject, content ON note FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger('note_ts', 'pg_catalog.english', 'subject', 'content');


--
-- TOC entry 1942 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: public_user
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM public_user;
GRANT ALL ON SCHEMA public TO public_user;


-- Completed on 2014-04-02 16:38:10

--
-- PostgreSQL database dump complete
--

