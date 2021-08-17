import { RootState } from "../store";
import { setSize } from "../store/extruder-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function Home() {
  const { width, height } = useAppSelector((state: RootState) => state.extruder);
  const dispatch = useAppDispatch();

  return (
    <main>
      <h1>Tile Extruder</h1>
      <p>
        Image size: {width} x {height}
      </p>
      <p>To do!</p>
      <button onClick={() => dispatch(setSize({ width: 100, height: 50 }))}>
        Set Size to 100 x 50
      </button>

      <button onClick={() => dispatch(setSize({ width: 200, height: 100 }))}>
        Set Size to 200 x 100
      </button>
    </main>
  );
}
