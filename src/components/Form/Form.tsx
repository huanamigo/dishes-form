import { useState } from 'react';
import axios from 'axios';
import { DishFormState, ValidationErrors } from '../../../interface';
import Input from '../Input/Input';
import styles from './Form.module.scss';

const DishForm = () => {
  const [formState, setFormState] = useState<DishFormState>({
    name: '',
    preparation_time: '',
    type: 'pizza',
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const handleTypeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (event.target.name === 'type') {
      setFormState({
        name: formState.name,
        preparation_time: formState.preparation_time,
        type: formState.type,
        [name]: value,
      });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: parseFloat(value),
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formState);

    try {
      const response = await axios.post(
        'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/',
        formState
      );

      console.log(response);

      setFormState({
        name: '',
        preparation_time: '',
        type: 'pizza',
        no_of_slices: 0,
        diameter: 0,
      });

      console.log(
        `Successfully submitted dish form with ID ${response.data.id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Dish form!</h1>
        <Input
          label="Dish Name"
          name="name"
          value={formState.name}
          handleTypeChange={handleTypeChange}
          placeholder="Enter dish name"
        />
        <Input
          label="Preparation Time"
          name="preparation_time"
          value={formState.preparation_time}
          pattern="^\d{2}:\d{2}:\d{2}$"
          handleTypeChange={handleTypeChange}
          placeholder="Enter time in HH:MM:SS format"
        />
        <div>
          <label htmlFor="type">Dish Type</label>
          <br />
          <select
            id="type"
            name="type"
            value={formState.type}
            onChange={handleTypeChange}
            required
          >
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="sandwich">Sandwich</option>
          </select>
        </div>

        {formState.type === 'pizza' && (
          <>
            <div>
              <label htmlFor="no_of_slices">Number of Slices</label>
              <br />
              <input
                type="number"
                id="no_of_slices"
                name="no_of_slices"
                value={formState.no_of_slices}
                onChange={handleInputChange}
                min="1"
                placeholder="Enter number of slices"
                required
              />
            </div>
            <div>
              <label htmlFor="diameter">Diameter</label>
              <br />
              <input
                type="number"
                id="diameter"
                name="diameter"
                value={formState.diameter}
                onChange={handleInputChange}
                step="0.1"
                placeholder="Enter diameter"
                required
              />
            </div>
          </>
        )}

        {formState.type === 'soup' && (
          <div>
            <label htmlFor="spiciness_scale">Spiciness Scale</label>
            <br />
            <input
              type="number"
              id="spiciness_scale"
              name="spiciness_scale"
              value={formState.spiciness_scale}
              onChange={handleInputChange}
              min="1"
              max="10"
              placeholder="Enter spiciness from 1 to 10"
              required
            />
          </div>
        )}

        {formState.type === 'sandwich' && (
          <div>
            <label htmlFor="slices_of_bread">Slices of Bread</label>
            <br />
            <input
              type="number"
              id="slices_of_bread"
              name="slices_of_bread"
              value={formState.slices_of_bread}
              onChange={handleInputChange}
              min="1"
              placeholder="Enter number of slices"
              required
            />
          </div>
        )}

        {Object.keys(validationErrors).length > 0 && (
          <div>
            <ul>
              {Object.entries(validationErrors).map(([fieldName, message]) => (
                <li key={fieldName}>
                  <strong>{fieldName}:</strong> {message}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DishForm;
