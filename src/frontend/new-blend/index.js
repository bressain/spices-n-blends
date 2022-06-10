import { useCallback, useState } from 'react';
import { useGetAllBlends, useGetAllSpices, useSaveBlend } from '../api';

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
        blends: formData.getAll('blends').map((b) => +b),
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
    <div>
      <h1>Add New Blend</h1>
      <form onSubmit={onSaveBlend}>
        <div>
          <label htmlFor="name">* Name</label>
          {errors?.name && <span>Please provide a name</span>}
          <input name="name" type="text" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input name="description" type="text" />
        </div>
        <div>
          <label htmlFor="spices">* Spices</label>
          {errors?.spices && <span>Please select at least one spice</span>}
          {!spicesQuery.isLoading && (
            <select name="spices" multiple>
              {spicesQuery.data.map((spice) => (
                <option key={spice.id} value={spice.id}>
                  {spice.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label htmlFor="spices">Included Blends</label>
          {!blendsQuery.isLoading && (
            <select name="blends" multiple>
              <option value="">--None--</option>
              {blendsQuery.data.map((blend) => (
                <option key={blend.id} value={blend.id}>
                  {blend.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default NewBlend;
