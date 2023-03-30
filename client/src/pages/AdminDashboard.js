import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_ADMIN } from '../utils/queries';

function AdminDashboard() {
  const { data } = useQuery(QUERY_ADMIN);
  let admin;

  if (data) {
    admin = data.admin;
  }

  return (
    <>
      
    </>
  );
}

export default AdminDashboard;