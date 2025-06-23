'use client';

import { useState } from 'react';
import styles from './page.module.css';

const DIRECTIONS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function initialMazeMap(width: number, height: number) {
  const mazeMap = Array.from({ length: height }, (_, row) =>
    Array.from({ length: width }, (_, col) => {
      if (row % 2 === 0) {
        return 0;
      } else {
        return col % 2 === 1 ? 1 : 0;
      }
    }),
  );
  return mazeMap;
}

export default function Home() {
  const [mazeMap, setMazeMap] = useState<number[][]>(initialMazeMap(11, 11));

  return (
    <div className={styles.container}>
      <div
        className={styles.maze}
        style={{
          gridTemplateRows: `repeat(${mazeMap.length}, 30px)`,
          gridTemplateColumns: `repeat(${mazeMap[0].length}, 30px)`,
        }}
      >
        {mazeMap.map((row, y) =>
          row.map((col, x) => (
            <div
              key={`${x}-${y}`}
              className={styles.cell}
              style={{
                backgroundColor: col === 0 ? 'white' : 'black',
              }}
            />
          )),
        )}
      </div>
    </div>
  );
}
