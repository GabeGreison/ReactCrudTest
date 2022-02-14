import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import axios from 'axios';

function Update() {
  const [mug, setMug] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  let history = useHistory();

  const [id, setID] = useState(null);

  React.useEffect(() => {
    setID(localStorage.getItem('ID'));
    setMug(localStorage.getItem('Mug'));
    setCheckbox(localStorage.getItem('Checkbox Value'));
  }, []);

  const updateAPIData = () => {
    axios
      .put(`https://620a75cc92946600171c5a89.mockapi.io/mugsData/${id}`, {
        mug,
        checkbox,
      })
      .then(() => {
        history.push('/read');
      });
  };

  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>Mug</label>
          <input
            placeholder="Mug"
            value={mug}
            onChange={(e) => setMug(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="Paid"
            checked={checkbox}
            onChange={(e) => setCheckbox(!checkbox)}
          />
        </Form.Field>
        <Button type="submit" onClick={updateAPIData}>
          Update
        </Button>
      </Form>
    </div>
  );
}

export default Update;
