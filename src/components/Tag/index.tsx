import * as React from "react";
import { AutocompleteGetTagProps } from "@mui/base/useAutocomplete";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

function TagElement(props: TagProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const Tag = styled(TagElement)<TagProps>`
  display: flex;
  align-items: center;
  column-gap: 4px;
  line-height: 22px;
  font-size: 18px;
  background-color: #6d5d6e;
  color: #f4eee0;
  border-radius: 6px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #177ddc;
    background-color: #003b57;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 20px;
    cursor: pointer;
    padding: 4px;
  }
`;

export default Tag;
