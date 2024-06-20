import * as React from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { styled } from "@mui/material/styles";
import { create } from "zustand";

import Tag from "../components/Tag";
import { useQuery } from "react-query";
import { fetchInputData } from "../queries/fetchInputData";
import { useState } from "react";
import { Item } from "../types/item";
import { Group } from "../types/group";

interface StateInterface {
  availableValues: Item[] | [];
  inputValue: string;
  setAvailableValues: (newValues: Item[]) => void;
  setInputValue: (newValue: string) => void;
}

const useStore = create<StateInterface>((set) => ({
  availableValues: [],
  inputValue: "",
  setAvailableValues: (newValues: Item[]) =>
    set((state) => ({ ...state, availableValues: newValues })),
  setInputValue: (newValue: string) =>
    set((state) => ({ ...state, inputValue: newValue })),
}));

const IndexPage = () => {
  const { availableValues, inputValue, setAvailableValues, setInputValue } =
    useStore((state) => state);

  const [autoCompleteValue, setAutoCompleteValue] = useState<Item[]>([]);
  const { isLoading } = useQuery("itemValues", fetchInputData, {
    onSuccess: (data) => setAvailableValues(data),
  });

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    value: autoCompleteValue,
    inputValue,
    onChange(event, value, reason, details) {
      if (reason === "removeOption") {
        setAutoCompleteValue((prev) =>
          prev.filter((item) => item !== details?.option)
        );
        return;
      }

      if (reason === "clear") {
        setAutoCompleteValue([]);
        return;
      }

      if (reason === "selectOption") {
        if (details && details.option) {
          setAutoCompleteValue((prev) => [...prev, details.option]);
          setInputValue("");
        }
      }
    },
    onInputChange(event, value, reason) {
      if (reason === "reset" || reason === "clear") return;
      // @ts-ignore
      const newSymbol = event.nativeEvent.data;
      if (newSymbol === " ") {
        const newValue = value.trim();
        setAutoCompleteValue((prev) => [
          ...prev,
          { category: "...", id: "unique", name: newValue, value: 0 },
        ]);
        setInputValue("");
        return;
      }
      setInputValue(value);
    },
    id: "customized-hook-demo",
    multiple: true,
    options: availableValues,
    groupBy: (option) => option.category,
    getOptionLabel: (option) => option.name,
    clearOnBlur: false,
  });

  return (
    <Page>
      <Wrapper>
        <div {...getRootProps()}>
          <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
            {value.map((option: Item, index: number) => {
              const { ...tagProps } = getTagProps({ index });
              return (
                <Tag
                  {...tagProps}
                  key={Number(option.id)}
                  label={option.name}
                />
              );
            })}
            <Input {...getInputProps()} />
          </InputWrapper>
        </div>
        {isLoading ? (
          <p>loading</p>
        ) : (
          groupedOptions.length > 0 && (
            <Listbox {...getListboxProps()}>
              {(groupedOptions as Group[]).map((group: Group) => {
                return (
                  <CategoryWrapper key={group.key}>
                    <CategoryTitle>{group.group}</CategoryTitle>
                    <ul>
                      {group.options.map((option) => {
                        const { ...optionProps } = getOptionProps({
                          option,
                          index: group.index,
                        });
                        return (
                          <OptionWrapper {...optionProps}>
                            <span>{option.name}</span>
                          </OptionWrapper>
                        );
                      })}
                    </ul>
                  </CategoryWrapper>
                );
              })}
            </Listbox>
          )
        )}
      </Wrapper>
    </Page>
  );
};

const Page = styled("div")`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #393646;
`;

const Wrapper = styled("div")`
  color: "rgba(255,255,255,0.65)";
  margin-top: 100px;
  width: 700px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const InputWrapper = styled("div")`
  width: 100%;
  background-color: #4f4557;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 4px;
  transition: 0.3s;
  border: none;
  box-shadow: unset;

  &.focused {
    box-shadow: 0 0 0 2px #f4eee0;
  }
`;

const Input = styled("input")`
  background-color: transparent;
  color: #f4eee0;
  font-size: 18px;
  line-height: 22px;
  box-sizing: border-box;
  padding-left: 6px;
  min-width: 30px;
  flex-grow: 1;
  border: 0;
  margin: 0;
  outline: 0;
`;

const Listbox = styled("ul")`
  width: 100%;
  padding: 8px 12px;
  list-style: none;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 0 0 2px #f4eee0;

  ::-webkit-scrollbar {
    width: 14px;
    height: 18px;
  }

  ::-webkit-scrollbar-thumb {
    height: 6px;
    background-clip: padding-box;
    -webkit-border-radius: 7px;
    background: #f4eee0;
    cursor: pointer;
  }

  ::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }
`;

const CategoryWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  color: #f4eee0;
`;

const CategoryTitle = styled("p")`
  font-size: 18px;
  line-height: 22px;
  font-weight: 900;
`;

const OptionWrapper = styled("li")`
  background-color: unset;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #3e2c41;
  }

  &[aria-selected="true"] {
    background-color: #6d5d6e;
  }

  &.Mui-focused {
    background-color: #3e2c41;
  }
`;

export default IndexPage;
