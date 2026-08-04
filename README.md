# React Redux CRUD App - Bug Fix Report

This project contains a React, Redux, and Firebase application where users can create, read, update, and delete (CRUD) posts. 

## Issue Description
Users reported that the "Update" functionality was not working. Clicking the update button on a post did not allow the user to modify the post contents, and in some instances, would cause the application to crash or lose data (such as post images).

## Root Causes
1. **Incorrect Event Handler**: In `Post.jsx`, clicking the update button was directly dispatching the Redux `updatePost` action with the unedited data instead of opening the modal so the user could edit the text.
2. **Infinite Rendering Loop / Missing Library**: The modal component (`Model.jsx`) was attempting to recursively render itself (`<Model>`) instead of using a proper modal library. Furthermore, the standard `react-modal` library was missing from the project dependencies.
3. **Data Loss on Update**: When the `handleSubmit` function in `Model.jsx` dispatched the updated data, it only passed the `title`, `description`, and `id`. This caused the Redux store to lose other essential fields associated with the post, such as the `image` URL.

## How We Fixed It
1. **Fixed the Update Button Action**:
   - Modified `Post.jsx` so that the "Update" button calls `openModel(post)` to properly trigger the modal to open with the selected post's data.
2. **Implemented `react-modal`**:
   - Ran `npm install react-modal` to add the required dependency.
   - Updated `Model.jsx` to import `Modal` from `react-modal`, and correctly wrapped the component's return value in `<Modal>` tags instead of recursively calling `<Model>`.
   - Set the root app element for accessibility: `Modal.setAppElement('#root')`.
3. **Preserved Existing Data on Update**:
   - Modified the `handleSubmit` function in `Model.jsx` to spread the existing post properties (`...post`) into the update payload. This ensures fields like `image` are kept intact in the Redux store after a title or description edit.
