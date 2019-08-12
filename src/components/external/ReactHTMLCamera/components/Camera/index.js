import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// for debugging with git cloned jslib-html5-camera-photo
// clone jslib-html5-camera-photo inside /src and replace
// from 'jslib-html5-camera-photo' -> from '../../../jslib-html5-camera-photo/src/lib';
import LibCameraPhoto, { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo';

import CircleButton from '../CircleButton';
import WhiteFlash from '../WhiteFlash';
import DisplayError from '../DisplayError';

import {getShowHideStyle,
  getVideoStyles,
  isDynamicPropsUpdate,
  playClickAudio,
  printCameraInfo} from './helpers';
import './styles/camera.css';

/*
Inspiration : https://www.html5rocks.com/en/tutorials/getusermedia/intro/
*/


const Overlay = () => (
  <div className="overlay">
    <div className="above-marker">
      <div className="above-left" >
        <img style={{ width: '20px', margin: '16px' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAAB+CAYAAADhuGnlAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOxAAADsQBlSsOGwAABCZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjA8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjk2PC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj45NjwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjEzNDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTI2PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGRjOnN1YmplY3Q+CiAgICAgICAgICAgIDxyZGY6QmFnLz4KICAgICAgICAgPC9kYzpzdWJqZWN0PgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wOC0wOVQxMjowODo4NDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+UGl4ZWxtYXRvciAzLjguNTwveG1wOkNyZWF0b3JUb29sPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4Kdanr4QAABDxJREFUeAHtnM1KVWEUhtc+6MAcFeLESRJegDdQNxMRXVBIOHDmwLsQmoghNBVnav5kJf4lnuNu76CRo/a76vt8eXQmrvV97/M+HM4GPc27N9G+fR2x9CL4eoQEdvciVlYj3n+IJvP6zeetaJEiE+n/39XLsfQ8Xs3Mx2bW6SOkyEJZbk/fYTMdy5k3GGUuY1dBAm0sZJ6OGJk0y+6azTweMTJplt01lXk8YmTSLLir7d5mZB6PGJk0jXYhhkuZLa8YLlVWnYNXjKrrKXc5xCjHvuqTEaPqespdDjHKsa/6ZMSoup5yl0OMcuyrPhkxqq6n3OUQoxz7qk9GjKrrKXc5xCjHvuqTEaPqespdDjHKsa/6ZMSoup5yl0OMcuyrPhkxqq6n3OUQoxz7qk9GjKrrKXc5xCjHvuqTEaPqev7ick10fyie94UYeSyLbur+dwAxijZQ7+HjzKvxipFJs+yuq8zjESOTZsldTRxkHo8YmTQL7eo/H6O9i53M4xEjk2aBXX8+USfzQ1P6GKn/IZ3F5eRrnB9+iW8XF3E7nsTkfpK1+dHvaftHj47H/fVVjI9O4nJrO07XN2I/O1lzc5b7mJNwwdW2ibXj8/i0uBg/E/axYgCBql4xTs/ix9xcrD15Fh8HZGEkkUBV7zEODuP7zNPYTszHqoEEqhKjf0/RNHE7MAtjiQSqEqN/o5mYjVUCgarE4OlDaDJ5tCoxkrOxTiCAGAI851HEcG5XyIYYAjznUcRwblfIhhgCPOdRxHBuV8iGGAI851HEcG5XyIYYAjznUcRwblfIhhgCPOdRxHBuV8iGGAI851HEcG5XyIYYAjznUcRwblfIhhgCPOdRxHBuV8iGGAI851HEcG5XyIYYAjznUcRwblfIhhgCPOdRxHBuV8iGGAI851HEcG5XyIYYAjznUcRwblfIhhgCPOdRxHBuV8iGGAI851HEcG5XyIYYAjznUcRwblfIhhgCPOdRxHBuV8iGGAI851HEcG5XyIYYAjznUcRwblfIhhgCPOdRxHBuV8iGGAI851HEcG5XyIYYAjznUcRwblfIhhgCPOdRxHBuV8iGGAI851HEcG5XyIYYAjznUcRwblfIhhgCPOdRxHBuV8iGGAI851HEcG5XyIYYAjznUcRwblfIhhgCPOdRxHBuV8iGGAI851HEcG5XyIYYAjznUcRwblfIVpUYrRCE0VwCVYnRROBGbr+Dt1UlxmQS94OTMJhKoCoxrq9jnJqOZYMJVCXG0XFcDk7CYCqB0e5e6r7By/p7bG3H6eAFDKYSGK2sRpSWoz+/v8f6RuynpmPZYALdg0DEzUm8bKZjuXvrtxBNzHaPBlPd80HTfffPCb9/Z/AJDwf7jW23dNztvopRHLR3sTMzH5sPf5WfQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAIF/SuAXuhh+KAWMPXUAAAAASUVORK5CYII=" alt="" />
         </div>
      <div className="above-right" >
        <img style={{ width: '20px', margin: '16px' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB/CAYAAADPVr1pAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOxAAADsQBlSsOGwAABCZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjA8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjk2PC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj45NjwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjEyMzwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTI3PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGRjOnN1YmplY3Q+CiAgICAgICAgICAgIDxyZGY6QmFnLz4KICAgICAgICAgPC9kYzpzdWJqZWN0PgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wOC0wOVQxMzowODoxNDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+UGl4ZWxtYXRvciAzLjguNTwveG1wOkNyZWF0b3JUb29sPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KykBvBAAABCVJREFUeAHtnLtOFVEYRv/hEkUkKAhesFHjAxCNMZrwFhZ2FsYYn8aSgsfwBaQ0JDTGhhBsMIpECwRCuIwzxpbsfU7Y3zcc1rRn73/NXiuEgWROFRnXuzdRv30d8fBBxmKWdM7A2nrE4lJElbqz/a1YWPsaHwmdMtXtz9vgQ6lbrEZjntApS93/vG2YjB11zHX/KNxhjoF07IjxnEGs6b6BnNgj3T8Gd5hjIBm7zniIywGxxm8gGdt/i9zBWRlIx67Tf56d1c0wp6yBdOyyfKYLDRBbKNuNIra7gJBPbKFsN4rY7gJCPrGFst0oYrsLCPnEFsp2o4jtLiDkE1so240itruAkE9soWw3itjuAkI+sYWy3ShiuwsI+cQWynajiO0uIOQTWyjbjSK2u4CQn45dNa8JcA2EgWTs5mUwYg9E6pzXfyKOBuSsF/4YyZ/sxtDuhbc0IALSsavYHJCzXvhjJGPXh7HavtvLdf4NJGOPzcZy+9Y+wc9/7OQ3L/w/4vuXL+Luk8cxc2s2rl4Zj5Gh4RhqN7cv/uUOOf+6Tj9B4yNGhmN4YiIu3bkdU7M3YvL01Z5P6HTG3jc24vLNyXhU1fGqGd18E013LmIXarH3K55vb8eHmem4VgjR89jk7+yeJ7Lhn4Gx67Gy+S1+d0kHsQvVaB5kDnZ24qDQ+L7GErsvbXmbjo7jOG+lZhWxC3o+6VTqvP+NF9TBaKUBfrKVts0sYpsDKPHEVto2s4htDqDEE1tp28witjmAEk9spW0zi9jmAEo8sZW2zSximwMo8cRW2jaziG0OoMQTW2nbzCK2OYAST2ylbTOL2OYASjyxlbbNLGKbAyjxxFbaNrOIbQ6gxBNbadvMIrY5gBJPbKVtM4vY5gBKPLGVts0sYpsDKPHEVto2s4htDqDEE1tp28witjmAEk9spW0zi9jmAEo8sZW2zSximwMo8cRW2jaziG0OoMQTW2nbzCK2OYAST2ylbTOL2OYASjyxlbbNLGKbAyjxxFbaNrOIbQ6gxBNbadvMIrY5gBJPbKVtM4vY5gBKPLGVts0sYpsDKPHEVto2s4htDqDEE1tp28witjmAEk9spW0zi9jmAEo8sZW2zSximwMo8cRW2jaziG0OoMQTW2nbzCK2OYAST2ylbTOL2OYASjyxC9quC87uZzSx+7GWuaeK6FRvYmeG62fZ8XGc9LOv1B5ilzLbzN3bi6OC43seTeyeleVv+P4j/uSvLr+S2AUdf1qJn2vrBQE9jG7vY7iH9Szt0cDnL/GsquLp/XsR01M9bj7D5W3oxaWI5oGRq7SB/a1YqEZjvnlcm2uMjzeP6CPNc3rrvoT/dnLdDD5qGLsxFJv1YayOzcZy6XMyHwMYwAAGMIABDGAAAxjAAAYwgAEMYAADGMAABjDQNQN/AYYYXHzTSTFPAAAAAElFTkSuQmCC" alt="" />
           </div>
    </div>

    <div className="below-marker">
      <div className="below-left" >
        <img style={{ width: '20px', margin: '16px' }}src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB3CAYAAADFLPRAAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOxAAADsQBlSsOGwAABCZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjA8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjk2PC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj45NjwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjEyNjwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTE5PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGRjOnN1YmplY3Q+CiAgICAgICAgICAgIDxyZGY6QmFnLz4KICAgICAgICAgPC9kYzpzdWJqZWN0PgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wOC0wOVQxMzowODoyMjwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+UGl4ZWxtYXRvciAzLjguNTwveG1wOkNyZWF0b3JUb29sPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KVDpHggAAA5BJREFUeAHtm89OU0Echc9tSxCQRCWgkY1K+gAkxI2JvoorF654BF/BDRqiaxN9C5bGhI1xQwwuRAkqYhCIoe11JpEqG2BMezv0fHfTf8Pc3/m+nrRNuBIHBCAAAQhAAAIQgMDQEChikoMt3S1GNK+OZlVoopQaKsO9+Gq87e0RdyzDpq2w955q2igPtTo2o5XenobdTiLQePhA5doHqTn3Z1mw3j3+vd99sgd3wr7drTtSPH+YQ0vLehx2X+zBGdjiFAL150/0qCv9lMX9ennqinTrprSzo4237/SyX+dh378EaoOWfjRKnOP2gqaPHnPbXwK1/m6ftvu1q7qY9hes/l8CWYkfHw9fKjkqIZCV+Ho9fMfnqIRAVqDDN/1e/3SsBOJ5PElW4rFe3VsoK/HVxeZMiDd9DyAe8aYETGPTeMSbEjCNTeMRb0rANDaNR7wpAdPYNB7xpgRMY9N4xJsSMI1N4xFvSsA0No1HvCkB09g0HvGmBExj03jEmxIwjU3jEW9KwDQ2jUe8KQHT2DQe8aYETGPTeMSbEjCNTeMRb0rANDaNR7wpAdPYNB7xpgRMY9N4xJsSMI1N4xFvSsA0No1HvCkB09g0HvGmBExj03jEmxIwjU3jEW9KwDQ2jUe8KQHT2DQe8aYETGPTeMSbEjCNTeMRb0rANDaNR7wpAdPYNB7xpgRMY9N4xJsSMI1N4xFvSsA0No1H/OAJ1OqDn8Flgqwa36gL9RW987ISPzmp0bLUaEXZrU+TlfjZ67p88F0L1kYqCp+V+OkpXSpK3d/f1p31dV2oiIHlaYqDbypzS771VT8+fdb27q5+tdpqd9q5TTiwecInoRR4dPb31Nrc0s/Xb/TlxSt9DE8vpkyVpfiUAO5r195LT59JS8sqUlggPoVWpmuj/OYN3Rub0cpZR8zqM/6sQ7PuOIHmnFSMaP74syc/QvzJfM7Pq6VmU4ZFfAqtvNdOpIyH+BRaea9tpIyH+BRaGa8NP/OSvtUjPmOZSaOViE/i5bqYxpuaRzziTQmYxqbxiDclYBqbxiPelIBpbBqPeFMCprFpPOJNCZjGpvGINyVgGpvGI96UgGlsGo94UwKmsWk84k0JDEvsIu0aSBo/JOLDv9gmXfyK+CERH2K0UqIgPoVW3mv3UsZDfAqtnNcW2kgZrxYvseU43wSiw/JQqykpavGieuSnIMtrbXQXHaZcGx8T/AbLS3TXltNUvgAAAABJRU5ErkJggg==" alt="" />
         </div>
      <div className="below-right" >
        <img style={{ width: '20px', margin: '16px' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB3CAYAAADFLPRAAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOxAAADsQBlSsOGwAABCZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjA8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjk2PC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj45NjwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjEyNjwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTE5PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGRjOnN1YmplY3Q+CiAgICAgICAgICAgIDxyZGY6QmFnLz4KICAgICAgICAgPC9kYzpzdWJqZWN0PgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOS0wOC0wOVQxMzowODo4OTwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+UGl4ZWxtYXRvciAzLjguNTwveG1wOkNyZWF0b3JUb29sPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KW5tXfAAABAdJREFUeAHt27FOFFEYxfFvmDXIAlFBVgQbJTR2JITGhLegoLMgxJAY45tQWvg0vAAPQAw0NBRaIQWY8Q4RY2Oyd+EeDrP/TYwWl3vOnF9gIcEIXizAAizAAizAAl1coOriQzk/08VZbFZ1rKWOy1HFdBPRiyb9K67/3HX19uYmXX6VMs7T5afNrzicGsRB766TuO+/C+zv7cano5OI1ZU/Z5J68VfK+DemzU89oi4eTMD1AttbsfP5Y7z9i35Pu8zPRbx5HTFxT/ljF7uxHgv3jX4zetsD+Js1Cv+9+CJmCkdkXQ981lyjH+730zdxRi/gRRh17fXVFXgRfPrO2upHZ+BF8G4xwItErD7d0zMDL4J3iwHeTUTUB3jR0G4xwLuJiPoALxraLQZ4NxFRH+BFQ7vFAO8mIuoDvGhotxjg3UREfYAXDe0WA7ybiKgP8KKh3WKAdxMR9QFeNLRbDPBuIqI+wIuGdosB3k1E1Ad40dBuMcC7iYj6AC8a2i0GeDcRUR/gRUO7xQDvJiLqA7xoaLcY4N1ERH2AFw3tFgO8m4ioD/Ciod1igHcTEfUBXjS0WwzwbiKiPsCLhnaLAd5NRNQHeNHQbjHAu4mI+gAvGtotBng3EVEf4EVDu8UA7yYi6gO8aGi3GODdRER9gBcN7RYDvJuIqA/woqHdYoB3ExH1AV40tFsM8G4ioj7Ai4Z2iwHeTUTUB3jR0G4xwLuJiPoALxraLQZ4NxFRH+BFQ7vFAO8mIuoDvGhotxjg3UREfYAXDe0WA7ybiKgP8KKh3WKAdxMR9QFeNLRbDPBuIqI+wKuGrkVBQ8YAP+RQtz3Wq8OKHvjbig7x8U0Tk7OzMTnEUdkR4AVTX/yI9eWleCaIGjoC+KGnyj94fByPf36Pd1UT7xfm42n+DeU+ohrh6v3trXi1sR4Li4OY6U9Hb6KOifaiJqIa5cIROlh/SNoj2vf09sv70suYGzyPJ26Fs532dqP5sBOxuuL2KPTJWaCXc/jiLDaPTkDP2cz1bNZ7fPUo1vhMd6XM65UFn97El/Ou57TrAnnwEdOuD0KvvAVy4bO+J8irwmnlAlnw7Y9rynJklVsgCz69xwNfzkJ6cx68tBphJRcAvuS6xncDb4xTshrwJdc1vht4Y5yS1YAvua7x3cAb45SsBnzJdY3vBt4Yp2Q14Euua3w38MY4JasBX3Jd47uBN8YpWQ34kusa3w28MU7JasCXXNf4buCNcUpWA77kusZ3A2+MU7Ia8CXXNb47D75q/18kry4skAWffsUW+C6op2fIgk/nrzry3GP/GLnw52O/WEcGyIOv4rQjzz32j5EF31zG4dG3sd/swQ/QGmbBTw3i4MvXCPAfrn1r1xr+BoeWR+MM4JpyAAAAAElFTkSuQmCC" alt="" />
           </div>
    </div>
  </div>
);

class Camera extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.libCameraPhoto = null;
    this.showVideoTimeoutId = null;
    this.videoRef = React.createRef();
    this.state = {
      dataUri: '',
      isShowVideo: true,
      isCameraStarted: false,
      startCameraErrorMsg: ''
    };
    this.handleTakePhoto = this.handleTakePhoto.bind(this);
    this.clearShowVideoTimeout = this.clearShowVideoTimeout.bind(this);
  }

  componentDidMount () {
    this.libCameraPhoto = new LibCameraPhoto(this.videoRef.current);
    const {idealFacingMode, idealResolution, isMaxResolution} = this.props;
    if (isMaxResolution) {
      this.startCameraMaxResolution(idealFacingMode);
    } else {
      this.startCameraIdealResolution(idealFacingMode, idealResolution);
    }
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps (nextProps) {
    if (isDynamicPropsUpdate(this.props, nextProps)) {
      const {idealFacingMode, idealResolution, isMaxResolution} = nextProps;
      this.restartCamera(idealFacingMode, idealResolution, isMaxResolution);
    }
  }

  componentWillUnmount () {
    this.clearShowVideoTimeout();
    const isComponentWillUnmount = true;
    this.stopCamera(isComponentWillUnmount)
      .catch((error) => {
        printCameraInfo(error.message);
      });
  }

  clearShowVideoTimeout () {
    if (this.showVideoTimeoutId) {
      clearTimeout(this.showVideoTimeoutId);
    }
  }

  restartCamera (idealFacingMode, idealResolution, isMaxResolution) {
    this.stopCamera()
      .then()
      .catch((error) => {
        printCameraInfo(error.message);
      })
      .then(() => {
        if (isMaxResolution) {
          this.startCameraMaxResolution(idealFacingMode);
        } else {
          this.startCameraIdealResolution(idealFacingMode, idealResolution);
        }
      });
  }

  startCamera (promiseStartCamera) {
    promiseStartCamera
      .then((stream) => {
        this.setState({
          isCameraStarted: true,
          startCameraErrorMsg: ''
        });
        if (typeof this.props.onCameraStart === 'function') {
          this.props.onCameraStart(stream);
        }
      })
      .catch((error) => {
        this.setState({startCameraErrorMsg: error.message});
        if (typeof this.props.onCameraError === 'function') {
          this.props.onCameraError(error);
        }
      });
  }

  startCameraIdealResolution (idealFacingMode, idealResolution) {
    let promiseStartCamera =
        this.libCameraPhoto.startCamera(idealFacingMode, idealResolution);
    this.startCamera(promiseStartCamera);
  }

  startCameraMaxResolution (idealFacingMode) {
    let promiseStartCamera =
        this.libCameraPhoto.startCameraMaxResolution(idealFacingMode);
    this.startCamera(promiseStartCamera);
  }

  stopCamera (isComponentWillUnmount = false) {
    return new Promise((resolve, reject) => {
      this.libCameraPhoto.stopCamera()
        .then(() => {
          if (!isComponentWillUnmount) {
            this.setState({ isCameraStarted: false });
          }
          if (typeof this.props.onCameraStop === 'function') {
            this.props.onCameraStop();
          }
          resolve();
        })
        .catch((error) => {
          if (typeof this.props.onCameraError === 'function') {
            this.props.onCameraError(error);
          }
          reject(error);
        });
    });
  }

  handleTakePhoto () {
    const {sizeFactor, imageType, imageCompression, isImageMirror, isSilentMode} = this.props;
    const configDataUri = { sizeFactor, imageType, imageCompression, isImageMirror };

    if (!isSilentMode) {
      playClickAudio();
    }

    let dataUri = this.libCameraPhoto.getDataUri(configDataUri);
    this.props.onTakePhoto(dataUri);

    this.setState({
      dataUri,
      isShowVideo: false
    });

    this.clearShowVideoTimeout();
    this.showVideoTimeoutId = setTimeout(() => {
      this.setState({
        isShowVideo: true
      });
    }, 900);
  }

  render () {
    const {isImageMirror, isDisplayStartCameraError, isFullscreen} = this.props;

    let videoStyles = getVideoStyles(this.state.isShowVideo, isImageMirror);
    let showHideImgStyle = getShowHideStyle(!this.state.isShowVideo);

    let classNameFullscreen = isFullscreen ? 'react-html5-camera-photo-fullscreen' : '';
    return (
      <div style={{width: '100%', height: '100vh', minHeight: '568px', maxWidth: '768px', display: 'flex', flexDirection: 'column'}}>
        <div className={'react-html5-camera-photo ' + classNameFullscreen}>
          <DisplayError
            cssClass={'display-error'}
            isDisplayError={isDisplayStartCameraError}
            errorMsg={this.state.startCameraErrorMsg}
          />
          <WhiteFlash
            isShowWhiteFlash={!this.state.isShowVideo}
          />

          <img
            style={showHideImgStyle}
            alt="camera"
            src={this.state.dataUri}
          />
          <video
            style={videoStyles}
            ref={this.videoRef}
            autoPlay={true}
            muted="muted"
            playsInline
          />
          <Overlay />
        </div>
        <div style={{ height: '80px', marginBottom: '24px', padding: '8px', background: '#000'}}>
        
          <CircleButton
            isClicked={!this.state.isShowVideo}
            onClick={this.handleTakePhoto}
          />
        </div>
      
      </div>
     
    );
  }
}

export {
  FACING_MODES,
  IMAGE_TYPES
};

export default Camera;

Camera.propTypes = {
  onTakePhoto: PropTypes.func.isRequired,
  onCameraError: PropTypes.func,
  idealFacingMode: PropTypes.string,
  idealResolution: PropTypes.object,
  imageType: PropTypes.string,
  isImageMirror: PropTypes.bool,
  isSilentMode: PropTypes.bool,
  isDisplayStartCameraError: PropTypes.bool,
  imageCompression: PropTypes.number,
  isMaxResolution: PropTypes.bool,
  isFullscreen: PropTypes.bool,
  sizeFactor: PropTypes.number,
  onCameraStart: PropTypes.func,
  onCameraStop: PropTypes.func
};

Camera.defaultProps = {
  isImageMirror: true,
  isDisplayStartCameraError: true
};
