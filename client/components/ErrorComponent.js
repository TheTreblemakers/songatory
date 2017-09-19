import React from 'react';
import { Label, Button } from 'semantic-ui-react'

const ErrorComponent = (props) => {
  const {error, handleErrorClear} = props;
  return (
    <div>
      <Label>
        <Label.Detail>{error.response.data}l</Label.Detail>
      </Label>
      <Button icon="remove" onClick = {() => handleErrorClear(error)}>
        Clear Error
      </Button>
    </div>
  );
};

export default ErrorComponent;
