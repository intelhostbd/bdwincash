import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './Admin';
import User from './User';
import useUser from './components/Auth/useUser';
import useApi from './components/Inc/Api';
import Auth from './components/Auth/Auth';
import axios from 'axios';
import Activator from './components/Inc/Activator';

export default function App() {

  const [api] = useApi();

  const [user, setUser] = useUser();
  const [siteActivated, setSiteActivated] = useState('1');
  const [isAdmin, setIsAdmin] = useState(
    (Auth() && user.roles)
      ? user.roles.some(role => role.name == 'Admin')
      : false
  );

  useEffect(() => {
    if (window.sessionStorage.getItem('user')) {
      axios.post(`${api}/get-user`, {
        user_id: JSON.parse(window.sessionStorage.getItem('user')).id,
      })
        .then(res => {
          window.sessionStorage.setItem('user',
            JSON.stringify(res.data.user)
          );
          setUser(res.data.user);
        });
    }

    axios.post(`${api}/check-security-key`)
      .then(res => {
        console.log(res);
        setSiteActivated(res.data.activated);
      });


  }, []);

  useEffect(() => {
    console.log(siteActivated);
  }, [siteActivated])

  if (siteActivated == '0') {
    return <Activator />
  }

  return (
    isAdmin
      ? <Admin />
      : <User />
  );
}
