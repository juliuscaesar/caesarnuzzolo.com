import { useState, useEffect, useRef } from "react";
import * as styles from "../styles/Terminal.module.scss";

function Terminal() {
  const [cmds, setCmds] = useState([]);
  const [currentCmd, setCurrentCmd] = useState({});
  const inputRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    containerRef.current.scrollTop = containerRef.current.scrollHeight;

    setCurrentCmd({
      time: new Date().toLocaleTimeString(),
      text: "",
    });
  }, [cmds]);

  const parseResponse = (cmd) => {
    if (cmd === "hello") {
      return "caesar: Hi!";
    }
    if (cmd === "clear") {
      setCmds([]);
    }
    return `caesar: command not found: ${cmd}`;
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      setCmds((cmds) => [
        ...cmds,
        {
          time: currentCmd.time,
          text: currentCmd.text,
          response: parseResponse(currentCmd.text),
        },
      ]);
    }
  };

  const updateCmd = (e) => {
    if (e.target.value.length <= 20) {
      setCurrentCmd({
        time: currentCmd.time,
        text: e.target.value,
      });
    }
  };

  return (
    <div className={styles.terminal_container} ref={containerRef}>
      {cmds.map((cmd, index) => (
        <div key={`${cmd.date}-${cmd.text}-${index}`} className={styles.command}>
          <p className={styles.code}>
            🦄 <span className={styles.terminalTimeStamp}>{cmd.time}</span> ✨{" "}
            {cmd.text}
          </p>
          <p className={styles.code}>&nbsp;&nbsp;&nbsp;&nbsp;{cmd.response}</p>
        </div>
      ))}
      <p className={styles.code}>
        🦄 <span className={styles.terminalTimeStamp}>{currentCmd.time}</span> ✨{" "}
        <input
          className={styles.terminalInput}
          value={currentCmd.text || ""}
          onChange={updateCmd}
          onKeyDown={handleKeypress}
          ref={inputRef}
        />
      </p>
    </div>
  );
}

export default Terminal;
