"use client";

import Image from "next/image";
import { FC, useMemo, useState } from "react";
import css from "../Tabs.module.css";
import { DownloadButton } from "./VesselsComponents/DownloadButton";
import { CertificateByVesselType, SurveyByVesselType, VesselUnionDataType } from "./VesselsComponents/VesselDataType";
import { VesselTable } from "./VesselsComponents/VesselTable";

type VesselType = {
    certificatesByVessel: CertificateByVesselType[];
    flag: string;
    imo: string;
    port_of_registry: string;
    surveysByVessel: SurveyByVesselType[];
    vesse_type: string;
    vessel_id: string;
    vessel_name: string;
};

export type CompanyDataType = {
    companies_address: string;
    companies_email: string;
    companies_imo: number;
    companies_name: string;
    vessels: VesselType[];
};

type HandlerListProps = {
    isEmpty: boolean;
    onOpen: () => void;
    isOpen: boolean;
    color?: "red" | "green" | "orange";
};

const HandlerList: FC<HandlerListProps> = ({ isEmpty, onOpen, isOpen, color }) => {
    const imageStyle = {
        transition: "transform 0.3s ease",
        transform: `rotate(${isOpen ? 90 : 0}deg)`,
    };

    const colorCircle = useMemo(() => {
        switch (color) {
            case "green": {
                return "/images/svg/circle-green.svg";
            }
            case "orange": {
                return "/images/svg/circle-orange.svg";
            }
            case "red":
            default: {
                return "/images/svg/circle-red.svg";
            }
        }
    }, [color]);

    return (
        <div className={css.info_block}>
            {!isEmpty ? (
                <button onClick={onOpen} className={css.info_button}>
                    <Image src={colorCircle} width={24} height={24} alt="circle" />
                    <Image src="/images/svg/styled-arrow.svg" width={24} height={24} alt="circle" style={imageStyle} />
                </button>
            ) : (
                "-"
            )}
        </div>
    );
};

const fields: (keyof Pick<VesselType, "vessel_name" | "imo" | "vesse_type" | "flag" | "port_of_registry">)[] = ["vessel_name", "imo", "vesse_type", "flag", "port_of_registry"];

const Vessel: FC<{ ship: VesselType; vesselId: string }> = ({ ship, vesselId }) => {
    const isSurveysByVessel = ship.surveysByVessel.length;
    const isCertificatesByVessel = ship.certificatesByVessel.length;
    const isEmpty = !isSurveysByVessel && !isCertificatesByVessel;
    const [isOpen, setIsOpen] = useState(false);
    const surveysByVesselStatusArr = ship.surveysByVessel.map((survey) => survey.survey_status);
    const certificatesByVesselStatusArr = ship.certificatesByVessel.map((certificate) => certificate.cert_status);

    const statusColor = () => {
        if (surveysByVesselStatusArr.includes("Overdue") || certificatesByVesselStatusArr.includes("Expired")) {
            return "red";
        }
        if (surveysByVesselStatusArr.includes("Due")) {
            return "orange";
        }
        return "green";
    };

    return (
        <div key={vesselId} className={css.body}>
            <div className={css.row}>
                {fields.map((v, i) => {
                    return <p key={`${v}` + i}>{ship[v]}</p>;
                })}
                <div className={css.buttons}>
                    <div>
                        <DownloadButton vesselId={vesselId} />
                    </div>
                </div>
                <HandlerList isEmpty={!!isEmpty} onOpen={() => setIsOpen(!isOpen)} isOpen={isOpen} color={statusColor()} />
            </div>
            <div style={{ display: isOpen ? "block" : "none" }} className={css.expandable_section}>
                {isSurveysByVessel ? <VesselTable type="surveys" data={ship.surveysByVessel as VesselUnionDataType[]} /> : <span />}
                {isCertificatesByVessel ? <VesselTable type="certificates" data={ship.certificatesByVessel as VesselUnionDataType[]} /> : <span />}
            </div>
        </div>
    );
};

export const Vessels: FC<{ companyData: CompanyDataType }> = ({ companyData }) => {
    const { vessels } = companyData;

    return (
        <div className={css.table}>
            <div className={css.header}>
                <p>Vessel Name</p>
                <p>IMO</p>
                <p>Vessel Type</p>
                <p>Flag</p>
                <p>Port of Registry</p>
                <p>Review</p>
                <p>Info</p>
            </div>
            {vessels.map((ship) => {
                const vesselId = ship?.vessel_id.toString();

                return <Vessel key={vesselId} ship={ship} vesselId={vesselId} />;
            })}
        </div>
    );
};
