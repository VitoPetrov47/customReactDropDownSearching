import {SearchDropdown} from "@/components/ui/search-dropdown";
import {ukraineCities} from "@/utils/cities";
import {useState} from "react";
import type {Option} from "@/types/optional";
import './index.css';

function App() {
    const [selected, setSelected] = useState<Option | null>(null);

    return (
    <>
      <div className={"p-4"}>
          <h1>Custom Search</h1>
           <SearchDropdown
               options={ukraineCities}
               value={selected}
               onChange={setSelected}
               placeholder={'Оберіть ваше місто'}
           />
          {selected && (
              <span>Ви обрали місто {selected.label}</span>
          )}
      </div>
    </>
  )
}

export default App
