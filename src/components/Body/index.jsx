import { useState } from "react";
import { FormControl, Grid, MenuItem, Button } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import "./body.css";
import { CustomSelect, CustomTextField, CustomAlert } from "../index";


const initialFormValue = {
    full_name: "",
    contact_number: "",
    day: "",
    month: "",
    year: "",
    email: "",
    password: "",
    confirm_password: ""
}
const validationSchema = Yup.object({
    full_name: Yup.string().trim().required('Full name is required').matches(/^[a-zA-Z]+$/, 'Full name should contain only letters'),
    contact_number: Yup.string().trim().required('Contact number is required').matches(/^\d{10}$/, 'Invalid Canadian phone number'),
    day: Yup.string().trim().required('Day is required'),
    month: Yup.string().trim().required('Month is required'),
    year: Yup.string().trim().required('Year is required'),
    email: Yup.string().trim().required('Email is required').email('Invalid email address'),
    password: Yup.string().trim().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long'),
    confirm_password: Yup.string().trim().oneOf([Yup.ref('password'), null], 'Passwords do not match').required('Confirm password is required'),
});
const Body = () => {
    const currentDate = new Date();
    const [responseMessage, setResponseMessage] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (values) => {
        const date = `${values.year}-${values.month}-${values.day}`;
        const formDataWithDate = {
            ...values,
            date: date,
        };

        try {
            const response = await fetch('https://fullstack-test-navy.vercel.app/api/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataWithDate),
            });
            const responseData = await response.json();
            setSuccess(responseData.title == "Success");
            setResponseMessage(responseData.description);
            setTimeout(() => setResponseMessage(null), 3000);

        } catch (error) {
            setSuccess(false);
            setResponseMessage("Error while submitting the form. Please try again !");
            setTimeout(() => setResponseMessage(null), 3000);
        }
    }
    const formik = useFormik({
        initialValues: initialFormValue,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            return await handleSubmit(values)
        },
    });
    return <>
        <div className="page-body">
            <h2 className="body-title">Create User Account</h2>
            <div className="custom-card">
                <CustomTextField onChange={formik.handleChange} value={formik.values.full_name} error={formik.touched.full_name && !!formik.errors.full_name} helperText={formik.touched.full_name && formik.errors.full_name} id="full_name" name="full_name" label="Full Name" fullWidth variant="outlined" required />
                <CustomTextField onChange={formik.handleChange} value={formik.values.contact_number} error={formik.touched.contact_number && !!formik.errors.contact_number} helperText={formik.touched.contact_number && formik.errors.contact_number} id="contact_number" name="contact_number" label="Contact Number" fullWidth variant="outlined" required />
                <FormControl className='form-group'>
                    <div className='field-label'>Birthdate</div>
                    <Grid item xs={12}>
                        <Grid container spacing={{ xs: 1, md: 2 }}>
                            <Grid item xs={3} md={4}>
                                <CustomSelect onChange={formik.handleChange}
                                    value={formik.values.day} error={formik.touched.day && !!formik.errors.day} helperText={formik.touched.day && formik.errors.day} id="day" name="day" label="Day">
                                    {[...Array(31)].map((_, index) => (
                                        <MenuItem key={index} value={index + 1}>
                                            {index + 1}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            </Grid>
                            <Grid item xs={5} md={4}>
                                <CustomSelect onChange={formik.handleChange}
                                    value={formik.values.month} error={formik.touched.month && !!formik.errors.month} helperText={formik.touched.month && formik.errors.month} id="month" name="month" label="Month">
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                                        <MenuItem key={index} value={index + 1}>
                                            {month}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            </Grid>
                            <Grid item xs={4}>
                                <CustomSelect onChange={formik.handleChange}
                                    value={formik.values.year} error={formik.touched.year && !!formik.errors.year} helperText={formik.touched.year && formik.errors.year} id="year" name="year" label="Year">
                                    {[...Array(100)].map((_, index) => (
                                        <MenuItem key={index} value={currentDate.getFullYear() - index}>
                                            {currentDate.getFullYear() - index}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            </Grid>
                        </Grid>
                    </Grid>
                </FormControl>
                <CustomTextField onChange={formik.handleChange} value={formik.values.email} error={formik.touched.email && !!formik.errors.email} helperText={formik.touched.email && formik.errors.email} id="email_address" name="email" label="Email Address" fullWidth variant="outlined" required />
                <CustomTextField onChange={formik.handleChange} value={formik.values.password} error={formik.touched.password && !!formik.errors.password} helperText={formik.touched.password && formik.errors.password} id="password" name="password" label="Password" type="password" fullWidth variant="outlined" required />
                <CustomTextField onChange={formik.handleChange} value={formik.values.confirm_password} error={formik.touched.confirm_password && !!formik.errors.confirm_password} helperText={formik.touched.confirm_password && formik.errors.confirm_password} id="confirm_password" name="confirm_password" label="Confirm Password" type="password" fullWidth variant="outlined" required />
            </div>

            <div className="button-container">
                <div className="button-wrapper">
                    <Button style={{ width: '100%' }} variant="outlined" className="cancel-button" onClick={formik.handleReset}>Cancel</Button>
                </div>
                <div className="button-wrapper">
                    <Button style={{ width: '100%' }} type="submit" variant="contained" className="submit-button" onClick={(e) => { e.preventDefault(); formik.handleSubmit(); }}>Submit</Button>
                </div>
            </div>
        </div>
        {responseMessage && (
            <CustomAlert status={success} message={responseMessage} />
        )}
    </>
}

export default Body;