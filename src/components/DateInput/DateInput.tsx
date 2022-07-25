import React from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import type { IDateInputProps } from './DateInput.props';

const DateInput: React.FC<IDateInputProps> = ({
  date = new Date(),
  onChange,
  onBlur = () => null,
  label = '',
  maxDate = null,
  minDate = null,
  selectsStart = false,
  selectsEnd = false,
  disabled = false,
}): JSX.Element => {
  const filterPassedTime = (time: Date) => {
    const currentDate = new Date(time);

    let selectable = true;

    if (maxDate) {
      selectable = selectable && currentDate.getTime() <= maxDate.getTime();
    }

    if (minDate) {
      selectable = selectable && currentDate.getTime() >= minDate.getTime();
    }

    return selectable;
  };

  return (
    <label className="flex flex-col space-y-1 text-xl">
      <span className="">{label}</span>
      <DatePicker
        className="bg-zinc-800 border border-zinc-800 text-zinc-400 py-3 px-6 w-full"
        selected={date}
        onChange={(date: Date) => onChange(date)}
        onBlur={onBlur}
        dateFormat="PPp"
        highlightDates={[new Date()]}
        showTimeSelect
        todayButton="Today"
        maxDate={maxDate}
        minDate={minDate}
        selectsStart={selectsStart}
        selectsEnd={selectsEnd}
        filterTime={filterPassedTime}
        disabled={disabled}
      />
    </label>
  );
};

export default DateInput;
