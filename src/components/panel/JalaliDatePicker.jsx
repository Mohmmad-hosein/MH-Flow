import React, { useMemo } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import 'react-multi-date-picker/styles/colors/purple.css';

/**
 * Persian/Jalali date picker. The component exposes an ISO Gregorian value
 * to the API, so existing backend date contracts remain unchanged.
 */
export default function JalaliDatePicker({ value = '', onChange, placeholder = 'انتخاب تاریخ' }) {
  const pickerValue = useMemo(() => {
    if (!value) return null;
    const parsed = new DateObject({ date: value, format: 'YYYY-MM-DD', calendar: gregorian, locale: gregorian_en });
    return parsed.convert(persian, persian_fa);
  }, [value]);

  const handleChange = (date) => {
    if (!date) {
      onChange?.('');
      return;
    }
    const iso = date.convert(gregorian, gregorian_en).format('YYYY-MM-DD');
    onChange?.(iso);
  };

  return (
    <div className="mh-jalali-picker" dir="rtl">
      <DatePicker
        value={pickerValue}
        onChange={handleChange}
        calendar={persian}
        locale={persian_fa}
        format="YYYY/MM/DD"
        calendarPosition="bottom-right"
        inputClass="mh-jalali-picker-input"
        containerClassName="w-full"
        placeholder={placeholder}
        editable={false}
        fixMainPosition
      />
    </div>
  );
}
