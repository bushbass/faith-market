import { useState } from 'react';
import { useBusinessesContext } from '../hooks/useBusinessesContext';
import { useAuthContext } from '../hooks/useAuthContext';

const BusinessForm = () => {
  const { dispatch } = useBusinessesContext();
  const { user } = useAuthContext();

  const [businessName, setBusinessName] = useState('');
  const [owner, setOwner] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [category, setCategory] = useState('');
  const [addressOne, setAddressOne] = useState('');
  const [addressTwo, setAddressTwo] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [areasServed, setAreasServed] = useState('');
  const [isPublished, setIsPublished] = useState('false');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const business = {
      businessName,
      owner,
      shortDescription,
      longDescription,
      category,
      addressOne,
      addressTwo,
      city,
      state,
      zip,
      phone,
      areasServed,
      isPublished,
    };

    const response = await fetch('/api/businesses', {
      method: 'POST',
      body: JSON.stringify(business),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setBusinessName('');

      setOwner('');
      setShortDescription('');
      setLongDescription('');
      setCategory('');
      setAddressOne('');
      setAddressTwo('');
      setCity('');
      setState('');
      setZip('');
      setPhone('');
      setAreasServed('');
      setIsPublished('');

      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_BUSINESS', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Business</h3>

      <label>Business Name:</label>
      <input
        type="text"
        onChange={(e) => setBusinessName(e.target.value)}
        value={businessName}
        className={emptyFields.includes('businessName') ? 'error' : ''}
      />
      <label>Owner:</label>
      <input
        type="text"
        onChange={(e) => setOwner(e.target.value)}
        value={owner}
        className={emptyFields.includes('owner') ? 'error' : ''}
      />
      <label>Short Description:</label>
      <input
        type="text"
        onChange={(e) => setShortDescription(e.target.value)}
        value={shortDescription}
        className={emptyFields.includes('shortDescription') ? 'error' : ''}
      />
      <label>Long Description:</label>
      <input
        type="text"
        onChange={(e) => setLongDescription(e.target.value)}
        value={longDescription}
        className={emptyFields.includes('longDescription') ? 'error' : ''}
      />
      <label>Category:</label>
      <input
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className={emptyFields.includes('category') ? 'error' : ''}
      />
      <label>Address One:</label>
      <input
        type="text"
        onChange={(e) => setAddressOne(e.target.value)}
        value={addressOne}
        className={emptyFields.includes('addressOne') ? 'error' : ''}
      />
      <label>Address Two:</label>
      <input
        type="text"
        onChange={(e) => setAddressTwo(e.target.value)}
        value={addressTwo}
        className={emptyFields.includes('addressTwo') ? 'error' : ''}
      />
      <label>City:</label>
      <input
        type="text"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        className={emptyFields.includes('city') ? 'error' : ''}
      />
      <label>State:</label>
      <input
        type="text"
        onChange={(e) => setState(e.target.value)}
        value={state}
        className={emptyFields.includes('state') ? 'error' : ''}
      />
      <label>Zip:</label>
      <input
        type="text"
        onChange={(e) => setZip(e.target.value)}
        value={zip}
        className={emptyFields.includes('zip') ? 'error' : ''}
      />
      <label>Phone:</label>
      <input
        type="text"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        className={emptyFields.includes('phone') ? 'error' : ''}
      />
      <label>Areas Served:</label>
      <input
        type="text"
        onChange={(e) => setAreasServed(e.target.value)}
        value={areasServed}
        className={emptyFields.includes('areasServed') ? 'error' : ''}
      />
      <label>is Published:</label>
      <input
        type="text"
        onChange={(e) => setIsPublished(e.target.value)}
        value={isPublished}
        className={emptyFields.includes('isPublished') ? 'error' : ''}
      />

      <button>Add Business</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default BusinessForm;
