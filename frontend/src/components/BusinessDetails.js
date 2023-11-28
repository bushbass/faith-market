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
      <h4>{business.businessName}</h4>
      <p>
        <strong>Owner: </strong>
        {business.owner}
      </p>
      <p>
        <strong>Description: </strong>
        {business.shortDescription}
      </p>
      <p>
        <strong>Full Description: </strong>
        {business.longDescription}
      </p>
      <p>
        <strong>Category: </strong>
        {business.category}
      </p>
      <p>
        <strong>Address One: </strong>
        {business.addressOne}
      </p>
      <p>
        <strong>Address Two: </strong>
        {business.addressTwo}
      </p>
      <p>
        <strong>City: </strong>
        {business.city}
      </p>
      <p>
        <strong>State: </strong>
        {business.state}
      </p>
      <p>
        <strong>Zip: </strong>
        {business.zip}
      </p>
      <p>
        <strong>Phone: </strong>
        {business.phone}
      </p>
      <p>
        <strong>Areas Served: </strong>
        {business.areasServed}
      </p>
      <p>
        <strong>Published ? : </strong>
        {business.isPublished}
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
