import React from "react";
import { IonSearchbar } from "@ionic/react";

interface SearchBoxProps {
  searchText: string;
  onSearchChange: (newSearchText: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchText,
  onSearchChange,
}) => {
  return (
    <IonSearchbar
      value={searchText}
      onIonInput={(e) => {
        onSearchChange(e.detail.value!);
      }}
      placeholder="Search by Jersey No, Name, URN, or Email"
    />
  );
};

export default SearchBox;
