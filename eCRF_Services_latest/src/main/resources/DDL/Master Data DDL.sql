-- Drop table
 
-- DROP TABLE public.ecrf_master_data;
 
CREATE TABLE public.ecrf_master_data (
	recordid varchar(255) NOT NULL,
	section1 jsonb NULL,
	section2 jsonb NULL,
	section3 jsonb NULL,
	section4 jsonb NULL,
	section5 jsonb NULL,
	dispatchdate timestamp(6) NULL,
	createdate timestamp NULL,
	status varchar NULL,
	dispatched_from varchar NULL,
	dispatched_to varchar NULL,
	"comments" jsonb NULL,
	section6 jsonb NULL,
	section7 jsonb NULL,
	section8 jsonb NULL,
	section9 jsonb NULL,
	siteid varchar NULL,
	section10 jsonb NULL,
	section11 jsonb NULL,
	section12 jsonb NULL,
	section13 jsonb NULL,
	section14 jsonb NULL,
	CONSTRAINT ecrf_master_data_unique UNIQUE (recordid, siteid)
);