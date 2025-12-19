export type TDate = {
    currentTimeZoneName: string;
    ts: string;
};

export type SurveyByVesselType = {
    survey_name: string;
    survey_category: string;
    survey_type: string;
    survey_assigned_date: TDate;
    survey_due_date: TDate;
    survey_range_start: TDate;
    survey_range_end: TDate;
    survey_postponed_date: TDate;
    survey_status: string;
};

export type CertificateByVesselType = {
    cert_name: string;
    cert_type: string;
    cert_term_type: string;
    cert_base_date: TDate;
    cert_issue_date: TDate;
    cert_expiry_date: TDate;
    cert_status: string;
};

export type VesselUnionDataType = (SurveyByVesselType & CertificateByVesselType) & {
    id: string;
};
