import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Image, Card, Icon } from 'semantic-ui-react';

const AlbumCard = (props) => {
  const album = props.album;
  const imgUrl = album.image;
  const albumUrl = `/albums/${album.id}`;
  return (
    <Card key={props.key} raised>
      <Image src={imgUrl} as={Link} to={albumUrl} />
      <Card.Content>
        <Card.Header>{album.name}</Card.Header>
        <Card.Meta>{`${album.artist.name}`}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Icon name="right chevron" />
        <Link to={albumUrl}>See More</Link>
      </Card.Content>
    </Card>
  );
};

export default withRouter(AlbumCard);
