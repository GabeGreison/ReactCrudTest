import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Read() {
  const [APIData, setAPIData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`https://620a75cc92946600171c5a89.mockapi.io/mugsData`)
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);

  const setData = (data) => {
    let { id, mug, checkbox } = data;
    localStorage.setItem('ID', id);
    localStorage.setItem('Mug', mug);
    localStorage.setItem('Checkbox Value', checkbox);
  };

  const onDelete = (id) => {
    axios
      .delete(`https://620a75cc92946600171c5a89.mockapi.io/mugsData/${id}`)
      .then(() => {
        getData();
      });
  };

  const getData = () => {
    axios
      .get(`https://620a75cc92946600171c5a89.mockapi.io/mugsData`)
      .then((getData) => {
        setAPIData(getData.data);
      });
  };

  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Mug</Table.HeaderCell>
            <Table.HeaderCell>Paid</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row key={data.id}>
                <Table.Cell>{data.mug}</Table.Cell>
                <Table.Cell>{data.checkbox ? 'Paid' : 'Unpaid'}</Table.Cell>
                <Link to="/update">
                  <Table.Cell>
                    <Button onClick={(e) => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
