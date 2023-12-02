import { useEffect } from 'react';
import { useBusinessesContext } from '../hooks/useBusinessesContext';
import { useAuthContext } from '../hooks/useAuthContext';

// components
import BusinessDetails from '../components/BusinessDetails';
import BusinessForm from '../components/BusinessForm';

const MyBusinesses = () => {
  const { myBusinesses, dispatch } = useBusinessesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMyBusinesses = async () => {
      const response = await fetch('/api/businesses/me', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      console.log(json);
      if (response.ok) {
        dispatch({ type: 'SET_MY_BUSINESSES', payload: json });
      }
    };

    if (user) {
      fetchMyBusinesses();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      {console.log(myBusinesses)}
      <div className="businesses">
        <h2>My Businesses</h2>
        {!user && <h3>You must be logged in to view your businesses.</h3>}
        {myBusinesses &&
          myBusinesses.map((business) => (
            <BusinessDetails key={business._id} business={business} />
          ))}
      </div>
      <BusinessForm />
    </div>
  );
};

export default MyBusinesses;
