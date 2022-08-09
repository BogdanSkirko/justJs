'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;
  constructor(coords, distance, duration) {
    this.coords = coords; //[lat,lng]
    this.distance = distance;
    this.duration = duration;
  }
  _setDescriptions() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // prettier-ignore
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
  }
  click() {
    this.clicks++;
  }
}
class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescriptions();
  }
  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescriptions();
  }
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 293);

//APPLICATION ARCHITECTURE
class App {
  #mapZoomlvl = 15;
  #map;
  #mapEvent;
  #workouts = [];
  #formMode = 'add';
  constructor() {
    //gET USER'S POSITION

    this._getPosition();
    // GET DATE FROM LS
    // Get data from LS
    this._getLocalStorage();
    //ATTACH EVENT HANDLERS
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    containerWorkouts.addEventListener('click', this._editWorkout.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Need your position!');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, this.#mapZoomlvl);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Handling cliks on map

    this.#map.on('click', this._showForm.bind(this));
    this.#workouts.forEach(work => {
      // this._renderWorkout(work);
      this._renderWorkoutmarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    //EMpty the inputs
    inputCadence.value =
      inputDuration.value =
      inputDistance.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _processWorkoutValues(lat, lng, obj) {
    const isNumber = (...inputs) =>
      inputs.every(input => Number.isFinite(input));
    const isPositiveNumber = (...inputs) => inputs.every(input => input > 0);

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    if (type === 'running') {
      const cadence = +inputCadence.value;

      if (
        !isNumber(distance, duration, cadence) ||
        !isPositiveNumber(distance, duration, cadence)
      ) {
        this._showErrMessage();
        return;
      }

      if (this.#formMode === 'add') {
        return new Running(distance, duration, [lat, lng], cadence);
      }

      if (this.#formMode === 'edit') {
        obj.type = type;
        obj.distance = distance;
        obj.duration = duration;
        obj.cadence = cadence;
      }
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !isNumber(distance, duration, elevation) ||
        !isPositiveNumber(distance, duration)
      ) {
        this._showErrMessage();
        return;
      }

      if (this.#formMode === 'add') {
        return new Cycling(distance, duration, [lat, lng], elevation);
      }

      if (this.#formMode === 'edit') {
        obj.type = type;
        obj.distance = distance;
        obj.duration = duration;
        obj.elevationGain = elevation;
      }
    }
  }
  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();
    //Get Data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    //if activity is running,create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      //Check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs must to be positive number!');
      workout = new Running([lat, lng], distance, duration, cadence);
      this.#workouts.push(workout);
    }

    //if activity is cycling,create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      //Check if data is valid

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs must to be positive number!');
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    //Add new object to workout array
    this.#workouts.push(workout);

    //Render workout on map as marker
    this._renderWorkoutmarker(workout);
    //Render workout on a list
    this._renderWorkout(workout);
    //Hide the form +Clear input fields
    this._hideForm();
    //Set local Storage to all Workouts
    this._setLocalStorage();
  }
  _renderWorkoutmarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
   
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <div class="workout__icons">
      <img src="icons/edit.svg" class="workout__settings">
      <img src="icons/delete.svg" class="workout__delete">
    </div>
    <h2 class="workout__title">${workout.description}</h2>
    
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
      
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>
    `;

    if (workout.type === 'running')
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
    </li> `;
    if (workout.type === 'cycling')
      html += `
      <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
      `;
    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    // console.log(workoutEl);
    if (!workoutEl) return;
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomlvl, {
      animate: true,
      pan: { duration: 1 },
    });
    //using the publig interface
    // workout.click();
  }

  _editWorkout(workout, e) {
    // this = App
    // workout = workoutObj
    e.preventDefault();

    workout.type = inputType.value;
    // console.log(workout.type);
    if (workout.type === 'running') {
      Object.setPrototypeOf(workout, Running.prototype);
      workout.description = workout.description.replace('Cycling', 'Running');
      workout.calcPace();
    } else {
      Object.setPrototypeOf(workout, Cycling.prototype);
      workout.description = workout.description.replace('Running', 'Cycling');
      workout.calcSpeed();
    }

    // change values of the current workout
    this._processWorkoutValues(null, null, workout);

    // stop execution if some input value is invalid
    if (form.classList.contains('error')) return;

    this._updateWorkoutMarker(workout);
    this._renderWorkoutItem(workout);
    this._setLocalStorage();

    form.removeEventListener('submit', this.editWorkoutLinked);
    form.addEventListener('submit', this.createWorkoutLinked);
    this.#formMode = 'add';

    this._removeHiddenWorkout();
    this._hideForm();
  }

  _changeWorkoutValues(e) {
    if (!e.target.classList.contains('workout__settings')) return;

    if (this.#formMode === 'edit') {
      form.removeEventListener('submit', this.editWorkoutLinked);
    }

    this.#formMode = 'edit';

    this._hideErrMessage();

    Array.from(containerWorkouts.children).forEach(child =>
      child.classList.remove('hidden')
    );

    const workoutItem = e.target.closest('.workout');
    const workoutObj = this.#workouts.find(
      work => work.id === workoutItem.dataset.id
    );

    form.classList.remove('hidden');
    workoutItem.classList.add('hidden');
    containerWorkouts.insertBefore(form, workoutItem);

    inputType.value = workoutObj.type;
    inputDistance.value = workoutObj.distance;
    inputDuration.value = workoutObj.duration;

    // the condition prevents an input from becoming undefined
    if (workoutObj.type === 'running') {
      inputCadence.closest('.form__row').classList.remove('form__row--hidden');
      inputElevation.closest('.form__row').classList.add('form__row--hidden');
      inputCadence.value = workoutObj.cadence;
    }
    if (workoutObj.type === 'cycling') {
      inputElevation
        .closest('.form__row')
        .classList.remove('form__row--hidden');
      inputCadence.closest('.form__row').classList.add('form__row--hidden');
      inputElevation.value = workoutObj.elevationGain;
    }

    this.editWorkoutLinked = this._editWorkout.bind(this, workoutObj);

    form.removeEventListener('submit', this.createWorkoutLinked);
    form.addEventListener('submit', this.editWorkoutLinked);
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;
    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
