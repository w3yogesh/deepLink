import React, { useState } from 'react';
import im3 from './images/im2.jpg'
import './profile.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBCol,
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBProgress,
  MDBProgressBar,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';

export default function Profile() {

  const educationHistory = [
    {
      school: 'MNNIT Allahabad',
      course: 'B.Tech in Computer Science',
      startYear: '2017',
      endYear: '2021',
      cpi: '8.5',
    },
    {
      school: 'Karim City College',
      course: 'Intermediate',
      startYear: '2015',
      endYear: '2017',
      cpi: '9.0',
    },
    
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
   const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  const nextSlide = () => {
    if (currentSlide < educationHistory.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };


  const skills = [
    {
      name: 'Web Design',
      proficiency: 80,
      endorsements: 5,
    },
    {
      name: 'Website Markup',
      proficiency: 72,
      endorsements: 8,
    },
    {
      name: 'Mobile Template',
      proficiency: 55,
      endorsements: 3,
    },
    {
      name: 'Backend API',
      proficiency: 66,
      endorsements: 10,
    },
    // Add more skills as needed
  ];

  const [isEnlarged, setIsEnlarged] = useState(false);

  const toggleEnlarged = () => {
    setIsEnlarged(!isEnlarged);
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
            <MDBCardBody className="text-center">
                <div
                  className={`profile-image ${isEnlarged ? 'enlarged' : ''}`}
                  onClick={toggleEnlarged}
                >
                  <MDBCardImage
                    src={im3}
                    alt="err"
                    className={`${isEnlarged ? 'enlarged1' : " rounded-circle"}`}
                    fluid
                  
                  />
                  {isEnlarged && (
                    <div className="close-icon" onClick={toggleEnlarged}>
                      <MDBIcon fas icon="times" />
                    </div>
                  )}
                </div>
                <p className="text-muted mb-1">Full Stack Developer </p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Connect</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem  className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>https://mdbootstrap.com</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="fab fa-twitter" style={{ color: '#333333' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                    <MDBCardText>@mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon className='ms-1' fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                    <MDBCardText>mdbootstrap</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">example@example.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>



    <MDBCol md="6">

    <MDBCard className="mb-4 mb-md-0">
          <MDBCardBody>
            <MDBCardText className="mb-4">
              <span className="text-primary font-italic me-1">Education</span>
            </MDBCardText>
            <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>
              {educationHistory[currentSlide].school}
            </MDBCardText>
            <MDBCardText className="mt-2 mb-1" style={{ fontSize: '.77rem' }}>
              Course: {educationHistory[currentSlide].course}
            </MDBCardText>
            <MDBCardText className="mt-2 mb-1" style={{ fontSize: '.77rem' }}>
              Start Year: {educationHistory[currentSlide].startYear}
            </MDBCardText>
            <MDBCardText className="mt-2 mb-1" style={{ fontSize: '.77rem' }}>
              End Year: {educationHistory[currentSlide].endYear}
            </MDBCardText>
            <MDBCardText className="mt-2 mb-1" style={{ fontSize: '.77rem' }}>
              CPI: {educationHistory[currentSlide].cpi}
            </MDBCardText>
            <div className="d-flex justify-content-between">
              <MDBBtn onClick={prevSlide}>Previous</MDBBtn>
              <MDBBtn onClick={nextSlide}>Next</MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>


      <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1">Skills</span>
                    </MDBCardText>
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>
                          {skill.name}
                        </MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={skill.proficiency} valuemin={0} valuemax={100} />
                        </MDBProgress>
                        <div className="d-flex justify-content-between align-items-center">
                          <MDBCardText className="mt-2 mb-1" style={{ fontSize: '.77rem' }}>
                            Endorsements: {skill.endorsements}
                          </MDBCardText>
                          <MDBBtn  pill bg="success" size='sm'>
                            Endorse
                          </MDBBtn>
                        </div>
                      </div>
                    ))}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
      
        </MDBRow>
      </MDBContainer>
    </section>
  );
}