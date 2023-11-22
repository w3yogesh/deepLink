import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CompanyForm() {
  const [photo, setPhoto] = useState(null);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    userId:'',
    companyName: '',
    field: '', 
    headquarter: '',
    website: '',
    email: '',
    companySize: '',
    about: '',
  });


  const [myId, setMyId] = useState('');
  const navigate = useNavigate();

 useEffect(() => {
   const userAuth = async () => {
     try {
       const response = await axios.post('http://localhost:4000', {}, { withCredentials: true });
       const { status, user } = response.data;
       if (status) {
         setMyId(user._id);
       } else {
         navigate('/login');
       }
     } catch (error) {
       console.error('Error authenticating user:', error.message);
     }
   };
   userAuth();
 }, [navigate]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (photo) {
      data.append('photo', photo);
    }
    console.log(myId)
    for (var pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    try {
      const response = await axios.post(`http://localhost:4000/company/${myId}`, data);
      // const company=response.data.company;

     // console.log(cId);
      console.log('Backend response:', response);

      // const response2=await axios.post("http://localhost:4000/addcompany",company,myId);
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleLogoChange = (event) => {
    const selectedFile = event.target.files[0];
    setPhoto(selectedFile || null);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Grid container spacing={2} style={{ marginTop: '2rem' }}>
        <Grid item xs={6}>
          <TextField
            id='companyName'
            label='companyName'
            fullWidth
            variant='outlined'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id='field'
            name='field'
            label='Field'
            fullWidth
            variant='outlined'
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Autocomplete
        id='headquarter'
        name='headquarter'
        options={options}
        freeSolo
        onInputChange={async (e, newInputValue) => {
          if (newInputValue) {
            try {
              const response = await axios.get(
                `http://api.geonames.org/searchJSON?q=${newInputValue}&maxRows=15&username=jeet24`
              );
              const newOptions = response.data.geonames.map((place) => place.name);
              setOptions(newOptions);
            } catch (error) {
              console.error('Error fetching locations:', error.message);
            }
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            id='headquarter'
            label='Headquarter'
            variant='outlined'
            margin='normal'
            onChange={handleChange}
          />
        )}
      />

      <TextField
        id='website'
        label='Website of Company'
        fullWidth
        variant='outlined'
        margin='normal'
        onChange={handleChange}
      />
      <TextField
        type='email'
        id='email'
        label='Email'
        fullWidth
        variant='outlined'
        margin='normal'
        onChange={handleChange}
      />
      <TextField
        id='companySize'
        label='Company-Size'
        fullWidth
        variant='outlined'
        margin='normal'
        onChange={handleChange}
      />

      <TextField
        id='about'
        label='Tell us briefly about your company'
        multiline
        fullWidth
        variant='outlined'
        margin='normal'
        onChange={handleChange}
      />
      <label>logo</label>
      <input type='file' id='photo' name='logo' onChange={handleLogoChange} />
  


      <Button
        variant='contained'
        color='primary'
        type='submit'
        style={{ marginTop: '1rem' }}
      >
        Submit
      </Button>
    </form>
  );
}