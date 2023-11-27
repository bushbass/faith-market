import { useBusinessesContext } from '../hooks/useBusinessesContext';
import { useAuthContext } from '../hooks/useAuthContext';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const BusinessDetails = ({ business }) => {
  const { dispatch } = useBusinessesContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/businesses/' + business._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_BUSINESS', payload: json });
    }
  };

  return (
    <div className="business-details">
      <h4>{business.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {business.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {business.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(business.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default BusinessDetails;
