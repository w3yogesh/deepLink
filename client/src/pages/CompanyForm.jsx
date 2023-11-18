import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

export default function CompanyForm() {
  const [photo, setPhoto] = useState(null);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    companyName: '',
    field: '',
    headquarter: '',
    website: '',
    email: '',
    companySize: '',
    about: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (photo) {
      data.append('photo', photo);
    }

    try {
      const response = await axios.post('http://localhost:4000/company', data);
      console.log('Backend response:', response.data.message);
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

  const handleFileChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Grid container spacing={2} style={{ marginTop: '2rem' }}>
        <Grid item xs={6}>
          <TextField
            id='companyName'
            label='Company name'
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
        id='autocomplete-headquarter'
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

      <input type='file' id='photo' name='file' onChange={handleFileChange} />

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