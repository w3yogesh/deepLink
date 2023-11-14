import React,{ useState } from 'react';
import { Grid, TextField, Button, Checkbox } from '@material-ui/core';
import axios from 'axios';
export default function CompanyForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    field: '',
    headquarter: '',
    website: '',
    email: '',
    companySize: '',
    about: '',
  });

  const handleSubmit =  async (e) => {
    e.preventDefault();
    
    console.log(formData);
    try {
      // Make an HTTP POST request to your backend endpoint
      const response = await axios.post("http://localhost:4000/company", formData);

      // Handle the response from the backend if needed
      console.log('Backend response:', response.data.message);

      // Reset the form after successful submission
     
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error submitting form:', error.message);
    }
    //  setFormData({
    //     companyName: '',
    //     field: '',
    //     headquarter: '',
    //     website: '',
    //     email: '',
    //     companySize: '',
    //     about: '',
    //   });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
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
          <TextField id='field' label='Field' fullWidth variant='outlined'   onChange={handleChange} />
        </Grid>
      </Grid>

      <TextField
        id='headquarter'
        label='Headquarter'
        fullWidth
        variant='outlined'
        margin='normal'
        onChange={handleChange}
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
        label='Tell us brief about your company'
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
