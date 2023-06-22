import React, { useState } from 'react'

export const Radio = ({ pergunta, options, id, onChange, value, active }) => {
  const [labelClicked, setLabelClicked] = useState('');

  const handleLabelClick = (event) => {
    const selectedValue = event.target.value;
    setLabelClicked(selectedValue);
    onChange(event);
  }

  if(active === false) return null;
  return (
    <fieldset>
      <legend>{pergunta}</legend>
      {options.map(option => (
        <label 
          key={option}
          onClick={handleLabelClick}
          className={labelClicked === option ? 'clicked' : ''}
        >
          <input 
            type="radio" 
            id={id}
            value={option} 
            checked={value === option}
            onChange={onChange}
          />
          {option}
        </label>
      ))}
    </fieldset>
  )
}
