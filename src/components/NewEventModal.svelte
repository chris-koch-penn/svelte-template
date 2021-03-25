<script>
  import Modal from "./Modal.svelte";
  import Datepicker from "./datepicker/Datepicker.svelte";
  import CloseButton from "./CloseButton.svelte";
  import {
    createEventGcal,
    deleteEventGcal,
    updateEventGcal
  } from "../lib/googleAPI.js";
  export let visible;
  export let event = {};
  export let callback = () => {};
  let startDate = new Date();
  let endDate = new Date();
  let startTime = "12:00 PM";
  let endTime = "12:00 PM";
  let title = "";
  let notes = "";
  let calendarId = "primary";
  let eventId = "";
  let isAllDay = false;
  let popover;
  $: destructureEvent(event);
  $: stylesheet = notes && notes.length > 100 ? "width: 600px;" : "";

  function destructureEvent(e) {
    startDate = e.startDate;
    endDate = e.endDate;
    startTime = e.startTime;
    endTime = e.endTime;
    title = e.title;
    notes = e.notes;
    isAllDay = e.isAllDay;
    calendarId = e.calendarId || "primary";
    eventId = e.eventId;
  }

  const close = e => {
    if (e && e.preventDefault) e.preventDefault();
    visible = false;
    event = {};
  };

  async function createEvent() {
    let res = await createEventGcal(title, startDate, endDate);
    close();
    callback();
  }

  async function deleteEvent() {
    if (!eventId) return;
    let res = await deleteEventGcal(eventId, calendarId);
    close();
    callback();
  }

  async function updateEvent() {
    let [hours, minutes] = getHoursAndMinutes(startTime);
    let [hours2, minutes2] = getHoursAndMinutes(endTime);

    startDate.setHours(hours);
    startDate.setMinutes(minutes);
    endDate.setHours(hours2);
    endDate.setMinutes(minutes2);

    if (hours * 60 + minutes > hours2 * 60 + minutes2 || startDate > endDate) {
      return alert("The start time cannot occur after the end time.");
    }

    let res = await updateEventGcal(
      eventId,
      calendarId,
      title,
      notes,
      startDate,
      endDate
    );

    close();
    callback();
  }

  function getHoursAndMinutes(date) {
    let parts = date.split(/[\s:]+/);
    parts[2] = parts[2].toLowerCase();

    if (parts.length != 3 || (parts[2] != "am" && parts[2] != "pm")) {
      return alert("Please enter a valid time. Must end with 'am' or 'pm'.");
    }

    let hours = parseInt(parts[0]);
    let minutes = parseInt(parts[1]);
    if (parts[2] === "pm" && hours != 12) hours = hours + 12;
    else if (parts[2] === "am" && hours == 12) hours = 0;

    console.log(hours, minutes);
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return alert("Hours or minutes are out of range.");
    }

    return [hours, minutes];
  }

  function saveEvent() {
    if (eventId) updateEvent();
    else createEvent();
  }
</script>

<style>
  @import "../assets/theme.scss";
  button,
  input,
  textarea {
    font-size: 100%;
    line-height: 1.15;
    overflow: visible;
    outline: none;
    margin: 0 5% 5% 0;
  }

  .title {
    text-align: center;
    display: block;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 2%;
    color: #666666;
  }

  .subtitle {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    color: #666666;
  }

  input[type="text"],
  textarea {
    appearance: none;
    background-color: transparent;
    border: 0.1rem solid #d1d1d1;
    border-radius: 0.4rem;
    box-shadow: none;
    box-sizing: inherit;
    padding: 0.6rem 1rem;
    margin-right: 0px;
  }

  form {
    margin: 5% 0 5% 10%;
    overflow: auto;
    width: 100%;
  }

  label {
    margin-bottom: 2%;
  }

  .toplevel {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .close-button {
    padding: 10px;
  }

  textarea {
    width: 100%;
    height: 150px;
  }
</style>

<Modal bind:visible bind:stylesheet>
  <div class="d-flex flex-row toplevel">
    <form class="flex-column">
      <label class="title">Event</label>
      <input class="w-100" type="text" placeholder="Title" bind:value={title} />
      <label class="subtitle">Start</label>
      <div class="d-flex flex-row">
        <Datepicker bind:selected={startDate} />
        <input
          type="text"
          placeholder="12:00 PM"
          class="w-50"
          bind:value={startTime} />
      </div>
      <label class="subtitle">End</label>
      <div class="d-flex flex-row">
        <Datepicker bind:selected={endDate} />
        <input
          type="text"
          placeholder="12:00 PM"
          class="w-50"
          bind:value={endTime} />
      </div>
      <textarea placeholder="Notes" id="notes" bind:value={notes} />
      <div class="d-flex flex-row" style=" justify-content: center;">
        <button class="action-button" type="submit" on:click={saveEvent}>
          Save
        </button>
        <button class="action-button" type="submit" on:click={deleteEvent}>
          Delete
        </button>
      </div>
    </form>
    <div class:close-button={!!stylesheet}>
      <CloseButton fx={close} />
    </div>
  </div>
</Modal>
