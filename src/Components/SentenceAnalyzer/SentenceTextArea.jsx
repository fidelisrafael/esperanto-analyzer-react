import React, { Component } from 'react';
import FieldTextAreaStateless from '@atlaskit/field-text-area';
import Button from '@atlaskit/button';

import MediaServicesTextIcon from '@atlaskit/icon/glyph/media-services/text';

const styles = {
  fieldset: {
    display: 'block',
    marginBottom: '15px'
  }
}


class SentenceTextArea extends Component {
  render() {
    const {
      canSubmit, sentence,
      onChange, onSubmit,
      buttonText
    } = this.props

    return (
      <div>
        <fieldset style={styles.fieldset}>
          <FieldTextAreaStateless
              autoFocus
              value={sentence}
              label={<span><MediaServicesTextIcon size='small'/> Text in Esperanto</span>}
              onChange={onChange}
              required
              minimumRows={15}
              maxLength={2048}
            />
        </fieldset>
        <fieldset>
          <Button
            onClick={onSubmit}
            type="submit"
            appearance="primary"
            isDisabled={!canSubmit}
          >
            {buttonText || 'Analyze'}
          </Button>
        </fieldset>
      </div>
    );
  }
}

export default SentenceTextArea;
