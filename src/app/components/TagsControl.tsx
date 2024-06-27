import React, { useState } from 'react';
import { Form, Badge, Button } from 'react-bootstrap';

export function TagControl({name, tags, setTags}) {
  
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTag = () => {
    if (inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <Form.Group>
        <Form.Label>{name}</Form.Label>
        <div>
          {tags.map((tag, index) => (
            <Badge key={index} pill bg="info" className="me-2 mb-2">
              {tag}
              <Button variant="light" size="sm" className="ms-1" onClick={() => handleRemoveTag(tag)}>
                &times;
              </Button>
            </Badge>
          ))}
        </div>
        <div className="mt-2">
          <Form.Control
            type="text"
            placeholder="Enter tag"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
        </div>
      </Form.Group>
    </div>
  );
}

export default TagControl;
