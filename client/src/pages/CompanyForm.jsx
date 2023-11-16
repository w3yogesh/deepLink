import React, { useState } from 'react';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

export default function CompanyForm() {
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    companyName: '',
    field: '',
    headquarter: '',
    website: '',
    email: '',
    companySize: '',
    about: '',
    // logo: '', // New property for logo file
    // coverImage: '', // New property for cover image file
    // image: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

   // Prepare form data for file upload
//    const formDataWithFiles = new FormData();
// Object.entries(formData).forEach(([key, value]) => {
//   if (value instanceof File) {
//     formDataWithFiles.append(key, value);
//   } else {
//     formDataWithFiles.append(key, value);
//   }
// });

    //console.log(formDataWithFiles);
    console.log(formData);
    try {
      // Make an HTTP POST request to your backend endpoint
      const response = await axios.post('http://localhost:4000/company', formData);
      // Handle the response from the backend if needed
      console.log('Backend response:', response.data.message);

      // Reset the form after successful submission
      // setFormData({
      //   companyName: '',
      //   field: '',
      //   headquarter: '',
      //   website: '',
      //   email: '',
      //   companySize: '',
      //   about: '',
      //   logo: null,
      //   coverImage: null,
      // });
    } catch (error) {
      // Handle any errors that occur during the request
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

  // const handleFileChange = (e, fileType) => {
  //   const file = e.target.files[0];
  
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [fileType]: file.name, // Store the file name or URL, not the entire file object
  //   }));
  // };

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
          <TextField id='field' label='Field' fullWidth variant='outlined' onChange={handleChange} />
        </Grid>
      </Grid>

      <Autocomplete
        id='headquarter'
        options={options}
        freeSolo
        onInputChange={async (e, newInputValue) => {
          if (newInputValue) {
            try {
              const response = await axios.get(
                `http://api.geonames.org/searchJSON?q=${newInputValue}&maxRows=15&username=jeet24`
              );

              // Extract the names of places from the response and update the options
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
      {/* New input for logo image */}

      {/* <input
        type='file'
        accept='image/*'
        id='logo'
        onChange={(e) => handleFileChange(e, 'logo')}
        style={{ display: 'none' }}
      />
      <label htmlFor='logo'>
        <Button variant='contained' color='default' component='span' style={{ marginTop: '1rem' }}>
          Upload Logo
        </Button>
      </label> */}

      {/* New input for cover image */}
      

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
