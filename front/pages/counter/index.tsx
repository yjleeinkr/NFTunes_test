import type { NextPage } from 'next'
import Head from 'next/head'

import Counter from '../../src/features/counter/Counter'
import styles from './CounterHome.module.css'
import Header from '../../src/features/_main/Header';
import { useWheels } from '../../src/hooks/useWheel';

const IndexPage: NextPage = () => {

  const { isWheel, eventWheel } = useWheels()

  return (
    <div onWheel = {( e => eventWheel(e) )}>
      <Header eventProps = {isWheel} />
      <div className={styles.container} onWheel = {( e => eventWheel(e) )}>
        <Head>
          <title>Redux Toolkit</title>
          <link rel="icon" href="/front/public/favicon.ico" />
        </Head>
        <header className={styles.header}>
          <Counter />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <span>
            <span>Learn </span>
            <a
              className={styles.link}
              href="front/pages/counter/index"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
            <span>, </span>
            <a
              className={styles.link}
              href="front/pages/counter/index"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux
            </a>
            <span>, </span>
            <a
              className={styles.link}
              href="front/pages/counter/index"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux Toolkit
            </a>
            ,<span> and </span>
            <a
              className={styles.link}
              href="front/pages/counter/index"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Redux
            </a>
          </span>
        </header>
      </div>
    </div>
  )
}

export default IndexPage
