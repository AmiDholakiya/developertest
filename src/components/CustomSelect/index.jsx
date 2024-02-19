import { ExpandMore } from "@mui/icons-material";

import { CustomStyledTextField } from "../CustomTextField";

const CustomSelect = ({ id, name, label, children, ...rest }) => {

    return <>
        <CustomStyledTextField SelectProps={{
            MenuProps: {
                PaperProps: {
                    style: {
                        maxHeight: '200px', // Set the max height for the Menu list
                        overflowY: 'auto', // Add scrollbar when content exceeds the height
                    },
                },
            },
            IconComponent: ExpandMore
        }} id={id} name={name} label={<span>{label}{<span className="required-asterisk">*</span>}</span>} variant="outlined" margin='normal' fullWidth select {...rest}>
            {children}
        </CustomStyledTextField>
    </>
}

export default CustomSelect;