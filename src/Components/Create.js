import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import axios from 'axios';

function Create() {
  const [mug, setMug] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  let history = useHistory();

  const postData = () => {
    axios
      .post(`https://620a75cc92946600171c5a89.mockapi.io/mugsData`, {
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
          <input placeholder="Mug" onChange={(e) => setMug(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <Checkbox label="Paid" onChange={() => setCheckbox(!checkbox)} />
        </Form.Field>
        <Button onClick={postData} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Create;
