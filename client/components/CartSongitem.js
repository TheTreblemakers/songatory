import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';

const CartSongItem = (props) => {
  const { song, handleSongDelete, isLoggedIn } = props;

  return (
    <Table.Row>
      <Table.Cell> {song.name}</Table.Cell>
      <Table.Cell> {song.album.name}</Table.Cell>
      <Table.Cell>{song.trackNumber}</Table.Cell>
      <Table.Cell>{song.displayPrice}</Table.Cell>
      <Table.Cell>
        <Button icon="remove" onClick={() => handleSongDelete(song.id, isLoggedIn)} />
      </Table.Cell>
    </Table.Row>
  );
};

export default CartSongItem;
