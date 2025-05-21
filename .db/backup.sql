--
-- PostgreSQL database cluster dump
--

-- Started on 2025-05-20 15:45:41

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:1VcI4XBfhVzXs+gH7wutMQ==$xAVGR5Yq0CMvMF2KR6AyWjvIVSxb7ESXkB4NcL0NVws=:+GvFHvfkuQXKesZmqX0zWa6ThG9owJrSWBykZX7SUA8=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-20 15:45:41

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Completed on 2025-05-20 15:45:41

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-20 15:45:41

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 7 (class 2615 OID 16388)
-- Name: pgagent; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA pgagent;


ALTER SCHEMA pgagent OWNER TO postgres;

--
-- TOC entry 5002 (class 0 OID 0)
-- Dependencies: 7
-- Name: SCHEMA pgagent; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA pgagent IS 'pgAgent system tables';


--
-- TOC entry 2 (class 3079 OID 16389)
-- Name: pgagent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgagent WITH SCHEMA pgagent;


--
-- TOC entry 5003 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgagent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgagent IS 'A PostgreSQL job scheduler';


--
-- TOC entry 4780 (class 0 OID 16390)
-- Dependencies: 223
-- Data for Name: pga_jobagent; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_jobagent (jagpid, jaglogintime, jagstation) FROM stdin;
9764	2025-05-20 00:19:27.915666+07	DESKTOP-MLL9DHN
\.


--
-- TOC entry 4781 (class 0 OID 16399)
-- Dependencies: 225
-- Data for Name: pga_jobclass; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_jobclass (jclid, jclname) FROM stdin;
\.


--
-- TOC entry 4782 (class 0 OID 16409)
-- Dependencies: 227
-- Data for Name: pga_job; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_job (jobid, jobjclid, jobname, jobdesc, jobhostagent, jobenabled, jobcreated, jobchanged, jobagentid, jobnextrun, joblastrun) FROM stdin;
\.


--
-- TOC entry 4784 (class 0 OID 16457)
-- Dependencies: 231
-- Data for Name: pga_schedule; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_schedule (jscid, jscjobid, jscname, jscdesc, jscenabled, jscstart, jscend, jscminutes, jschours, jscweekdays, jscmonthdays, jscmonths) FROM stdin;
\.


--
-- TOC entry 4785 (class 0 OID 16485)
-- Dependencies: 233
-- Data for Name: pga_exception; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_exception (jexid, jexscid, jexdate, jextime) FROM stdin;
\.


--
-- TOC entry 4786 (class 0 OID 16499)
-- Dependencies: 235
-- Data for Name: pga_joblog; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_joblog (jlgid, jlgjobid, jlgstatus, jlgstart, jlgduration) FROM stdin;
\.


--
-- TOC entry 4783 (class 0 OID 16433)
-- Dependencies: 229
-- Data for Name: pga_jobstep; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_jobstep (jstid, jstjobid, jstname, jstdesc, jstenabled, jstkind, jstcode, jstconnstr, jstdbname, jstonerror, jscnextrun) FROM stdin;
\.


--
-- TOC entry 4787 (class 0 OID 16515)
-- Dependencies: 237
-- Data for Name: pga_jobsteplog; Type: TABLE DATA; Schema: pgagent; Owner: postgres
--

COPY pgagent.pga_jobsteplog (jslid, jsljlgid, jsljstid, jslstatus, jslresult, jslstart, jslduration, jsloutput) FROM stdin;
\.


-- Completed on 2025-05-20 15:45:42

--
-- PostgreSQL database dump complete
--

--
-- Database "study_resource_manager" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-05-20 15:45:42

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4940 (class 1262 OID 16918)
-- Name: study_resource_manager; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE study_resource_manager WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'vi-VN';


ALTER DATABASE study_resource_manager OWNER TO postgres;

\connect study_resource_manager

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 42241)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 4941 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 866 (class 1247 OID 42925)
-- Name: ResourceStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ResourceStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."ResourceStatus" OWNER TO postgres;

--
-- TOC entry 863 (class 1247 OID 42486)
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 42278)
-- Name: DownloadLog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DownloadLog" (
    id integer NOT NULL,
    "userId" text NOT NULL,
    "resourceId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."DownloadLog" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 42277)
-- Name: DownloadLog_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DownloadLog_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."DownloadLog_id_seq" OWNER TO postgres;

--
-- TOC entry 4943 (class 0 OID 0)
-- Dependencies: 221
-- Name: DownloadLog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DownloadLog_id_seq" OWNED BY public."DownloadLog".id;


--
-- TOC entry 220 (class 1259 OID 42261)
-- Name: Resource; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Resource" (
    id integer NOT NULL,
    title text NOT NULL,
    subject text NOT NULL,
    "fileUrl" text NOT NULL,
    "originalName" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdBy" text NOT NULL,
    status public."ResourceStatus" DEFAULT 'PENDING'::public."ResourceStatus" NOT NULL
);


ALTER TABLE public."Resource" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 42260)
-- Name: Resource_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Resource_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Resource_id_seq" OWNER TO postgres;

--
-- TOC entry 4944 (class 0 OID 0)
-- Dependencies: 219
-- Name: Resource_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Resource_id_seq" OWNED BY public."Resource".id;


