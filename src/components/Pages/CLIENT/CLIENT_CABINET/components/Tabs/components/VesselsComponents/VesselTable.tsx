import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CSSProperties } from "react";
import css from "../../Tabs.module.css";
import { CertificateByVesselType, SurveyByVesselType, VesselUnionDataType } from "./VesselDataType";

type RowType<T> = {
    id: keyof T;
    title: string;
    align: "center" | "left";
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

type SurveyRow = RowType<SurveyByVesselType>;
type CertificateRow = RowType<CertificateByVesselType>;

const surveys_row: SurveyRow[] = [
    { id: "survey_name", title: "Survey", align: "left" },
    { id: "survey_category", title: "Category", align: "left" },
    { id: "survey_type", title: "Type", align: "left" },
    { id: "survey_assigned_date", title: "Assigned date", align: "center" },
    { id: "survey_due_date", title: "Due date", align: "center" },
    { id: "survey_range_start", title: "Range start", align: "center" },
    { id: "survey_range_end", title: "Range end", align: "center" },
    { id: "survey_postponed_date", title: "Postponed date", align: "center" },
    { id: "survey_status", title: "Status", align: "center" },
];

const certificates_row: CertificateRow[] = [
    { id: "cert_name", title: "Certificate", align: "left" },
    { id: "cert_type", title: "Type", align: "left" },
    { id: "cert_term_type", title: "Term type", align: "center" },
    { id: "cert_base_date", title: "Base date", align: "center" },
    { id: "cert_issue_date", title: "Issue date", align: "center" },
    { id: "cert_expiry_date", title: "Expiry date", align: "center" },
    { id: "cert_status", title: "Status", align: "center" },
];

const getFormattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString("ru-RU");
};

const tableSX = {
    minWidth: 700,
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 0 8px #999",
};

const statusStyles = (type: "Due" | "Overdue" | "Due soon" | "Expired"): CSSProperties => {
    switch (type) {
        case "Expired":
            return {
                backgroundColor: "#c20f0fff",
                color: "white",
            };
        case "Due":
            return {
                backgroundColor: "#bedb17ff",
                color: "white",
            };
        case "Overdue":
            return {
                backgroundColor: "#c20f0fff",
                color: "white",
            };
        case "Due soon":
            return {
                backgroundColor: "#0c694a",
                color: "white",
            };
        default:
            return {
                backgroundColor: "white",
                color: "black",
            };
    }
};

type VesselTableProps = { type: "surveys" | "certificates"; data: VesselUnionDataType[] };

export const VesselTable = ({ type, data }: VesselTableProps) => {
    const row = type === "surveys" ? surveys_row : certificates_row;

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: type === "surveys" ? "#0c5769" : "#0c694a",
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    return (
        <div className={css.table_wrapper}>
            <h3>{type === "certificates" ? "Certificates" : "Surveys"}</h3>
            <TableContainer component={Paper} className={css.mui_table} style={{ boxShadow: "none" }}>
                <Table sx={tableSX} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align={"center"}>#</StyledTableCell>
                            {row.map((cell) => {
                                return (
                                    <StyledTableCell sx={{ textWrap: "nowrap" }} align={cell.align} key={cell.id}>
                                        {cell.title}
                                    </StyledTableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((v, i) => {
                            const { id } = v;

                            return (
                                <StyledTableRow key={id}>
                                    <StyledTableCell align={"center"}>{i + 1}</StyledTableCell>
                                    {row.map((cell) => {
                                        const { id: cell_id, align } = cell;
                                        const key = cell.id;
                                        const isStatusValue = key === "cert_status" || key === "survey_status";

                                        const isDate = typeof v[key] === "object" && v[key] !== null && Object.hasOwn(v[key], "ts");

                                        const rawValue = isDate && typeof v[cell_id] === "object" && v[cell_id] !== null && "ts" in v[cell_id] ? getFormattedDate((v[cell_id] as unknown as { ts: Date }).ts) : v[cell_id];
                                        const displayValue = typeof rawValue === "string" ? rawValue : String(rawValue);

                                        return (
                                            <StyledTableCell key={cell_id} align={align}>
                                                {isStatusValue && typeof rawValue === "string" ? (
                                                    <div style={statusStyles(rawValue as "Due" | "Overdue" | "Due soon" | "Expired")} className={css.status_cell}>
                                                        {displayValue}
                                                    </div>
                                                ) : (
                                                    displayValue
                                                )}
                                            </StyledTableCell>
                                        );
                                    })}
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
