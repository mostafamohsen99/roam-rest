import Select from "./Select";
import { useSearchParams } from "react-router-dom";

export default function SortBy({ options }) {
  //  console.log("options", options);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  function handleChange(e) {
    // console.log("heeere");
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}
