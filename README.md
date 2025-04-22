# Solution

For this Google Forms clone, simplicity can come from storing all the form fields into one singular state variable: `form`. Different fields have different attributes, and this dynamic schema can be supported with the `elements` dictionary in `form`.

## State

We primarily need the following state: `form`, `currentPage`, `submittedData`, `formValues`

`form`: Stores the various form fields created from the Form Builder. Stored on the `App` component to ensure that form fields can be shared throughout the application in the `FormBuilder` and `FormPreview` components, passed down as a prop.

- `title`: form title
- `description`: form description
- `elements`: a list of form fields in JSON format. Unique IDs are generated for each form field with the use of Unix time with `Date.now()`.

`currentPage`: Helps to track which page is being seen right now. Page components are conditionally rendered based on `currentPage`

`submittedData`: Tracks whether the user has submitted the form. If so, conditionally render the success page.

`formValues`: Stores inputted data in the Form Preview from the user, to display in the success page in JSON.

## Form Building

New form fields should be added to the end of the `form.elements` array. We can construct a new field object with a new `id` (based on current timestamp of field creation), the specified `type`, and default `title` and `required` values. Use helper functions to modify state and have controlled data for field data, aka backed by component state.

Having a unique `id` for each field object simplifies things greatly as we can filter the existing list to modify / delete data from specific fields easily, though functions like `Array.prototype.splice` could work without unique `id`s.

## Form Preview

`formValues` keeps track of the inputted form data as a controlled component. It is a rather similar concept to Form Building but tracking the selected options in Checkbox may be tricky as multiple options can be selected at once. `handleChange` uses JavaScript's `Set` in a nifty way to handle checkbox options. Other options include using `prev.includes()` to check whether the option is checked or not previously and handling accordingly.

## Notes

Using React, the user input will be automatically escaped so there's no need to manually prevent Cross Site Scripting (XSS).

## Accessibility

All form `<input>`s should be labelled either via `<label`>s with `htmlFor` or aria-label attributes.

Checkboxes can be group with `<fieldset>` & `<legend>` to help screen readers understand related checkbox groups.

`<aria-required>` can be used for required input.

## Test cases

- Form Building

  - Adding a text element
  - Adding a paragraph element
  - Adding a checkbox element
  - Adding a select element
  - Adding multiple elements
  - Add tasks with potentially malicious content like HTML (e.g. <script>, <style> or <link>) and ensure there's no XSS.
  - Verify deletes work
  - Verify save works (fields persist through refreshes).

- Form Preview
  - Verify form fields are present
  - Verify form title & description are correct
  - Ensure data submitted is correct on success page (especiallly checkbox / select)
  - Form submit can be done in succession correctly - Required attributes are required
