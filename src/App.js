import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './Admin';
import User from './User';
import useUser from './components/Auth/useUser';
import useApi from './components/Inc/Api';
import Auth from './components/Auth/Auth';

export default function App() {

  const [api, setApi] = useApi();
  const [user, setUser] = useUser();
  const [isAdmin, setIsAdmin] = useState(
    Auth()
      ? user.roles.some(role => role.name == 'Admin')
      : false
  );

  return (
    isAdmin
      ? <Admin />
      : <User />
  );
}
