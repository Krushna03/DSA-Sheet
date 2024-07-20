import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Controller } from 'react-hook-form';
import { Box, FormControl, Select, MenuItem } from '@mui/material';

const MonacoEditor = ({ control, value, onChange }) => {
  const languages = ['javascript', 'python', 'java', 'c++', 'c'];
  const [theme, setTheme] = useState('vs-dark');
  const [language, setLanguage] = useState('javascript');

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className='my-5 border border-gray-300 p-3'>
      <Box display="flex" alignItems="center" mb={2}>
        <FormControl variant="outlined" size="small" sx={{ mr: 2 }}>
          <Select value={language} onChange={handleLanguageChange}>
            {languages.map((lang) => (
              <MenuItem key={lang} value={lang}>{lang}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" sx={{ mr: 2 }}>
          <Select
            labelId="theme-select-label"
            value={theme}
            onChange={handleThemeChange}
          >
            <MenuItem value="vs-dark">Dark</MenuItem>
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="hc-black">High Contrast</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Controller
        name="code"
        control={control}
        defaultValue={value}
        render={({ field }) => (
          <Editor
            height="90vh"
            language={language}
            value={field.value}
            onChange={field.onChange}
            theme={theme}
          />
        )}
      />
    </div>
  );
};

export default MonacoEditor;
