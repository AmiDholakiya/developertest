import { TextField, FormControl, styled} from '@mui/material';
import "./customTextField.css"

export const CustomStyledTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#343E49',
      },
      '& .MuiInputBase-input::placeholder': {
        color: '#4D5C6F', 
        fontSize:"1.1rem",
      },
      '& .MuiInputLabel-root':{
        fontSize:"1.1rem",
      },
      '& .MuiFormHelperText-root': {
        marginLeft:"0px",
      },
      '& .MuiInputBase-input': {
        color: '#343E49',
        fontSize:"1.1rem", 
        padding: "14px 10px"
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#A5B6CD',
        },
        '&:hover fieldset': {
          borderColor: '#A5B6CD',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#A5B6CD',
        },
      },
      '& .required-asterisk': {
        color: '#D04459', 
        margin:"0px 5px",
      },
});
const CustomTextField = ({ id, name, label, required, error, helperText, ...rest }) => {

    return <>
        <FormControl className='form-group'>
            <div className='field-label'>{label}</div>
            <CustomStyledTextField error={error} helperText={helperText} id={id} placeholder={label} label={<span>{label}{required && <span className="required-asterisk">*</span> }</span>} name={name} margin='normal' {...rest} />
        </FormControl>
    </>
}

export default CustomTextField;