<script>
  import Modal from "./Modal.svelte";
  import CloseButton from "./CloseButton.svelte";
  import { PlusIcon } from "svelte-feather-icons";

  export let visible;
  export let data;
  let now = Date.now();

  const close = event => {
    event.preventDefault();
    visible = false;
  };

  function formatDate(date) {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  function getDayOfWeek(date) {
    let arr = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    return arr[date.getDay()];
  }

  function intToTime(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return hours + ":" + minutes;
  }
</script>

<style>
  @import "../assets/theme.scss";

  .title {
    display: block;
    font-size: 24px;
    margin-top: 2%;
    font-weight: 700;
    margin-bottom: 2%;
    color: #666666;
  }

  form {
    margin: 5% 0 5% 10%;
    overflow: auto;
  }

  .toplevel {
    height: 100%;
    width: 100%;
    display: flex;
  }
  .light {
    background-color: #fff;
  }

  * {
    box-sizing: border-box;
  }

  .calendar {
    width: 370px;
    font-family: "Roboto", sans-serif;
    padding: 10px 0px 20px 30px;
    display: inline-block;
  }

  .calendar_header {
    border-bottom: 2px solid rgba(0, 0, 0, 0.08);
  }

  .header_copy {
    color: var(--light-grey);
    font-size: 20px;
  }
  .calendar_plan {
    margin: 20px 0 20px;
  }
  .cl_plan {
    width: 100%;
    height: 140px;
    background-image: linear-gradient(-222deg, #ff8494, #ffa9b7);
    box-shadow: 0px 0px 52px -18px rgba(0, 0, 0, 0.75);
    padding: 30px;
    color: #fff;
  }
  .cl_copy {
    font-size: 20px;
    margin: 20px 0;
    display: inline-block;
  }

  .cl_add {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;
    margin: 0 0 0 65px;
    color: #aaa;
    padding: 8px;
  }
  .calendar_events {
    color: var(--light-grey);
  }

  .event_item {
    margin: 10px 0;
    padding: 5px;
    padding-left: 10px;
    cursor: pointer;
    &:hover {
      background-image: linear-gradient(-222deg, #ff8494, #ffa9b7);
      box-shadow: 0px 0px 52px -18px rgba(0, 0, 0, 0.75);
      .ei_Dot {
        background-color: #fff;
      }
      .ei_Copy,
      .ei_Title {
        color: #fff;
      }
    }
  }

  .ei_Title {
    width: 90%;
  }

  .ei_Dot {
    display: inline-block;
  }

  .ei_Dot {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: var(--light-grey);
    box-shadow: 0px 0px 52px -18px rgba(0, 0, 0, 0.75);
  }
  .dot-active {
    background-color: #ff8494;
  }

  .ei_Title {
    margin-left: 10px;
    color: #363b41;
  }

  .ei_Copy {
    font-size: 12px;
    margin-left: 27px;
    color: #aaa;
  }

  .start-end {
    color: #ff8494;
    padding-left: 40px;
    padding-right: 32px;
  }
</style>

<Modal bind:visible>
  <div class="d-flex flex-row toplevel">
    <div class="calendar light">
      <div class="calendar_header">
        <h1 class="title">Welcome Back</h1>
      </div>
      <div class="calendar_plan">
        <div class="cl_plan">
          <div class="cl_title">{getDayOfWeek(data.day.date)}</div>
          <div class="cl_copy">{formatDate(data.day.date)}</div>
          <div class="cl_add">
            <PlusIcon size="24" />
          </div>
        </div>
      </div>
      <div class="calendar_events">
        <p class="start-end d-flex flex-row justify-content-between">
          <span>Starts</span>
          <span>Ends</span>
        </p>
        {#each data.events as event}
          <div class="event_item">
            <div
              class="ei_Dot"
              class:dot-active={event.startDate.getTime() > now} />
            <div
              class="ei_Title d-inline-flex flex-row justify-content-between">
              <span>{event.isAllDay ? 'All Day' : event.startTime}</span>
              <span>{event.isAllDay ? '' : event.endTime}</span>
            </div>
            <div class="ei_Copy">{event.title}</div>
          </div>
        {/each}
      </div>
    </div>
    <CloseButton fx={() => (visible = false)} />
  </div>
</Modal>
