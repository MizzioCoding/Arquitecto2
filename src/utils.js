import { useState, useEffect } from 'react';



export const getSubfolders = (titulo) => {
    const context = require.context(`../assets/${titulo}`, true, /Carrousel$/);
    const subfolders = context.keys().map((key) => {
      const parts = key.split('/');
      return parts[parts.length - 3]; // Obtiene el nombre de la subcarpeta
    });
    return [...new Set(subfolders)]; // Elimina duplicados
  };
  
  export const getImagePaths = (titulo, subcarpeta) => {
    const context = require.context(`../assets/${titulo}/${subcarpeta}/Carrousel`, false, /\.(png|jpe?g|svg)$/);
    const imagePaths = context.keys().map((file) => {
      return context(file);
    });
    return imagePaths;
  };