import React from "react"
import PropTypes from "prop-types"

const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  value: buttonValue,
  label,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="radio"
        value={buttonValue}
        checked={value === buttonValue}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />{" "}
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

RadioButton.propTypes = {
  field: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

const RadioButtonGroup = props => {
  return <div>{props.children}</div>
}

RadioButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
}

export { RadioButtonGroup, RadioButton }
