import React, { Component } from "react";
import styles from "./StopWatch.module.css";

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(0, 0, 0, 0, 0, 0),
    };
    this.intervalId = null;
  }
  tick = () => {
    this.setState((state) => {
      const { time } = state;
      const newTime = new Date(time.getTime() + 1000);
      return { time: newTime };
    });
  };
  start = () => {
    console.log(this.intervalId);
    document.getElementById("start").setAttribute("disabled", "disabled");
    this.intervalId = window.setTimeout(this.tick, 1000);
  };
  stop = () => {
    document.getElementById("start").removeAttribute("disabled");
    clearInterval(this.intervalId);
    this.intervalId = null;
  };
  reset = () => {
    this.stop();
    this.setState({ time: new Date(0, 0, 0, 0, 0, 0) });
  };
  componentDidUpdate() {
    if (this.intervalId !== null) {
      this.start();
    }
  }
  componentWillUnmount() {
    this.reset();
  }
  render() {
    const { time } = this.state;
    return (
      <article className={styles.container}>
        <h2 className={styles.time}>{time.toLocaleTimeString("en-GB")}</h2>
        <div>
          <button onClick={this.start} className={styles.button} id="start">
            start
          </button>
          <button onClick={this.stop} className={styles.button}>
            stop
          </button>
          <button onClick={this.reset} className={styles.button}>
            reset
          </button>
        </div>
      </article>
    );
  }
}

export default StopWatch;
