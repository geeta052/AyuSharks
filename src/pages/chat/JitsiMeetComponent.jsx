// src/JitsiMeetComponent.js

import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const JitsiMeetComponent = () => {
  const { currentUser } = useContext(AuthContext);

  const generateRandomString = () => Math.random().toString(36).substr(2, 10);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://8x8.vc/vpaas-magic-cookie-7bafe0b72aea45628ea0dc08833d2d49/external_api.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const randomUserId = generateRandomString();
      const api = new window.JitsiMeetExternalAPI('8x8.vc', {
        roomName: `vpaas-magic-cookie-7bafe0b72aea45628ea0dc08833d2d49/${randomUserId}`,
        parentNode: document.getElementById('jitsi-container'),
        // Uncomment and provide a valid JWT if needed for authentication
        // jwt: 'YOUR_JWT_HERE',
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="jitsi-container" style={{ height: '100vh' }} />;
};

export default JitsiMeetComponent;
