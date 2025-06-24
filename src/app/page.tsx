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
  const [mazeSet, setMazeSet] = useState<{ width: number; height: number }>({
    width: 11,
    height: 11,
  });

  const maze = initialMazeMap(mazeSet.width, mazeSet.height);

  return (
    <div className={styles.container}>
      <div className={styles.customMaze}>
        <label>
          <strong>幅</strong>
        </label>
        <input
          type="number"
          min="1"
          max="99"
          value={mazeSet.width}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value < 3) {
              alert(`幅は3以上にしてください`);
              return;
            }
            if (value > 99) {
              alert(`幅は99以下にしてください`);
              return;
            }
            // 奇数に調整（偶数が入力された場合は次の奇数にする）
            const adjustedValue = value % 2 === 0 ? value + 1 : value;
            setMazeSet({
              ...mazeSet,
              width: adjustedValue,
            });
          }}
          className={styles.textBox}
        />
      </div>
      <div className={styles.customBoardItem}>
        <label>
          <strong>高さ</strong>
        </label>
        <input
          type="number"
          min="1"
          max="99"
          value={mazeSet.height}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value < 3) {
              alert(`縦の幅は３以上にしてください`);
              return;
            }
            if (value > 99) {
              alert(`縦の幅は99以下にしてください`);
              return;
            }
            // 奇数に調整（偶数が入力された場合は次の奇数にする）
            const adjustedValue = value % 2 === 0 ? value + 1 : value;
            setMazeSet({
              ...mazeSet,
              height: adjustedValue,
            });
          }}
          className={styles.textBox}
        />
      </div>
      <div
        className={styles.maze}
        style={{
          gridTemplateRows: `repeat(${mazeSet.height}, 30px)`,
          gridTemplateColumns: `repeat(${mazeSet.width}, 30px)`,
        }}
      >
        {maze.map((row, y) =>
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
