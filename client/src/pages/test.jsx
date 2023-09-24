import React from 'react';

const originalArray = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 7', 'Item 7', 'Item 9', 'Item 10', 'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15', ];
const reversedArray = originalArray.slice().reverse()

const containerStyle = {
  overflowY: 'scroll',
  maxHeight: '300px', // Set a maximum height for the scrollable area
  border: '1px solid #ccc',
  padding: '10px',
  width: '200px',
  display: 'flex',
  flexDirection: 'column-reverse', // Display flex items in reverse column order
};

const itemStyle = {
  border: '1px solid #ddd',
  padding: '5px',
  margin: '5px',
};

function App() {
  return (
    <div>
      <h1>Reversed List with Scroll</h1>
      <div style={containerStyle}>
        {reversedArray.map((item, index) => (
          <div key={index} style={itemStyle}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
