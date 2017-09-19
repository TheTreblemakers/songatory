import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Image, Card, Icon } from 'semantic-ui-react';

const ArtistCard = (props) => {
  const artist = props.artist;
  const imgUrl = artist.image;
  const artistUrl = `/artists/${artist.id}`;
  return (
    <Card key={props.key} raised>
      <Image size="medium" src={imgUrl} as={Link} to={artistUrl} />
      <Card.Content>
        <Card.Header>{artist.name}</Card.Header>
        <Card.Meta>{artist.bio.split('.')[0]}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Link to={artistUrl}>See More</Link>
      </Card.Content>
    </Card>
  );
};

export default withRouter(ArtistCard);
