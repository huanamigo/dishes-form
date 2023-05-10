import { useEffect, useState } from 'react';
import { DishFormState, Touch, ValidationErrors } from '../../../interface';
import Input from '../Input/Input';
import styles from './Form.module.scss';
import {
  validateForm,
  handleTypeChange,
  handleSubmit,
  handleInputChange,
} from './functions';

const Form = () => {
  const [formState, setFormState] = useState<DishFormState>({
    name: '',
    preparation_time: '',
    type: 'pizza',
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    name: '',
    preparation_time: '',
    spiciness_scale: '',
    no_of_slices: '',
    diameter: '',
    slices_of_bread: '',
  });

  const [touchedInputs, setTouchedInputs] = useState<Touch>({
    name: false,
    preparation_time: false,
    spiciness_scale: false,
    no_of_slices: false,
    diameter: false,
    slices_of_bread: false,
  });

  useEffect(() => {
    validateForm(formState, setValidationErrors);
  }, [formState]);

  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) =>
          handleSubmit(
            e,
            formState,
            validationErrors,
            setFormState,
            setTouchedInputs
          )
        }
      >
        <h1>Dish form!</h1>
        <Input
          label="Dish Name"
          name="name"
          value={formState.name}
          handleTypeChange={(e) =>
            handleTypeChange(e, setFormState, setTouchedInputs)
          }
          placeholder="Enter dish name"
          validation={validationErrors?.name}
          type="text"
          touched={touchedInputs.name}
        />
        <Input
          label="Preparation Time"
          name="preparation_time"
          value={formState.preparation_time}
          pattern="^\d{2}:\d{2}:\d{2}$"
          handleTypeChange={(e) =>
            handleTypeChange(e, setFormState, setTouchedInputs)
          }
          placeholder="Enter time in HH:MM:SS format"
          validation={validationErrors?.preparation_time}
          type="text"
          touched={touchedInputs.preparation_time}
        />
        <div>
          <label htmlFor="type">Dish Type</label>
          <br />
          <select
            id="type"
            name="type"
            value={formState.type}
            onChange={(e) =>
              handleTypeChange(e, setFormState, setTouchedInputs)
            }
          >
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="sandwich">Sandwich</option>
          </select>
        </div>

        {formState.type === 'pizza' && (
          <>
            <Input
              label="Number of slices"
              name="no_of_slices"
              value={formState.no_of_slices}
              handleInputChange={(e) =>
                handleInputChange(e, setFormState, setTouchedInputs)
              }
              placeholder="Enter number of slices"
              validation={validationErrors?.no_of_slices}
              type="number"
            />
            <Input
              label="Diameter"
              name="diameter"
              value={formState.diameter}
              handleInputChange={(e) =>
                handleInputChange(e, setFormState, setTouchedInputs)
              }
              placeholder="Enter diameter"
              validation={validationErrors?.diameter}
              type="number"
              step={0.1}
            />
          </>
        )}

        {formState.type === 'soup' && (
          <Input
            label="Spiciness Scale"
            name="spiciness_scale"
            value={formState.spiciness_scale}
            handleInputChange={(e) =>
              handleInputChange(e, setFormState, setTouchedInputs)
            }
            placeholder="Enter spiciness scale from 1 to 10"
            validation={validationErrors?.spiciness_scale}
            type="number"
            max={10}
          />
        )}

        {formState.type === 'sandwich' && (
          <Input
            label="Slices of Bread"
            name="slices_of_bread"
            value={formState.slices_of_bread}
            handleInputChange={(e) =>
              handleInputChange(e, setFormState, setTouchedInputs)
            }
            placeholder="Enter spiciness scale"
            validation={validationErrors?.slices_of_bread}
            type="number"
          />
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
