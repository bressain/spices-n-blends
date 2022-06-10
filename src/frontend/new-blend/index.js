import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useGetAllBlends, useGetAllSpices, useSaveBlend } from '../api';
import DetailLayout from '../components/detail-layout';

const FormControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  max-width: 500px;

  label {
    font-size: 0.8em;
  }
`;
const ErrorLabel = styled.span`
  color: red;
  font-size: 0.8em;
  margin-left: 4px;
`;

function NewBlend() {
  const spicesQuery = useGetAllSpices();
  const blendsQuery = useGetAllBlends();
  const saveBlend = useSaveBlend();
  const [errors, setErrors] = useState();

  const getErrors = useCallback((blend) => {
    if (blend.name && blend.spices.length) return;

    const errorsFound = {};
    if (!blend.name) {
      errorsFound.name = true;
    }
    if (!blend.spices.length) {
      errorsFound.spices = true;
    }
    return errorsFound;
  }, []);

  const onSaveBlend = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const blend = {
        name: formData.get('name'),
        description: formData.get('description'),
        spices: formData.getAll('spices').map((s) => +s),
        blends: formData
          .getAll('blends')
          .filter((b) => !!b)
          .map((b) => +b),
      };
      const errorsFound = getErrors(blend);
      if (errorsFound) {
        setErrors(errorsFound);
      } else {
        saveBlend.mutate(blend);
        e.target.reset();
        setErrors(undefined);
      }
    },
    [getErrors, saveBlend]
  );

  return (
    <DetailLayout>
      <h1>Add New Blend</h1>
      <form onSubmit={onSaveBlend}>
        <FormControlContainer>
          <div>
            <label htmlFor="name">Name *</label>
            {errors?.name && <ErrorLabel>Please provide a name</ErrorLabel>}
          </div>
          <input name="name" type="text" />
        </FormControlContainer>
        <FormControlContainer>
          <label htmlFor="description">Description</label>
          <input name="description" type="text" />
        </FormControlContainer>
        <FormControlContainer>
          <div>
            <label htmlFor="spices">Spices *</label>
            {errors?.spices && (
              <ErrorLabel>Please select at least one spice</ErrorLabel>
            )}
          </div>
          {!spicesQuery.isLoading && (
            <select name="spices" multiple size={10}>
              {spicesQuery.data.map((spice) => (
                <option key={spice.id} value={spice.id}>
                  {spice.name}
                </option>
              ))}
            </select>
          )}
        </FormControlContainer>
        <FormControlContainer>
          <label htmlFor="spices">Included blends</label>
          {!blendsQuery.isLoading && (
            <select name="blends" multiple size={10}>
              <option value="">--None--</option>
              {blendsQuery.data.map((blend) => (
                <option key={blend.id} value={blend.id}>
                  {blend.name}
                </option>
              ))}
            </select>
          )}
        </FormControlContainer>
        <button type="submit">Save</button>
      </form>
    </DetailLayout>
  );
}

export default NewBlend;
