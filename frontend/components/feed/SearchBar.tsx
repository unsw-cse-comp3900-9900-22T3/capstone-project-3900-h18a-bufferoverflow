import { CategorySearch } from "./CategorySearch";

export interface SearchBarProps {
  categories: string[];
  distance: number;
  listing: 'have' | 'want';
  price: {
    min: number;
    max: number;
  }
}

export const SearchBar = (props: {
  data: SearchBarProps
  setData: (arg: SearchBarProps) => void;
  onSearch: () => void;
}) => {
  const setCategories = (categories: string[]) => {
    props.setData({ ...props.data, categories })
  }
  return (
    <>
      <CategorySearch categories={props.data.categories} setCategories={setCategories} onSearch={props.onSearch} />
    </>
  )
}