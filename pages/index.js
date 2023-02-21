import Head from "next/head";
import Terminal from "../terminal/Terminal";
import styles from "@/styles/Home.module.scss";
import * as planet from "@/styles/Planet.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Caesar Nuzzolo</title>
        <meta name="description" content="Just a website." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={`${planet.stars} ${planet.small}`}></div>
        <div className={`${planet.stars} ${planet.medium}`}></div>
        <div className={`${planet.stars} ${planet.large}`}></div>
        <div className={styles.main}>
          <div className={styles.description}>
            <h1>
              Hi, I&apos;m <span className={styles.name}>Caesar</span>.
            </h1>
            <div className={styles.mobileBanner}>
              <p>This site is best viewed on desktop.</p>
            </div>
          </div>
          <div className={styles.container}>
            <div className={planet.wrapper}>
              <div className={planet.caesar}></div>
              <div className={planet.moon}></div>
            </div>
            <Terminal />
          </div>
        </div>
      </main>
    </>
  );
}
