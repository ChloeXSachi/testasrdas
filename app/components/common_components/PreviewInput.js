import React from 'react';
import PropTypes from 'prop-types';

const compStyle = {
  borderColor: 'gray',
  borderWidth: 2
};

class PreviewInput extends React.Component {
  render() {
    return (
      <>
        <div className="button" style={compStyle}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,react/destructuring-assignment */}
          <label htmlFor="multi">Word: <b>{this.props.label}</b> &nbsp;&nbsp;</label>
          <span>Type: <b>{this.props.type}</b></span>
          <span>Category: <b>{this.props.category}</b></span>
          <button type="button">Browse</button>
          <input
            name={this.props.name}
            type="file"
            id="multi"
            onChange={this.props.onChange}
            multiple
          />
        </div>
        <div className="form-group multi-preview">
          {(this.props.files || []).map(url => (
            <img src={url} alt="preview" />
          ))}
        </div>
        {this.props.error && <p>{this.props.error}</p>}
        <button onClick={this.props.remove} id={this.props.pid}>-</button>

      </>
    );
  }
}

PreviewInput.defaultProps = {
  error: ''
};

PreviewInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  pid: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  error: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  files: PropTypes.any
};

export default PreviewInput;
