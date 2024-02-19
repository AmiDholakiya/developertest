import { CheckCircleOutlined, CancelOutlined } from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Alert } from "@mui/material";

const CustomAlert = ({ status, message }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const customStyle = isMobile ?
        { bottom: "17%", right: "5%", left: "5%", padding: "7px 15px", display: "flex", alignItems: "center" }
        : { top: '12.5%', right: '1.5%' }
    return <>
        <Alert sx={{ fontSize: "1em", backgroundColor: "#CDFADC", color: "black", fontWeight: "bold", margin: "0", padding: "18px", position: 'fixed' }} style={{ ...customStyle }} className={"custom-alert"} severity={status ? "success" : "error"} icon={status ? <CheckCircleOutlined sx={{ color: "black", fontSize: "1.4em" }} /> : <CancelOutlined sx={{ color: "black", fontSize: "1.4em" }} />}>{message}</Alert>
    </>
}

export default CustomAlert;