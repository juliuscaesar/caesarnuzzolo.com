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
    let response = "";
    switch (cmd) {
      case "hello":
        response = "Hi!";
        break;
      case "bio":
        response = "Check back later.";
        break;
      case "email":
        response =
          '<a href="mailto:caesarnuzzolo@gmail.com">caesarnuzzolo@gmail.com</a>';
        break;
      case "linkedin":
        response =
          '<a target="_blank" href="https://www.linkedin.com/in/caesar-nuzzolo-81b0a3231/">https://www.linkedin.com/in/caesar-nuzzolo-81b0a3231</a>';
        break;
      case "github":
        response =
          '<a target="_blank" href="https://github.com/juliuscaesar">github.com/juliuscaesar</a>';
        break;
      case "help":
        response =
          "<span>Enter one of the following commands:<br />✨ hello<br />✨ bio<br />✨ email<br />✨ linkedin<br />✨ github<br />✨ clear<br />✨ help</span>";
        break;
      case "clear":
        setCmds([]);
        break;
    }

    if (response) {
      return `<span>caesar: ${response}</span>`;
    }

    return `<span>caesar: command not found: ${cmd}</span><br /><span>Need help? Enter the command help for a list of commands.</span>`;
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      setCurrentCmd({
        time: new Date().toLocaleTimeString(),
        text: "",
      });
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
    <div className={styles.terminalContainer}>
      <div className={styles.terminalTop}><p>me@caesar: ~</p></div>
      <div className={styles.terminalContent} ref={containerRef}>
        {cmds.map((cmd, index) => (
          <div
            key={`${cmd.date}-${cmd.text}-${index}`}
            className={styles.command}
          >
            <p className={styles.code}>
              🦄 <span className={styles.terminalTimeStamp}>{cmd.time}</span> ✨{" "}
              {cmd.text}
            </p>
            <div
              className={styles.response}
              dangerouslySetInnerHTML={{ __html: cmd.response }}
            />
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
    </div>
  );
}

export default Terminal;
