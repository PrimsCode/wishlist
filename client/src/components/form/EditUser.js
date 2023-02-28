import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, FormControl, TextField, Button, Paper} from '@mui/material';
import UserContext from '../../helpers/UserContext';
import Loading from '../Loading';

const EditUser = ({ userFunction }) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const centering = { display: "flex", justifyContent: "center", alignItems: "center", margin: "20px" };
    const formStyle = { m: 1, width: 300, alignItems: "center" };
    const container = {
        display: "flex",
        flexDirection: "column",
        padding: 35,
        justifyContent: "center",
        alignItems: "center",
    };

    const editDataState = {
        firstName: user.firstName,
        lastName: user.lastName,
        profilePic: user.profilePic
    };

    const form = [
        { type: "text", name: "firstName", label: "First Name", value: user.firstName },
        { type: "text", name: "lastName", label: "Last Name", value: user.lastName },
        { type: "text", name: "profilePic", label: "Profile Picture Link", value: user.profilePic }
    ];

    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setFormData(editDataState);
        setIsLoading(true);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        await userFunction(user.username, formData);
        alert(`${user.username} was successfully updated!`)
        navigate(`/profile/${user.username}`);
    }

    if (!isLoading) return <Loading />;

    return (
        <Grid container style={centering}>
            <Paper style={container}>

                <div>
                    <Typography variant="h4" style={{ marginBottom: '10px' }}>Edit User</Typography>
                    <Typography variant="body1">Change what you wish to edit.</Typography>
                </div>

                {form.map((data) => (
                    <FormControl sx={formStyle}>
                        <TextField
                            type={data.type}
                            id={data.name}
                            name={data.name}
                            label={data.label}
                            value={formData[data.name]}
                            onChange={handleChange} />
                    </FormControl>
                ))}

                <Button onClick={handleSubmit} variant="contained" color="primary" style={{ margin: '10px' }}>Submit</Button>
            </Paper>
        </Grid>
    )
}

export default EditUser;