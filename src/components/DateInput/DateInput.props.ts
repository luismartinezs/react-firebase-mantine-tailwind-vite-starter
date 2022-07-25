export interface IDateInputProps {
  date?: Date;
  onChange: (date: Date) => void;
  onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
  label?: string;
  maxDate?: Date;
  minDate?: Date;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  disabled?: boolean;
}
