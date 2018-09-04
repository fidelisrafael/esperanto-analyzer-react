import React, { Component } from 'react';
import FieldTextArea, { FieldTextAreaStateless } from '@atlaskit/field-text-area';
import Button from '@atlaskit/button';

import MediaServicesTextIcon from '@atlaskit/icon/glyph/media-services/text';

import Form, {
  Field,
  FieldGroup,
  FormHeader,
  FormSection,
  FormFooter,
} from '@atlaskit/form';

class SentenceTextArea extends Component {
  render() {
    return (
      <div>
        <fieldset>
          <FieldTextAreaStateless
              autoFocus
              value={this.props.sentence}
              label={<span><MediaServicesTextIcon size='small'/> Text in Esperanto</span>}
              onChange={this.props.onChange}
              required
              minimumRows={15}
              maxLength={2048}
            />
        </fieldset>
        <fieldset>
          <Button
            onClick={this.props.onSubmit}
            type="submit"
            appearance="primary"
            isDisabled={!this.props.sentence || this.props.sentence.length < 2}
          >
            {this.props.buttonText || 'Analyze'}
          </Button>
        </fieldset>
      </div>
    );
  }
}

export default SentenceTextArea;
