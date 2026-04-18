--
-- PostgreSQL database dump
--

\restrict lG5F6Lh903dPUxueKeCuznXgVAqfvBspGDVSj5Wx5Cc0AYVdwktyCoRecVn18qu

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: is_admin(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.is_admin() RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admins (
    user_id uuid NOT NULL,
    email text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: site_content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.site_content (
    key text NOT NULL,
    value text DEFAULT ''::text NOT NULL,
    label text NOT NULL,
    kind text DEFAULT 'text'::text NOT NULL,
    section text DEFAULT 'general'::text NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT site_content_kind_check CHECK ((kind = ANY (ARRAY['text'::text, 'textarea'::text, 'url'::text, 'email'::text])))
);


--
-- Name: visits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.visits (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    path text,
    referrer text,
    user_agent text,
    country text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.admins (user_id, email, created_at) FROM stdin;
28045b16-5ca2-459c-b726-e9530f0268e1	sayedelsahzly2006@gmail.com	2026-04-17 17:40:10.444346+00
175fe953-60e7-4b5f-97bb-4c505d2d38f0	sayedelshazly2006@gmail.com	2026-04-17 17:44:05.637561+00
\.


--
-- Data for Name: site_content; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.site_content (key, value, label, kind, section, sort_order, updated_at) FROM stdin;
domain_name	orbitrag.com	Domain name	text	brand	10	2026-04-17 17:26:00.036703+00
price_currency	USD	Price currency	text	brand	25	2026-04-17 17:26:00.036703+00
hero_eyebrow	Private listing · 2026	Hero eyebrow	text	hero	30	2026-04-17 17:26:00.036703+00
hero_headline	A name for the retrieval era.	Hero headline	textarea	hero	40	2026-04-17 17:26:00.036703+00
hero_subhead	A short, brandable .com built for the retrieval-augmented era. Sold once. Transferred instantly. Offered now as a private listing.	Hero subhead	textarea	hero	50	2026-04-17 17:26:00.036703+00
cta_primary_label	Acquire This Domain	Primary button label	text	cta	60	2026-04-17 17:26:00.036703+00
cta_secondary_label	Contact Owner	Secondary button label	text	cta	80	2026-04-17 17:26:00.036703+00
thesis_title	The name is the architecture.	Thesis title	text	thesis	100	2026-04-17 17:26:00.036703+00
thesis_body	ORBIT evokes a system of knowledge in motion — vectors, indexes, embeddings in graceful circulation. RAG names the mechanic of the moment: retrieval-augmented generation, the architecture behind every serious AI product shipping today. Together: a domain that reads as infrastructure and sounds like a brand.	Thesis body	textarea	thesis	110	2026-04-17 17:26:00.036703+00
marquee_items	Eight characters|.com extension|AI / RAG-native|Brandable|Three syllables|No hyphens|Instant transfer|Escrow available	Marquee items (pipe-separated)	textarea	marquee	120	2026-04-17 17:26:00.036703+00
owner_email	sayedxiv@gmail.com	Owner email	email	cta	90	2026-04-17 17:26:00.036703+00
price	$1000	Price	text	brand	20	2026-04-17 17:26:00.036703+00
cta_primary_url	https://www.spaceship.com/s/buy/orbitrag.com/Dl1sCZEfTWJXT1NB	Primary button URL	url	cta	70	2026-04-17 17:26:00.036703+00
\.


--
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.visits (id, path, referrer, user_agent, country, created_at) FROM stdin;
0a08cb21-7bb9-48f9-807a-555bab67e236	/	https://vm-6kymcwi1psx0binvk3in4z9c.vusercontent.net/	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36	\N	2026-04-17 17:29:23.498299+00
4cea6bfb-df4f-4022-840a-a8976f83b3dd	/	https://vm-6kymcwi1psx0binvk3in4z9c.vusercontent.net/admin/content	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36	\N	2026-04-17 18:18:17.523182+00
bfde6528-43a7-4944-86f7-fab2e9da857e	/	https://v0.app/	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36	\N	2026-04-17 18:18:50.564981+00
e94d32f2-c388-4f25-8fbc-03f93c94bee0	/	\N	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/141.0.7390.0 Safari/537.36	US	2026-04-17 18:23:39.109218+00
655be944-3e42-445f-b4d0-4a9d7fb5220e	/	\N	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/141.0.7390.0 Safari/537.36	US	2026-04-17 18:23:39.2414+00
0fc9cd8c-0c48-4f92-9d8e-1c6771f85a45	/	https://vercel.com/	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36	EG	2026-04-17 18:23:48.715176+00
4fcf8aea-eafe-4503-a7ca-afde0bfbeac4	/	\N	Mozilla/5.0 (iPhone; CPU iPhone OS 16_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1	BR	2026-04-17 20:23:12.059484+00
33921987-42ef-4826-b9ca-c4ec06a98efe	/	\N	Mozilla/5.0 (iPhone; CPU iPhone OS 16_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1	BR	2026-04-17 20:26:41.497488+00
1cb81342-1df2-4c5a-8053-573bf04d2fe6	/	\N	Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.7680.177 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)	US	2026-04-17 21:07:13.894103+00
7454a07c-bcb3-4c57-923c-b40a57c41347	/	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	EG	2026-04-17 21:07:46.110655+00
4c7fbafd-78b2-4c92-853f-c3588f4ee92e	/	\N	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/141.0.7390.0 Safari/537.36	US	2026-04-17 21:47:23.31805+00
c7d752a6-888e-413c-a8df-17a422444ada	/	\N	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/141.0.7390.0 Safari/537.36	US	2026-04-17 21:47:24.037564+00
36a75e2b-eeef-4842-a421-e06e81f58731	/	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	EG	2026-04-17 21:47:56.563091+00
0b708370-17f2-4e47-8b56-28ee322ea1b6	/	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	EG	2026-04-17 22:45:05.388104+00
c9fc9e71-db7a-4468-a8ed-1130cc0469aa	/	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	EG	2026-04-17 23:47:12.040616+00
f89331ef-b5b7-4ef2-817c-5012b9a28a9d	/	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	EG	2026-04-18 00:11:22.963761+00
f7eede49-664d-487f-8b70-9fe966879899	/	\N	vercel-screenshot/1.0	US	2026-04-18 00:57:46.743047+00
ce3b1642-ea85-47ac-b98f-9273b670de38	/	\N	vercel-screenshot/1.0	US	2026-04-18 00:57:47.2907+00
a2505353-dc04-44eb-abe9-5505cd5974cc	/	https://v0.app/	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36	\N	2026-04-18 00:58:12.097723+00
\.


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (user_id);


--
-- Name: site_content site_content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_content
    ADD CONSTRAINT site_content_pkey PRIMARY KEY (key);


--
-- Name: visits visits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_pkey PRIMARY KEY (id);


--
-- Name: visits_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX visits_created_at_idx ON public.visits USING btree (created_at DESC);


--
-- Name: admins admins_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: admins; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

--
-- Name: admins admins read admin; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins read admin" ON public.admins FOR SELECT USING (public.is_admin());


--
-- Name: site_content; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

--
-- Name: site_content site_content delete admin; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "site_content delete admin" ON public.site_content FOR DELETE USING (public.is_admin());


--
-- Name: site_content site_content read public; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "site_content read public" ON public.site_content FOR SELECT USING (true);


--
-- Name: site_content site_content update admin; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "site_content update admin" ON public.site_content FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());


--
-- Name: site_content site_content write admin; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "site_content write admin" ON public.site_content FOR INSERT WITH CHECK (public.is_admin());


--
-- Name: visits; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;

--
-- Name: visits visits insert public; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "visits insert public" ON public.visits FOR INSERT WITH CHECK (true);


--
-- Name: visits visits read admin; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "visits read admin" ON public.visits FOR SELECT USING (public.is_admin());


--
-- PostgreSQL database dump complete
--

\unrestrict lG5F6Lh903dPUxueKeCuznXgVAqfvBspGDVSj5Wx5Cc0AYVdwktyCoRecVn18qu

