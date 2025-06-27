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

function createMaze(nowMaze: number[][]) {
  const newMaze = structuredClone(nowMaze);
  const pillar: number[][] = [];
  const newWall: number[][] = [];

  const pillarPositions = newMaze.flatMap((row, y) =>
    row.map((cell, x) => (cell === 1 ? [y, x] : [])).filter((pos) => pos.length > 0),
  );
  pillar.push(...pillarPositions);
  const wallPositions = pillar.map(([y, x]) => {
    const directions = DIRECTIONS.map(([dy, dx]) => [y + dy, x + dx]);
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    if (newMaze[randomDirection[0]]?.[randomDirection[1]] !== undefined) {
      newMaze[randomDirection[0]][randomDirection[1]] = 1;
    }
    return [randomDirection[0], randomDirection[1]];
  });
  newWall.push(...wallPositions);
  return newMaze;
}

function calcMaze(nowMaze: number[][]) {
  const maze = structuredClone(nowMaze);
  return maze;
}

export default function Home() {
  const [mazeSet, setMazeSet] = useState<{ width: number; height: number }>({
    width: 11,
    height: 11,
  });

  const [inputSetting, setInputSetting] = useState<{
    width: number;
    height: number;
  }>({
    width: 11,
    height: 11,
  });

  const [nowMaze, setNowMaze] = useState<number[][]>(initialMazeMap(mazeSet.width, mazeSet.height));

  const handleWidthBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value < 3 || value > 99) {
      alert(`幅は3以上99以下にしてください`);
      value = 5;
    }
    const adjustedValue = value % 2 === 0 ? value + 1 : value;
    setMazeSet((prev) => ({ ...prev, width: adjustedValue }));
    setInputSetting((prev) => ({ ...prev, width: adjustedValue }));
    setNowMaze(initialMazeMap(adjustedValue, mazeSet.height));
  };

  const handleHeightBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value < 3 || value > 99) {
      alert(`縦の幅は3以上99以下にしてください`);
      value = 5;
    }
    const adjustedValue = value % 2 === 0 ? value + 1 : value;

    setMazeSet((prev) => ({ ...prev, height: adjustedValue }));
    setInputSetting((prev) => ({ ...prev, height: adjustedValue }));
    setNowMaze(initialMazeMap(mazeSet.width, adjustedValue));
  };

  const maze = calcMaze(nowMaze);

  const handleCreateMaze = () => {
    setNowMaze(createMaze(nowMaze));
  };

  return (
    <div className={styles.container}>
      <div className={styles.customMaze}>
        <div className={styles.customMazeItem}>
          <label>
            <strong>幅(奇数にしてください)</strong>
          </label>
          <input
            type="number"
            min="1"
            max="99"
            value={inputSetting.width}
            onChange={(e) => {
              setInputSetting((prev) => ({ ...prev, width: Number(e.target.value) }));
            }}
            onBlur={(e) => handleWidthBlur(e)}
            className={styles.textBox}
          />
        </div>
        <div className={styles.customMazeItem}>
          <label>
            <strong>高さ(奇数にしてください)</strong>
          </label>
          <input
            type="number"
            min="1"
            max="99"
            value={inputSetting.height}
            onChange={(e) => {
              setInputSetting((prev) => ({ ...prev, height: Number(e.target.value) }));
            }}
            onBlur={(e) => handleHeightBlur(e)}
            className={styles.textBox}
          />
          <div className={styles.customMazeItem}>
            <button>
              <strong>幅と高さを更新</strong>
            </button>
          </div>
          <div className={styles.customMazeItem}>
            <button onClick={handleCreateMaze}>
              <strong>迷路を作成</strong>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.game}>
        <div className={styles.startPoint}>
          <p>start</p>
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
        <div className={styles.goalPoint}>
          <p>goal</p>
        </div>
      </div>
    </div>
  );
}
