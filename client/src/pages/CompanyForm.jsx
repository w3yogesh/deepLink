import React,{ useState } from 'react';
import { Grid, TextField, Button, Checkbox } from '@material-ui/core';
import axios from 'axios';
export default function CompanyForm() {
  const [photo, setphoto] = useState(null);
  

  const [formData, setFormData] = useState({
    companyName: '',
    field: '',
    headquarter: '',
    website: '',
    email: '',
    companySize: '',
    about: '',
    photo:null,
  });

  const handleSubmit =  async (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      photo: photo,
    }));

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
  });
   
    // formData.append('photo', photo);
    console.log(data);
    try {
    //   // Make an HTTP POST request to your backend endpoint
      const response = await axios.post("http://localhost:4000/company", data);

    //   // Handle the response from the backend if needed
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
    const { name , value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setphoto(event.target.files[0]);   
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{ marginTop: '2rem' }}>
        <Grid item xs={6}>
          <TextField
            name='companyName'
            label='Company name'
            fullWidth
            variant='outlined'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField name='field' label='Field' fullWidth variant='outlined'   onChange={handleChange} />
        </Grid>
      </Grid>

      <TextField
        name='headquarter'
        label='Headquarter'
        fullWidth
        variant='outlined'
        margin='normal'
        onChange={handleChange}
      />
      <TextField
        name='website'
        label='Website of Company'
        fullWidth
        variant='outlined'
        margin='normal'
       
        onChange={handleChange}
      />
      <TextField
        type='email'
        name='email'
        label='Email'
        fullWidth
        variant='outlined'
        margin='normal'
        onChange={handleChange}

      />
      <TextField
        name='companySize'
        label='Company-Size'
        fullWidth
        variant='outlined'
        margin='normal'
        onChange={handleChange}
      />

      <TextField
        name='about'
        label='Tell us brief about your company'
        multiline
        fullWidth
        variant='outlined'
        margin='normal'
        onChange={handleChange}
      />
        <input type="file"  id="photo"  name='file'
        onChange={(event)=>handleFileChange(event)}/>
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
