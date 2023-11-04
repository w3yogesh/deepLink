import React from 'react';
import ProfilePicture from './ProfilePicture';
import Header from './Header';
import Summary from './Summary';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';

function Profile() {
  return (
    <div className="profile">
      <ProfilePicture />
      <Header />
      <Summary />
      <Experience />
      <Education />
      <Skills />
    </div>
  );
}

export default Profile;
