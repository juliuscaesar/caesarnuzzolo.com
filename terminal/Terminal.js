import { useState, useEffect, useRef } from "react";
import { responses } from "./responses";
import * as styles from "../styles/Terminal.module.scss";

function Terminal() {
  const [cmds, setCmds] = useState([]);
  const [currentCmd, setCurrentCmd] = useState({});
  const [user, setUser] = useState("");
  const inputRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    containerRef.current.scrollTop = containerRef.current.scrollHeight;

    setCurrentCmd({
      time: new Date().toLocaleTimeString(),
      text: "",
      user: user,
    });
  }, [cmds]);

  const parseResponse = (cmd) => {
    if (!user) {
      setUser(cmd);
      return `<span>caesar: Welcome, ${cmd}!<br />${responses("help", user)}`;
    }
    if (cmd ==="clear") {
      setCmds([]);
    }
    if (cmd === "logout") {
      const response = `<span>caesar: Bye, ${user}! 👋</span>`;
      setUser("");
      return response;
    }

    const response = responses(cmd, user);

    if (response) {
      return `<span>caesar: ${response}</span>`;
    }

    return `<span>caesar: command not found: ${cmd}</span><br /><span>Need help? Enter the command help for a list of commands.</span>`;
  };

  const handleKeypress = (e) => {
    if (currentCmd.text && e.key === "Enter") {
      setCurrentCmd({
        time: new Date().toLocaleTimeString(),
        text: "",
        user: user,
      });
      setCmds((cmds) => [
        ...cmds,
        {
          time: currentCmd.time,
          text: currentCmd.text,
          user: currentCmd.user,
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
        user: user,
      });
    }
  };

  return (
    <div className={styles.terminalContainer}>
      <div className={styles.terminalTop}>
        <p>{user ? user : "anon"}@caesar: ~</p>
      </div>
      <div className={styles.terminalContent} ref={containerRef}>
        {cmds.map((cmd, index) => (
          <div
            key={`${cmd.date}-${cmd.text}-${index}`}
            className={styles.command}
          >
            <p className={styles.code}>
              🦄 <span className={styles.terminalTimeStamp}>{cmd.time}</span> ✨{" "}
              {cmd.user === "" && <span>What is your name?</span>} {cmd.text}
            </p>
            <div
              className={styles.response}
              dangerouslySetInnerHTML={{ __html: cmd.response }}
            />
          </div>
        ))}
        <p className={styles.code}>
          🦄 <span className={styles.terminalTimeStamp}>{currentCmd.time}</span>{" "}
          ✨ {!user && <span>What is your name? </span>}
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
