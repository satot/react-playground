/* globals module: false */
import { createSelector, createStructuredSelector } from 'reselect';
import { fileName } from './validator';

const fileNameSelector = createSelector(
    (state) => state.file.name,
    (name) => fileName(name)
);

// mapping
const rootSelector = createStructuredSelector({
    name: fileNameSelector
});

module.exports = rootSelector;
