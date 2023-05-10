import { DishFormState, ValidationErrors, Touch } from '../../../interface';
import axios from 'axios';

export const validateForm = (
  formState: DishFormState,
  setValidationErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>
) => {
  if (formState.name === '') {
    setValidationErrors((prev) => ({
      ...prev,
      name: 'Name cannot be empty',
    }));
  } else {
    setValidationErrors((prev) => ({
      ...prev,
      name: '',
    }));
  }

  if (formState.preparation_time === '') {
    setValidationErrors((prev) => ({
      ...prev,
      preparation_time: 'Time cannot be empty',
    }));
  } else {
    setValidationErrors((prev) => ({
      ...prev,
      preparation_time: '',
    }));
  }

  if (formState.type === 'soup' && formState.spiciness_scale === undefined) {
    setValidationErrors((prev) => ({
      ...prev,
      spiciness_scale: 'Spiciness cannot be empty',
    }));
  } else {
    setValidationErrors((prev) => ({
      ...prev,
      spiciness_scale: '',
    }));
  }

  if (
    formState.type === 'sandwich' &&
    formState.slices_of_bread === undefined
  ) {
    setValidationErrors((prev) => ({
      ...prev,
      slices_of_bread: 'Number of slices cannot be empty',
    }));
  } else {
    setValidationErrors((prev) => ({
      ...prev,
      slices_of_bread: '',
    }));
  }

  if (formState.type === 'pizza' && formState.no_of_slices === undefined) {
    setValidationErrors((prev) => ({
      ...prev,
      no_of_slices: 'Number of slices cannot be empty',
    }));
  } else {
    setValidationErrors((prev) => ({
      ...prev,
      no_of_slices: '',
    }));
  }

  if (formState.type === 'pizza' && formState.diameter === undefined) {
    setValidationErrors((prev) => ({
      ...prev,
      diameter: 'Diameter cannot be empty',
    }));
  } else {
    setValidationErrors((prev) => ({
      ...prev,
      diameter: '',
    }));
  }
};

const handleTouch = (
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setTouchedInputs: React.Dispatch<React.SetStateAction<Touch>>
) => {
  const { name } = event.target;
  setTouchedInputs((prev) => ({
    ...prev,
    [name]: true,
  }));
};

export const handleTypeChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setFormState: React.Dispatch<React.SetStateAction<DishFormState>>,
  setTouchedInputs: React.Dispatch<React.SetStateAction<Touch>>
) => {
  handleTouch(event, setTouchedInputs);
  const { name, value } = event.target;
  if (event.target.name === 'type') {
    setFormState((prev) => ({
      name: prev.name,
      preparation_time: prev.preparation_time,
      type: prev.type,
      [name]: value,
    }));
  } else {
    setFormState((prev) => ({ ...prev, [name]: value }));
  }
};

export const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setFormState: React.Dispatch<React.SetStateAction<DishFormState>>,
  setTouchedInputs: React.Dispatch<React.SetStateAction<Touch>>
) => {
  handleTouch(event, setTouchedInputs);
  const { name, value } = event.target;
  setFormState((prev) => ({
    ...prev,
    [name]: Number(value),
  }));
};

function toSubmit<T extends ValidationErrors>(p: T) {
  for (const k in p) {
    if (p[k] !== '') {
      return false;
    }
  }
  return true;
}

export const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  formState: DishFormState,
  validationErrors: ValidationErrors,
  setFormState: React.Dispatch<React.SetStateAction<DishFormState>>,
  setTouchedInputs: React.Dispatch<React.SetStateAction<Touch>>
) => {
  event.preventDefault();

  if (!toSubmit(validationErrors)) {
    setTouchedInputs({
      name: true,
      preparation_time: true,
      spiciness_scale: true,
      no_of_slices: true,
      diameter: true,
      slices_of_bread: true,
    });
    return;
  }
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
    setTouchedInputs({
      name: false,
      preparation_time: false,
      spiciness_scale: false,
      no_of_slices: false,
      diameter: false,
      slices_of_bread: false,
    });

    alert(`Successfully submitted dish form with ID ${response.data.id}`);
  } catch (error) {
    alert(error);
  }
};