--
-- TOC entry 218 (class 1259 OID 42251)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    "passwordResetToken" text,
    "passwordResetExpires" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    avatar text
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 42242)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 4769 (class 2604 OID 42281)
-- Name: DownloadLog id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DownloadLog" ALTER COLUMN id SET DEFAULT nextval('public."DownloadLog_id_seq"'::regclass);


--
-- TOC entry 4766 (class 2604 OID 42264)
-- Name: Resource id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Resource" ALTER COLUMN id SET DEFAULT nextval('public."Resource_id_seq"'::regclass);


--
-- TOC entry 4934 (class 0 OID 42278)
-- Dependencies: 222
-- Data for Name: DownloadLog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DownloadLog" (id, "userId", "resourceId", "createdAt") FROM stdin;
\.


--
-- TOC entry 4932 (class 0 OID 42261)
-- Dependencies: 220
-- Data for Name: Resource; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Resource" (id, title, subject, "fileUrl", "originalName", "createdAt", "createdBy", status) FROM stdin;
6	Test	Hướng nghiệp	/uploads/1747432279642-509995623-Định Hướng nghề nghiệp cho ngành cntt .docx	Định Hướng nghề nghiệp cho ngành cntt .docx	2025-05-16 21:51:19.802	4ce25c29-e74e-4045-9dcc-dcd834bba900	APPROVED
\.


--
-- TOC entry 4930 (class 0 OID 42251)
-- Dependencies: 218
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, username, password, "passwordResetToken", "passwordResetExpires", "createdAt", "updatedAt", role, avatar) FROM stdin;
4ce25c29-e74e-4045-9dcc-dcd834bba900	work.dannieee999@gmail.com	test	$2b$10$3zYgMEv.o3EgyxtTLOksA.vnhmsmEfIiEOfhpNyD5e3k9jsXpYpk.	\N	\N	2025-05-14 19:15:21.739	2025-05-16 21:54:33.08	ADMIN	/avatar/avatar-1747432473078.png
31f3f485-7a3d-4164-9e26-289c1731d77c	hungvjpprodanchoi@gmail.com	test1	$2b$10$cKALzDt8Ef9DqgruVIlV/Oji0HolRbZuBVNHvL/C1QLd98cGcaRzW	\N	\N	2025-05-14 21:58:26.053	2025-05-19 03:28:27.04	USER	/avatar/avatar-1747625307019.png
\.


--
-- TOC entry 4929 (class 0 OID 42242)
-- Dependencies: 217
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e95548a5-859c-4dc6-a997-bc3f18cbcb3a	cac36c1ef5bbeb93e22625b288bf73912c2d75f483c592d0c2da3e1112e51783	2025-05-15 02:14:26.300122+07	20250506182157_init	\N	\N	2025-05-15 02:14:26.283109+07	1
c6b41eae-bd4a-4dcb-add0-3da5410a4e3c	4b7fc7deb55b1baa6aca41e2728be2ef81d1b68bccc82063caefe411398d65c8	2025-05-15 02:14:26.310188+07	20250514190417_added_download_logs	\N	\N	2025-05-15 02:14:26.300431+07	1
c01c0289-e1f0-4dcb-a87d-2505500826be	802f29aaa4a40f58f02b8d7e7ff51f0d3d200901059efe04cd425787d26c0598	2025-05-15 03:27:49.464234+07	20250514202749_add_role_to_user	\N	\N	2025-05-15 03:27:49.45658+07	1
8152e1ea-064f-4386-a8f5-364b2dc58be0	13736a11d461b0db460677fd6d25f48e375dc8796ec618cd51e815faaea7f78e	2025-05-15 04:47:59.604822+07	20250514214759_add_resource_status	\N	\N	2025-05-15 04:47:59.59976+07	1
cc30799f-d615-410e-9d99-41884c12cb53	1527e28ca6984eb4164a536b0298dbb1a295e558cb4ddfc86bc436e7367d8696	2025-05-17 00:03:26.663315+07	20250516170326_add_avatar_to_user	\N	\N	2025-05-17 00:03:26.658023+07	1
\.


--
-- TOC entry 4945 (class 0 OID 0)
-- Dependencies: 221
-- Name: DownloadLog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DownloadLog_id_seq"', 1, false);


--
-- TOC entry 4946 (class 0 OID 0)
-- Dependencies: 219
-- Name: Resource_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Resource_id_seq"', 6, true);


--
-- TOC entry 4780 (class 2606 OID 42286)
-- Name: DownloadLog DownloadLog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DownloadLog"
    ADD CONSTRAINT "DownloadLog_pkey" PRIMARY KEY (id);


--
-- TOC entry 4778 (class 2606 OID 42269)
-- Name: Resource Resource_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_pkey" PRIMARY KEY (id);


--
-- TOC entry 4775 (class 2606 OID 42259)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 4772 (class 2606 OID 42250)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4773 (class 1259 OID 42270)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 4776 (class 1259 OID 42271)
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- TOC entry 4782 (class 2606 OID 42292)
-- Name: DownloadLog DownloadLog_resourceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DownloadLog"
    ADD CONSTRAINT "DownloadLog_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES public."Resource"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4783 (class 2606 OID 42287)
-- Name: DownloadLog DownloadLog_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DownloadLog"
    ADD CONSTRAINT "DownloadLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4781 (class 2606 OID 42272)
-- Name: Resource Resource_createdBy_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4942 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-05-20 15:45:42

--
-- PostgreSQL database dump complete
--

-- Completed on 2025-05-20 15:45:42

--
-- PostgreSQL database cluster dump complete
--

