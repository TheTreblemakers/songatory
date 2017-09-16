import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const CartAlbumItem = (props) => {
  const {song} = props;

  return (
      <Table.Row>
        <Table.Cell> {song.name}</Table.Cell>
        <Table.Cell> {song.album.name}</Table.Cell>
        <Table.Cell>{song.trackNumber}</Table.Cell>
        <Table.Cell>{song.displayPrice}</Table.Cell>
      </Table.Row>
  );
};

export default CartAlbumItem;
